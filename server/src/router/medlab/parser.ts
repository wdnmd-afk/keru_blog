import { MedLabAdviceInput } from '@/config/medlab.config'
import { MedLabAdviceDto } from './dto'

/**
 * 字段映射定义（文档化常量）：描述 test.json 到内部结构的映射关系
 * 仅用于可读性与复用，业务逻辑以 normalizeMedLabInput 为准
 */
export const MedLabFieldMapping = {
  topLevel: {
    personGender: 'patient.gender', // 顶层 personGender → patient.gender
    personAge: 'patient.age', // 顶层 personAge(字符串数值) → patient.age(number)
    item: 'context.item', // 顶层 item(检验项目名称) → context.item
  },
  dataItem: {
    // 名称优先级：reportName > brefName > deviceChannel > analysisItemId/Number
    name: ['analysisItemReportName', 'analysisItemBrefName', 'deviceChannel', 'analysisItemId', 'analysisItemNumber'],
    sampleType: ['specimenTypeName', 'specimenTypeDetailName'],
    instrument: ['deviceName', 'deviceModel'],
    method: ['methodologyName'],
    unit: ['unitName'],
    // 结果值：resultValue1 > resultOriginValue，并在尾部附加 (resultPrompt)
    result: {
      prefer: ['resultValue1'],
      fallback: ['resultOriginValue'],
      suffix: ['resultPrompt'], // 如 ↑/↓ 等
    },
    // 参考范围：referenceRangeDetailVoList[0].rangeResult 优先；否则 lowValue-highValue
    refRange: {
      list: 'referenceRangeDetailVoList',
      prefer: ['rangeResult'],
      fallbackPair: ['lowValue', 'highValue'],
    },
  },
} as const

/**
 * MedLab 输入归一化解析器
 * - 将多源结构（含 test.json 模板）解析为内部通用结构 MedLabAdviceInput
 * - 字段映射依据：
 *   - 顶层：personAge(年龄)、personGender(性别)、item(检验项目)
 *   - data[]：
 *     - analysisItemReportName(分析项目名称) / analysisItemBrefName / deviceChannel / analysisItemId
 *     - specimenTypeName(样本类型) / specimenTypeDetailName
 *     - deviceName(检验仪器名称) / deviceModel
 *     - methodologyName(方法学)
 *     - unitName(单位)
 *     - referenceRangeDetailVoList[0].rangeResult(参考范围) 优先；否则 lowValue-highValue
 *     - resultValue1(处理后数值) 优先；否则 resultOriginValue(原始数值)；若有 resultPrompt(↑/↓/...) 则附加括号
 */
export function normalizeMedLabInput(body: MedLabAdviceDto): MedLabAdviceInput {
  // 衍生 patient：优先 body.patient；补充顶层 personGender/personAge
  const patient: NonNullable<MedLabAdviceInput['patient']> = {
    ...(body.patient || {}),
  }
  if (!patient.gender && (body as any).personGender) {
    patient.gender = String((body as any).personGender)
  }
  if (typeof patient.age !== 'number' && (body as any).personAge != null) {
    const n = Number((body as any).personAge)
    if (!Number.isNaN(n)) patient.age = n
  }

  // 组装 items：优先 body.items；否则从 body.data[] 转换
  let items: MedLabAdviceInput['items'] | undefined = body.items?.map(it => ({
    name: String(it.name || ''),
    sampleType: it.sampleType ? String(it.sampleType) : undefined,
    method: it.method ? String(it.method) : undefined,
    instrument: it.instrument ? String(it.instrument) : undefined,
    result: String(it.result ?? ''),
    unit: it.unit ? String(it.unit) : undefined,
    refRange: it.refRange ? String(it.refRange) : undefined,
  }))

  if ((!items || items.length === 0) && Array.isArray((body as any).data)) {
    const rows = (body as any).data as any[]
    items = rows.map(row => {
      const name =
        row.analysisItemReportName ||
        row.analysisItemBrefName ||
        row.deviceChannel ||
        row.analysisItemId ||
        row.analysisItemNumber ||
        ''

      const sampleType = row.specimenTypeName || row.specimenTypeDetailName || undefined
      const method = row.methodologyName || undefined
      const instrument = row.deviceName || row.deviceModel || undefined

      const baseVal = (row.resultValue1 ?? row.resultOriginValue ?? '').toString()
      const prompt = row.resultPrompt ? `(${String(row.resultPrompt)})` : ''
      const result = `${baseVal}${prompt}`.trim()

      const unit = row.unitName || undefined

      // 参考范围优先使用 rangeResult，否则用 low-high 拼接
      let refRange: string | undefined
      const rr = Array.isArray(row.referenceRangeDetailVoList)
        ? row.referenceRangeDetailVoList[0]
        : null
      if (rr) {
        if (rr.rangeResult) {
          refRange = String(rr.rangeResult)
        } else if (rr.lowValue != null && rr.highValue != null) {
          refRange = `${rr.lowValue}-${rr.highValue}`
        }
      }

      return {
        name: String(name),
        sampleType: sampleType ? String(sampleType) : undefined,
        method: method ? String(method) : undefined,
        instrument: instrument ? String(instrument) : undefined,
        result: String(result),
        unit: unit ? String(unit) : undefined,
        refRange,
      }
    })
  }

  // 合并 context：保留调用方 context，并透传顶层 item（检验项目）
  const context = {
    ...(body.context || {}),
    ...(body.item ? { item: String(body.item) } : {}),
  }

  return {
    patient: Object.keys(patient).length ? patient : undefined,
    items: items || [],
    context: Object.keys(context).length ? context : undefined,
    config: body.config,
  }
}
