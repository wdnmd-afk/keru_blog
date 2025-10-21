# 医疗报告 A4 模板示例（可直接用于 HtmlTemplate.content）

> 说明：以下模板为 A4 纵向打印优化，包含中文字体设置、表格样式与 Handlebars 占位符。建议在“模板管理”新建模板时选择类型 A4，HTML 粘贴以下内容，并根据需要调整。可配合 `fields` JSON 生成表单。

---

## 模板一：血常规（CBC）- A4

```html
<div style="font-family: 'Microsoft YaHei', SimSun, Arial; color:#222;">
  <style>
    .page { padding: 16px 12px; }
    .header { display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #0a7; padding-bottom:8px; margin-bottom:12px; }
    .h-title { font-size:20px; font-weight:700; color:#0a7; }
    .h-meta { font-size:12px; color:#555; text-align:right; }
    .section-title { font-size:14px; font-weight:600; margin:12px 0 6px; color:#333; }
    .info-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:6px 12px; font-size:12px; }
    .label { color:#666; }
    table { width:100%; border-collapse: collapse; font-size:12px; }
    th, td { border:1px solid #ddd; padding:6px 8px; }
    th { background:#f7fafc; text-align:left; color:#333; }
    .flag-high { color:#d4380d; font-weight:600; }
    .flag-low { color:#096dd9; font-weight:600; }
    .footer { margin-top:16px; font-size:12px; color:#666; display:flex; justify-content:space-between; }
  </style>

  <div class="page">
    <div class="header">
      <div class="h-title">{{hospital.name}} - 血常规报告（CBC）</div>
      <div class="h-meta">
        科室：{{hospital.department}}<br/>
        报告日期：{{report.reportDate}}
      </div>
    </div>

    <div class="section-title">患者信息</div>
    <div class="info-grid">
      <div><span class="label">姓名：</span>{{patient.name}}</div>
      <div><span class="label">性别：</span>{{patient.gender}}</div>
      <div><span class="label">年龄：</span>{{patient.age}}</div>
      <div><span class="label">样本编号：</span>{{patient.sampleNo}}</div>
      <div><span class="label">就诊号：</span>{{patient.visitId}}</div>
      <div><span class="label">样本类型：</span>{{report.sampleType}}</div>
      <div><span class="label">送检医生：</span>{{report.doctor}}</div>
      <div><span class="label">审核者：</span>{{report.reviewer}}</div>
    </div>

    <div class="section-title">检验结果</div>
    <table>
      <thead>
        <tr>
          <th style="width:32%">项目</th>
          <th style="width:16%">结果</th>
          <th style="width:12%">单位</th>
          <th style="width:24%">参考范围</th>
          <th style="width:16%">提示</th>
        </tr>
      </thead>
      <tbody>
        {{#each items}}
        <tr>
          <td>{{this.name}}</td>
          <td>{{this.value}}</td>
          <td>{{this.unit}}</td>
          <td>{{this.ref}}</td>
          <td>
            {{#if (eq this.flag 'H')}}<span class="flag-high">↑ 高</span>{{/if}}
            {{#if (eq this.flag 'L')}}<span class="flag-low">↓ 低</span>{{/if}}
            {{#if (eq this.flag 'N')}}正常{{/if}}
          </td>
        </tr>
        {{/each}}
      </tbody>
    </table>

    {{#if remarks}}
    <div class="section-title">备注</div>
    <div style="font-size:12px; color:#555; white-space: pre-wrap;">{{remarks}}</div>
    {{/if}}

    <div class="footer">
      <div>地址：{{hospital.address}} | 电话：{{hospital.phone}}</div>
      <div>本报告仅对送检样本负责</div>
    </div>
  </div>
</div>
```

