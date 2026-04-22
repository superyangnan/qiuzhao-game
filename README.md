# 人生简历 · 秋招模拟器

这是一个沉浸式的叙事类文字游戏，旨在模拟中国高校应届毕业生的秋招全过程。玩家将设定自己的学历、专业、求职目标和特殊经历，并在这场长达五个月（8月至12月）的虚拟秋招中经历各类高压、社交、面试等真实感极强的随机事件，并由 AI 为玩家生成专属剧情和最终结局卡片。

## 🎯 核心特性

- **AI 驱动生成**：结合火山引擎方舟模型 (Doubao) 动态生成每一次秋招突发事件和独一无二的治愈结局文案。
- **状态机与数值系统**：内置信心、压力、焦虑、心气、余额、努力值等核心属性，选项将实时影响玩家的秋招状态并导向不同的事件链。
- **16 种分支结局**：涵盖"人生赢家"、"先躺为敬"、"委屈上岸"、"铁饭碗"等符合当代年轻人的真实收尾。
- **极简人文风 UI**：采用类似 Claude 的无边框、大留白、衬线体设计，提供安静沉浸的阅读体验。

## 🚀 部署与运行 (Vercel 原生支持)

本项目架构完全兼容 [Vercel 支持的现代 Web 框架标准](https://vercel.com/docs/frameworks/more-frameworks)。
由于 Vercel 原生支持 **Static HTML (静态前端)** 和 **Node.js / Edge Runtime (无服务器函数)**，本项目可以实现**零配置一键免费部署**，无需自行购买服务器和域名备案。

### 方案 A：一键部署到 Vercel (推荐，线上访问)

1. Fork 本项目到你的 GitHub 账号。
2. 登录 [Vercel](https://vercel.com/)，点击 **Add New -> Project**，导入你 Fork 的仓库。
3. 在部署配置页的 **Environment Variables** 中添加大模型密钥：
   - Name: `ARK_KEY`
   - Value: `你的火山引擎方舟_API_KEY`
4. 点击 **Deploy**。Vercel 会自动将根目录的静态文件（`preview.html`）作为入口，并将 `api/ark.js` 部署为 Edge Function 来代理 AI 请求，解决跨域并隐藏真实 API Key。

### 方案 B：本地快速启动 (开发调试)

如果你想在本地开发修改前端 UI 或调试 AI Prompt：

1. **配置环境变量**：复制一份示例配置并填入你的 Key。
   ```bash
   cp .env.example .env
   # 编辑 .env 文件，填入 ARK_KEY=你的_API_KEY
   ```
2. **安装依赖**：
   ```bash
   pip3 install -r requirements.txt
   ```
3. **启动本地服务**：
   ```bash
   python3 server.py
   ```
   *本地的 `server.py` 会自动读取 `.env` 并提供和 Vercel 一致的代理接口体验。*
4. **访问游戏**：在浏览器打开 [http://localhost:8899/preview.html](http://localhost:8899/preview.html)

---

## 🛠️ 项目架构

项目采用了前后端分离但极度轻量的设计，兼顾了本地单机开发体验和 Vercel Serverless 生产环境：

### 核心目录树
```text
qiuzhao-game/
├── preview.html         # 核心！单文件前端，包含完整的极简 UI、游戏引擎与 AI Prompt 逻辑
├── api/
│   └── ark.js           # Vercel Serverless Edge Function，用于线上代理大模型请求
├── vercel.json          # Vercel 路由配置（将 / 重写到 preview.html）
├── server.py            # Python 本地开发服务器（等效替代 api/ark.js 方便本地脱机调试）
├── .env                 # 本地环境变量配置（包含 ARK_KEY）
└── src/                 # （历史保留）Taro 工程源码目录，如需编译微信小程序时使用
```

## ⚙️ AI 大模型配置指南 (二次开发)

项目默认使用火山引擎（方舟）的 Doubao 模型来动态生成剧情。

1. 登录 [火山引擎方舟控制台](https://console.volcengine.com/ark)。
2. 创建一个**在线推理接入点**（Endpoint），获取接入点 ID（如 `ep-xxxxxxxx`）。
3. 修改 `preview.html` 中的模型配置（约第 1775 行）：
   ```javascript
   const ARK_MODEL = 'ep-你的接入点ID'
   ```
4. 在 Vercel 后台（或本地 `.env`）中配置对应的 `ARK_KEY`。

---

## 🎨 扩展与定制玩法

如果你想增加新的游戏事件或修改难度，可以在 `preview.html` 中直接修改：
- **新增固定事件**：在 `FIXED_EVENTS` 数组中添加对象。游戏引擎会根据设定的 `chapter` 自动按序触发。
- **调整初始数值**：修改 `getInitialAttributes(player)` 函数中不同学校/背景对开局属性的增减益。
- **修改难度**：在 Prompt 模板（`generateSingleEvent` 函数内）调整 AI 对“努力值”和“压力值”的奖惩幅度限制。
