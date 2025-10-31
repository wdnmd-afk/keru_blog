import dotenv from 'dotenv'

dotenv.config()

/**
 * 医学检验建议配置（可通过环境变量覆盖）
 */
export interface MedLabAdviceConfig {
  /** 系统角色/总体提示词开头（用于限定语气、身份） */
  systemPromptHeader: string
  /** 输出语言，如 zh-CN/en */
  language: string
  /** 建议正文最大字符数（用于控制篇幅） */
  maxAdviceChars: number
  /** 免责声明文本（附在结尾，可选） */
  disclaimer?: string
}

/**
 * 输入数据类型（与 DTO 对齐，用于构建提示词）
 */
export interface MedLabAdviceInput {
  patient?: {
    name?: string
    gender?: string
    age?: number
    id?: string
  }
  items: Array<{
    /** 检验项目/分析物名称，如 "白细胞计数(WBC)" */
    name: string
    /** 分析物/样本类型，如 "血清"/"全血" 等 */
    sampleType?: string
    /** 检验方法学，如 "化学发光法" */
    method?: string
    /** 检验仪器，如 "Abbott Architect i2000" */
    instrument?: string
    /** 结果值（使用字符串以兼容 ">","<","阴性/阳性" 等表现） */
    result: string
    /** 单位，如 "10^9/L" */
    unit?: string
    /** 参考范围（可为字符串，如 "3.50-9.50"） */
    refRange?: string
  }>
  /** 额外上下文，如科室、就诊信息等（可选） */
  context?: Record<string, any>
  /** 运行时覆盖配置（可选） */
  config?: Partial<
    Pick<MedLabAdviceConfig, 'systemPromptHeader' | 'language' | 'maxAdviceChars' | 'disclaimer'>
  >
}

/**
 * 生成配置：从环境变量读取，缺省值为合理默认
 */
export function createMedLabAdviceConfig(): MedLabAdviceConfig {
  const systemPromptHeader =
    process.env.MEDLAB_PROMPT_HEADER ||
    '你是一名严谨的临床检验医师助理，请基于检验数据提供面向患者的医学建议，语言专业但通俗、客观克制，避免诊断结论。'

  const language = process.env.MEDLAB_LANGUAGE || 'zh-CN'
  // 将默认建议长度从 450 调整为 120，更贴近“短建议”需求
  const maxAdviceChars = parseInt(process.env.MEDLAB_MAX_ADVICE_CHARS || '120', 10)
  const disclaimer =
    process.env.MEDLAB_DISCLAIMER ||
    '以上建议仅供健康科普与就医参考，不能替代医生面诊与诊断。如持续异常或有明显不适，请尽快就医。'

  return {
    systemPromptHeader,
    language,
    maxAdviceChars: Number.isFinite(maxAdviceChars) ? maxAdviceChars : 450,
    disclaimer,
  }
}

/**
 * 构建提示词：将结构化检验数据与配置拼装为单轮问答的输入
 */
export function buildMedLabPrompt(input: MedLabAdviceInput, baseCfg: MedLabAdviceConfig): string {
  const cfg: MedLabAdviceConfig = {
    ...baseCfg,
    ...(input?.config || {}),
  }

  // 为了稳定输出，制定明确的结构化指令
  // 输出规范：单段落纯文本，不使用 Markdown/标题/编号/列表，不换行；目标字数约为 maxAdviceChars
  const header = `${cfg.systemPromptHeader}\n- 输出语言：${cfg.language}\n- 字数目标：约${cfg.maxAdviceChars}字\n- 输出格式：单段落纯文本；不要使用Markdown、标题、编号、列表或换行\n- 风格：精炼、客观克制，避免给出诊断结论，仅给出管理建议与复查提醒。`

  const pInfo = input.patient
    ? `姓名: ${pInfoSafe(input.patient.name)}; 性别: ${pInfoSafe(input.patient.gender)}; 年龄: ${
        typeof input.patient.age === 'number' ? input.patient.age : ''
      }`
    : '（未提供患者基本信息）'

  // 将检验项目序列化为简明清单
  const itemsText = (input.items || [])
    .map((it, idx) => {
      const fields = [
        `项目: ${it.name}`,
        it.sampleType ? `样本: ${it.sampleType}` : '',
        it.result !== undefined && it.result !== null && String(it.result) !== ''
          ? `结果: ${String(it.result)}${it.unit ? ' ' + it.unit : ''}`
          : '',
        it.refRange ? `参考: ${it.refRange}` : '',
        it.method ? `方法学: ${it.method}` : '',
        it.instrument ? `仪器: ${it.instrument}` : '',
      ].filter(Boolean)
      return `${idx + 1}. ${fields.join('；')}`
    })
    .join('\n')
  console.log(itemsText, 'itemsText')
  const ctx = input.context ? `\n【辅助信息】\n${safeJSONStringify(input.context)}` : ''

  const disclaimer = cfg.disclaimer ? `\n\n【免责声明】${cfg.disclaimer}` : ''

  const prompt = `【角色与规则】\n${header}\n\n【患者信息】\n${pInfo}\n\n【检验项目】\n${itemsText}${ctx}\n\n【任务】\n请基于以上数据，输出一段约${cfg.maxAdviceChars}字的中文建议（单段落、纯文本、不使用Markdown/标题/编号/列表、不换行），先概括总体情况，再简要说明异常项目的可能方向与健康管理建议及复查提醒，避免给出诊断结论；如信息不足，请说明限度。${disclaimer}`

  return prompt
}

// 安全 JSON 序列化（避免抛错）
function safeJSONStringify(data: any): string {
  try {
    return JSON.stringify(data, null, 2)
  } catch {
    return String(data)
  }
}

function pInfoSafe(v: any): string {
  if (v === undefined || v === null) return ''
  return String(v)
}