- 建议 `fields`（可选）：
```json
[
  {"key":"hospital.name","label":"医院名称","type":"text","required":true},
  {"key":"hospital.department","label":"科室","type":"text"},
  {"key":"report.reportDate","label":"报告日期","type":"date","required":true},
  {"key":"patient.name","label":"姓名","type":"text","required":true},
  {"key":"patient.gender","label":"性别","type":"select","options":["男","女"]},
  {"key":"patient.age","label":"年龄","type":"number"},
  {"key":"patient.sampleNo","label":"样本编号","type":"text"},
  {"key":"patient.visitId","label":"就诊号","type":"text"},
  {"key":"report.sampleType","label":"样本类型","type":"text","placeholder":"全血"},
  {"key":"report.doctor","label":"送检医生","type":"text"},
  {"key":"report.reviewer","label":"审核者","type":"text"},
  {"key":"hospital.address","label":"地址","type":"text"},
  {"key":"hospital.phone","label":"电话","type":"text"},
  {"key":"remarks","label":"备注","type":"textarea"}
]
```

- 示例 `data.items`（部分）：
```json
[
  {"name":"白细胞计数 WBC","value":"6.2","unit":"×10^9/L","ref":"3.5 - 9.5","flag":"N"},
  {"name":"红细胞计数 RBC","value":"4.85","unit":"×10^12/L","ref":"4.3 - 5.8","flag":"N"},
  {"name":"血红蛋白 HGB","value":"118","unit":"g/L","ref":"130 - 175","flag":"L"},
  {"name":"血小板计数 PLT","value":"420","unit":"×10^9/L","ref":"125 - 350","flag":"H"}
]
```

> 注：模板内使用了 `eq` 辅助函数判断高低标记，如需使用，请在服务端注册该 Helper 或在生成数据前置换为中文标签（也可以把 `flag` 文案直接传递）。若不想扩展 Helper，可将 `flag` 直接渲染为文本。

---

## 模板二：尿常规（Urinalysis）- A4

```html
<div style="font-family: 'Microsoft YaHei', SimSun, Arial; color:#222;">
  <style>
    .page { padding: 16px 12px; }
    .header { display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #7a06b3; padding-bottom:8px; margin-bottom:12px; }
    .h-title { font-size:20px; font-weight:700; color:#7a06b3; }
    .h-meta { font-size:12px; color:#555; text-align:right; }
    .section-title { font-size:14px; font-weight:600; margin:12px 0 6px; color:#333; }
    .info-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:6px 12px; font-size:12px; }
    .label { color:#666; }
    table { width:100%; border-collapse: collapse; font-size:12px; }
    th, td { border:1px solid #ddd; padding:6px 8px; }
    th { background:#faf5ff; text-align:left; color:#333; }
  </style>

  <div class="page">
    <div class="header">
      <div class="h-title">{{hospital.name}} - 尿常规报告</div>
      <div class="h-meta">报告日期：{{report.reportDate}}</div>
    </div>

    <div class="section-title">患者信息</div>
    <div class="info-grid">
      <div><span class="label">姓名：</span>{{patient.name}}</div>
      <div><span class="label">性别：</span>{{patient.gender}}</div>
      <div><span class="label">年龄：</span>{{patient.age}}</div>
      <div><span class="label">样本编号：</span>{{patient.sampleNo}}</div>
    </div>

    <div class="section-title">物理性状</div>
    <table>
      <tbody>
        <tr><th style="width:24%">颜色</th><td style="width:26%">{{ua.color}}</td><th style="width:24%">透明度</th><td style="width:26%">{{ua.clarity}}</td></tr>
        <tr><th>比重(SG)</th><td>{{ua.sg}}</td><th>pH</th><td>{{ua.ph}}</td></tr>
      </tbody>
    </table>

    <div class="section-title">化学检查</div>
    <table>
      <thead>
        <tr><th>项目</th><th>结果</th><th>参考范围</th></tr>
      </thead>
      <tbody>
        <tr><td>葡萄糖</td><td>{{ua.glucose}}</td><td>阴性</td></tr>
        <tr><td>蛋白质</td><td>{{ua.protein}}</td><td>阴性</td></tr>
        <tr><td>酮体</td><td>{{ua.ketone}}</td><td>阴性</td></tr>
        <tr><td>胆红素</td><td>{{ua.bilirubin}}</td><td>阴性</td></tr>
        <tr><td>尿胆原</td><td>{{ua.urobilinogen}}</td><td>0.1–1.0 EU/dL</td></tr>
        <tr><td>亚硝酸盐</td><td>{{ua.nitrite}}</td><td>阴性</td></tr>
        <tr><td>白细胞酯酶</td><td>{{ua.leukocyteEsterase}}</td><td>阴性</td></tr>
      </tbody>
    </table>

    <div class="section-title">显微镜检查</div>
    <table>
      <thead>
        <tr><th>项目</th><th>结果</th><th>单位</th><th>参考范围</th></tr>
      </thead>
      <tbody>
        <tr><td>红细胞(RBC)</td><td>{{ua.rbc}}</td><td>/HPF</td><td>0–3</td></tr>
        <tr><td>白细胞(WBC)</td><td>{{ua.wbc}}</td><td>/HPF</td><td>0–5</td></tr>
        <tr><td>上皮细胞</td><td>{{ua.epithelial}}</td><td>/HPF</td><td>少见</td></tr>
        <tr><td>细菌</td><td>{{ua.bacteria}}</td><td>/HPF</td><td>阴性/少见</td></tr>
      </tbody>
    </table>

    {{#if remarks}}
    <div class="section-title">备注</div>
    <div style="font-size:12px; color:#555; white-space: pre-wrap;">{{remarks}}</div>
    {{/if}}
  </div>
</div>
```

