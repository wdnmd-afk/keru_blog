-- 医学报告模板插入脚本（MySQL 8+）
-- 说明：
-- 1) 默认使用数据库 test，如与你的库名不同，请将下方 USE 语句改成你的库名。
-- 2) 本脚本依赖 Prisma 迁移增加的列：displayHeaderFooter/headerHtml/footerHtml/headerHeightMm/footerHeightMm
--    执行前请确认已运行：
--      pnpm --filter server prisma generate
--      pnpm --filter server prisma migrate dev -n "htmltemplate-header-footer"
-- 3) 表名按你的实际环境可能为 `htmltemplate`（小写）。本脚本使用小写表名以兼容多数 Linux 环境。
-- 4) 字体已在模板 HTML 内通过 @font-face 引入：/static/fonts/NotoSansSC-Regular.ttf

USE `test`;
SET NAMES utf8mb4;

/* 1) CBC 全血细胞分析报告（A4，带固定页眉/页脚、表格、Q&A） */
INSERT INTO `htmltemplate`
(`id`,`name`,`type`,`content`,`widthMm`,`heightMm`,`fields`,`remark`,
 `displayHeaderFooter`,`headerHtml`,`footerHtml`,`headerHeightMm`,`footerHeightMm`,
 `createdAt`,`updatedAt`)