- 建议 `fields`（可选）：
```json
[
  {"key":"hospital.name","label":"医院名称","type":"text","required":true},
  {"key":"report.reportDate","label":"报告日期","type":"date","required":true},
  {"key":"patient.name","label":"姓名","type":"text","required":true},
  {"key":"patient.gender","label":"性别","type":"select","options":["男","女"]},
  {"key":"patient.age","label":"年龄","type":"number"},
  {"key":"patient.sampleNo","label":"样本编号","type":"text"},
  {"key":"ua.color","label":"颜色","type":"text"},
  {"key":"ua.clarity","label":"透明度","type":"text"},
  {"key":"ua.sg","label":"比重(SG)","type":"text"},
  {"key":"ua.ph","label":"pH","type":"text"},
  {"key":"ua.glucose","label":"葡萄糖","type":"text","placeholder":"阴性"},
  {"key":"ua.protein","label":"蛋白质","type":"text","placeholder":"阴性"},
  {"key":"ua.ketone","label":"酮体","type":"text","placeholder":"阴性"},
  {"key":"ua.bilirubin","label":"胆红素","type":"text","placeholder":"阴性"},
  {"key":"ua.urobilinogen","label":"尿胆原","type":"text"},
  {"key":"ua.nitrite","label":"亚硝酸盐","type":"text","placeholder":"阴性"},
  {"key":"ua.leukocyteEsterase","label":"白细胞酯酶","type":"text","placeholder":"阴性"},
  {"key":"ua.rbc","label":"RBC(/HPF)","type":"text"},
  {"key":"ua.wbc","label":"WBC(/HPF)","type":"text"},
  {"key":"ua.epithelial","label":"上皮细胞","type":"text"},
  {"key":"ua.bacteria","label":"细菌","type":"text"},
  {"key":"remarks","label":"备注","type":"textarea"}
]
```

---

## 模板三：生化报告（Biochemistry）- A4

```html
<div style="font-family: 'Microsoft YaHei', SimSun, Arial; color:#222;">
  <style>
    .page { padding: 16px 12px; }
    .header { display:flex; align-items:center; justify-content:space-between; border-bottom:2px solid #1890ff; padding-bottom:8px; margin-bottom:12px; }
    .h-title { font-size:20px; font-weight:700; color:#1890ff; }
    .h-meta { font-size:12px; color:#555; text-align:right; }
    .section-title { font-size:14px; font-weight:600; margin:12px 0 6px; color:#333; }
    .info-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap:6px 12px; font-size:12px; }
    .label { color:#666; }
    table { width:100%; border-collapse: collapse; font-size:12px; }
    th, td { border:1px solid #ddd; padding:6px 8px; }
    th { background:#f0f7ff; text-align:left; color:#333; }
    .flag-high { color:#d4380d; font-weight:600; }
    .flag-low { color:#096dd9; font-weight:600; }
  </style>

  <div class="page">
    <div class="header">
      <div class="h-title">{{hospital.name}} - 生化检验报告</div>
      <div class="h-meta">报告日期：{{report.reportDate}}</div>
    </div>

    <div class="section-title">患者信息</div>
    <div class="info-grid">
      <div><span class="label">姓名：</span>{{patient.name}}</div>
      <div><span class="label">性别：</span>{{patient.gender}}</div>
      <div><span class="label">年龄：</span>{{patient.age}}</div>
      <div><span class="label">样本类型：</span>{{report.sampleType}}</div>
    </div>

    <div class="section-title">检验结果</div>
    <table>
      <thead>
        <tr>
          <th>项目</th>
          <th>结果</th>
          <th>单位</th>
          <th>参考范围</th>
          <th>提示</th>
        </tr>
      </thead>
      <tbody>
        {{#each items}}
        <tr>
          <td>{{this.name}}</td>
          <td>{{this.value}}</td>
          <td>{{this.unit}}</td>
          <td>{{this.ref}}</td>
          <td>
            {{#if (eq this.flag 'H')}}<span class="flag-high">↑ 高</span>{{/if}}
            {{#if (eq this.flag 'L')}}<span class="flag-low">↓ 低</span>{{/if}}
            {{#if (eq this.flag 'N')}}正常{{/if}}
          </td>
        </tr>
        {{/each}}
      </tbody>
    </table>

    {{#if remarks}}
    <div class="section-title">备注</div>
    <div style="font-size:12px; color:#555; white-space: pre-wrap;">{{remarks}}</div>
    {{/if}}
  </div>
</div>
```

- 示例 `data.items`（部分）：
```json
[
  {"name":"丙氨酸氨基转移酶 ALT","value":"35","unit":"U/L","ref":"9 - 50","flag":"N"},
  {"name":"天门冬氨酸氨基转移酶 AST","value":"62","unit":"U/L","ref":"15 - 40","flag":"H"},
  {"name":"总胆红素 TBil","value":"12.5","unit":"umol/L","ref":"5.0 - 21.0","flag":"N"},
  {"name":"尿素氮 BUN","value":"7.2","unit":"mmol/L","ref":"2.9 - 8.2","flag":"N"},
  {"name":"肌酐 Cr","value":"128","unit":"umol/L","ref":"57 - 111","flag":"H"},
  {"name":"尿酸 UA","value":"380","unit":"umol/L","ref":"208 - 428","flag":"N"},
  {"name":"葡萄糖 GLU","value":"6.8","unit":"mmol/L","ref":"3.9 - 6.1","flag":"H"}
]
```

---

## 使用与注意
- 以上模板均为 **A4** 版式。管理端已实现选择 A4/A5 自动设置宽高（A4: 210×297mm；A5: 148×210mm），仅 **CUSTOM** 需填写宽高。
- 模板内 CSS 使用了 `<style>` 与 `style` 属性，服务端 `sanitize-html` 白名单已允许；若后续调整白名单，请同步评估安全性。
- 如需 `{{#each}}`、`{{#if}}` 之类高级语法，无需改动服务端。若需 `eq` 等自定义 Helper，则需在服务端注册（或将 `flag` 直接传中文文案替代 Helper 判断）。
- 字体建议：`'Microsoft YaHei', SimSun`（已内联），也可在 `/static/fonts` 引入专用字体并在 `<style>` 中通过 `@font-face` 配置。

## 建议的数据结构
```json
{
  "hospital": {"name":"某某医院","department":"检验科","address":"XX省XX市XX路1号","phone":"010-000000"},
  "patient": {"name":"张三","gender":"男","age":32,"visitId":"MZ20251021001","sampleNo":"S20251021001"},
  "report": {"doctor":"李四","reviewer":"王五","reportDate":"2025-10-21","sampleType":"全血"},
  "items": [],
  "remarks": "如有疑问，请与检验科联系"
}
```

## 导入流程
1. 管理端进入 `/template-management` → 新建模板 → 选择类型 `A4`（宽高自动填充）。
2. 将上面的 HTML 模板粘贴至“模板HTML”。
3. （可选）粘贴对应 `fields` JSON 以驱动右侧表单配置。
4. 保存后可点击“预览HTML”或“生成PDF”验证效果。