VALUES
(
  'tpl_cbc',
  'CBC 全血细胞分析报告',
  'A4',
  '<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: "NotoSansSC";
    src: url("/static/fonts/NotoSansSC-Regular.ttf") format("truetype");
    font-weight: normal; font-style: normal;
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 10mm; font-family: NotoSansSC, Arial, sans-serif; color: #222; }
  h1 { font-size: 18px; margin: 0 0 8px 0; }
  .meta, .table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
  .meta th, .meta td { border: 1px solid #ddd; padding: 6px 8px; font-size: 12px; }
  .meta th { background: #fafafa; width: 18%; text-align: right; color: #666; }
  .table th, .table td { border: 1px solid #ddd; padding: 6px 8px; font-size: 12px; }
  .table th { background: #f5f7fb; }
  .flag-H { color: #d4380d; font-weight: 600; }
  .flag-L { color: #389e0d; font-weight: 600; }
  .qa h2 { font-size: 14px; margin: 16px 0 8px; }
  .qa .item { margin-bottom: 8px; }
  .qa .q { font-weight: 600; }
  .qa .a { color: #555; }
</style>
</head>
<body>
  <h1>{{report.title}}</h1>
  <table class="meta">
    <tr><th>机构</th><td>{{hospital.name}}</td><th>姓名</th><td>{{patient.name}}</td></tr>
    <tr><th>性别/年龄</th><td>{{patient.gender}} / {{patient.age}}</td><th>样本编号</th><td>{{report.sampleId}}</td></tr>
    <tr><th>样本类型</th><td>{{report.sampleType}}</td><th>报告日期</th><td>{{report.reportDate}}</td></tr>
  </table>

  <table class="table">
    <thead>
      <tr>
        <th>项目</th><th>结果</th><th>单位</th><th>参考区间</th><th>提示</th>
      </tr>
    </thead>
    <tbody>
      {{#each cbc.items}}
      <tr>
        <td>{{this.name}}</td>
        <td>{{this.result}}</td>
        <td>{{this.unit}}</td>
        <td>{{this.refRange}}</td>
        <td>
          {{#if (eq this.flag "H")}}<span class="flag-H">↑ 偏高</span>{{/if}}
          {{#if (eq this.flag "L")}}<span class="flag-L">↓ 偏低</span>{{/if}}
          {{#if (eq this.flag "N")}}正常{{/if}}
        </td>
      </tr>
      {{/each}}
    </tbody>
  </table>

  <div class="qa">
    <h2>Q&A 建议与解释</h2>
    {{#each qa}}
      <div class="item">
        <div class="q">Q: {{this.q}}</div>
        <div class="a">A: {{this.a}}</div>
      </div>
    {{/each}}
  </div>
</body>
</html>',
  NULL, NULL,
  '[
    { "key": "hospital.name", "label": "机构名称", "type": "text" },
    { "key": "patient.name", "label": "姓名", "type": "text" },
    { "key": "patient.gender", "label": "性别", "type": "select", "options": ["男","女"] },
    { "key": "patient.age", "label": "年龄", "type": "text" },
    { "key": "report.title", "label": "报告标题", "type": "text" },
    { "key": "report.sampleId", "label": "样本编号", "type": "text" },
    { "key": "report.sampleType", "label": "样本类型", "type": "text" },
    { "key": "report.reportDate", "label": "报告日期", "type": "text" }
  ]',
  '血常规（CBC）模板，含项目表与 Q&A',
  1,
  '<div style="font-size:10px;color:#666;width:100%;padding:0 10mm;display:flex;justify-content:space-between;align-items:center;">
    <div>{{hospital.name}} · {{report.title}}</div>
    <div>姓名：{{patient.name}} ｜ 编号：{{report.sampleId}} ｜ 日期：<span class="date"></span></div>
  </div>',
  '<div style="font-size:9px;color:#666;width:100%;padding:0 10mm;display:flex;justify-content:space-between;align-items:center;">
    <div>说明：本报告仅供临床参考</div>
    <div><span class="pageNumber"></span>/<span class="totalPages"></span></div>
  </div>',
  18, 16,
  NOW(), NOW()
);

/* 2) 生化全项（肝肾功能）报告（A4，表格、Q&A） */
INSERT INTO `htmltemplate`
(`id`,`name`,`type`,`content`,`widthMm`,`heightMm`,`fields`,`remark`,
 `displayHeaderFooter`,`headerHtml`,`footerHtml`,`headerHeightMm`,`footerHeightMm`,
 `createdAt`,`updatedAt`)
VALUES
(
  'tpl_biochem',
  '生化全项（肝肾功能）报告',
  'A4',
  '<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: "NotoSansSC";
    src: url("/static/fonts/NotoSansSC-Regular.ttf") format("truetype");
    font-weight: normal; font-style: normal;
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 10mm; font-family: NotoSansSC, Arial, sans-serif; color: #222; }
  h1 { font-size: 18px; margin: 0 0 8px 0; }
  .meta, .table { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
  .meta th, .meta td { border: 1px solid #ddd; padding: 6px 8px; font-size: 12px; }
  .meta th { background: #fafafa; width: 18%; text-align: right; color: #666; }
  .table th, .table td { border: 1px solid #ddd; padding: 6px 8px; font-size: 12px; }
  .table th { background: #f5f7fb; }
  .flag-H { color: #d4380d; font-weight: 600; }
  .flag-L { color: #389e0d; font-weight: 600; }
  .section { margin-top: 12px; }
</style>
</head>
<body>
  <h1>{{report.title}}</h1>
  <table class="meta">
    <tr><th>机构</th><td>{{hospital.name}}</td><th>姓名</th><td>{{patient.name}}</td></tr>
    <tr><th>性别/年龄</th><td>{{patient.gender}} / {{patient.age}}</td><th>样本编号</th><td>{{report.sampleId}}</td></tr>
    <tr><th>样本类型</th><td>{{report.sampleType}}</td><th>报告日期</th><td>{{report.reportDate}}</td></tr>
  </table>

  <table class="table">
    <thead>
      <tr>
        <th>项目</th><th>结果</th><th>单位</th><th>参考区间</th><th>提示</th>
      </tr>
    </thead>
    <tbody>
      {{#each biochem.items}}
      <tr>
        <td>{{this.name}}</td>
        <td>{{this.result}}</td>
        <td>{{this.unit}}</td>
        <td>{{this.refRange}}</td>
        <td>
          {{#if (eq this.flag "H")}}<span class="flag-H">↑ 偏高</span>{{/if}}
          {{#if (eq this.flag "L")}}<span class="flag-L">↓ 偏低</span>{{/if}}
          {{#if (eq this.flag "N")}}正常{{/if}}
        </td>
      </tr>
      {{/each}}
    </tbody>
  </table>

  <div class="section">
    <h2 style="font-size:14px;margin:0 0 6px;">医生建议与解释（Q&A）</h2>
    {{#each qa}}
      <div style="margin-bottom:6px;">
        <div style="font-weight:600;">Q: {{this.q}}</div>
        <div style="color:#555;">A: {{this.a}}</div>
      </div>
    {{/each}}
  </div>
</body>
</html>',
  NULL, NULL,
  '[
    { "key": "hospital.name", "label": "机构名称", "type": "text" },
    { "key": "patient.name", "label": "姓名", "type": "text" },
    { "key": "patient.gender", "label": "性别", "type": "select", "options": ["男","女"] },
    { "key": "patient.age", "label": "年龄", "type": "text" },
    { "key": "report.title", "label": "报告标题", "type": "text" },
    { "key": "report.sampleId", "label": "样本编号", "type": "text" },
    { "key": "report.sampleType", "label": "样本类型", "type": "text" },
    { "key": "report.reportDate", "label": "报告日期", "type": "text" }
  ]',
  '生化（肝肾功能）模板，含项目表与 Q&A',
  1,
  '<div style="font-size:10px;color:#666;width:100%;padding:0 10mm;display:flex;justify-content:space-between;align-items:center;">
    <div>{{hospital.name}} · {{report.title}}</div>
    <div>姓名：{{patient.name}} ｜ 编号：{{report.sampleId}} ｜ 日期：<span class="date"></span></div>
  </div>',
  '<div style="font-size:9px;color:#666;width:100%;padding:0 10mm;display:flex;justify-content:space-between;align-items:center;">
    <div>说明：本报告仅供临床参考</div>
    <div><span class="pageNumber"></span>/<span class="totalPages"></span></div>
  </div>',
  18, 16,
  NOW(), NOW()
);

/* 3) 胸部CT 影像学报告（A4，所见/印象、Q&A） */
INSERT INTO `htmltemplate`
(`id`,`name`,`type`,`content`,`widthMm`,`heightMm`,`fields`,`remark`,
 `displayHeaderFooter`,`headerHtml`,`footerHtml`,`headerHeightMm`,`footerHeightMm`,
 `createdAt`,`updatedAt`)
VALUES
(
  'tpl_ct_chest',
  '胸部CT 影像学报告',
  'A4',
  '<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: "NotoSansSC";
    src: url("/static/fonts/NotoSansSC-Regular.ttf") format("truetype");
    font-weight: normal; font-style: normal;
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 10mm; font-family: NotoSansSC, Arial, sans-serif; color: #222; }
  h1 { font-size: 18px; margin: 0 0 8px 0; }
  .meta { width: 100%; border-collapse: collapse; margin-bottom: 12px; }
  .meta th, .meta td { border: 1px solid #ddd; padding: 6px 8px; font-size: 12px; }
  .meta th { background: #fafafa; width: 18%; text-align: right; color: #666; }
  .section { margin-top: 10px; }
  .label { font-weight: 600; color: #333; }
  .text { color: #555; }
</style>
</head>
<body>
  <h1>{{report.title}}</h1>
  <table class="meta">
    <tr><th>机构</th><td>{{hospital.name}}</td><th>姓名</th><td>{{patient.name}}</td></tr>
    <tr><th>性别/年龄</th><td>{{patient.gender}} / {{patient.age}}</td><th>检查编号</th><td>{{report.sampleId}}</td></tr>
    <tr><th>检查设备</th><td>{{imaging.device}}</td><th>报告日期</th><td>{{report.reportDate}}</td></tr>
  </table>

  <div class="section">
    <div class="label">检查方法：</div>
    <div class="text">{{imaging.method}}</div>
  </div>

  <div class="section">
    <div class="label">主要所见：</div>
    <div class="text">{{imaging.findings}}</div>
  </div>

  <div class="section">
    <div class="label">印象（结论）：</div>
    <div class="text">{{imaging.impression}}</div>
  </div>

  <div class="section">
    <div class="label">医生建议（Q&A）：</div>
    {{#each qa}}
      <div style="margin:6px 0;">
        <div class="label">Q: {{this.q}}</div>
        <div class="text">A: {{this.a}}</div>
      </div>
    {{/each}}
  </div>
</body>
</html>',
  NULL, NULL,
  '[
    { "key": "hospital.name", "label": "机构名称", "type": "text" },
    { "key": "patient.name", "label": "姓名", "type": "text" },
    { "key": "patient.gender", "label": "性别", "type": "select", "options": ["男","女"] },
    { "key": "patient.age", "label": "年龄", "type": "text" },
    { "key": "report.title", "label": "报告标题", "type": "text" },
    { "key": "report.sampleId", "label": "检查编号", "type": "text" },
    { "key": "report.reportDate", "label": "报告日期", "type": "text" },
    { "key": "imaging.device", "label": "设备", "type": "text" },
    { "key": "imaging.method", "label": "检查方法", "type": "textarea" },
    { "key": "imaging.findings", "label": "主要所见", "type": "textarea" },
    { "key": "imaging.impression", "label": "印象", "type": "textarea" }
  ]',
  '胸部CT影像学模板，含所见/印象与 Q&A',
  1,
  '<div style="font-size:10px;color:#666;width:100%;padding:0 10mm;display:flex;justify-content:space-between;align-items:center;">
    <div>{{hospital.name}} · {{report.title}}</div>
    <div>姓名：{{patient.name}} ｜ 编号：{{report.sampleId}} ｜ 日期：<span class="date"></span></div>
  </div>',
  '<div style="font-size:9px;color:#666;width:100%;padding:0 10mm;display:flex;justify-content:space-between;align-items:center;">
    <div>说明：仅作临床参考，异常请及时就医</div>
    <div><span class="pageNumber"></span>/<span class="totalPages"></span></div>
  </div>',
  18, 16,
  NOW(), NOW()
);
