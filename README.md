# 人生简历 · 秋招模拟器

这是一个沉浸式的叙事类文字游戏，旨在模拟中国高校应届毕业生的秋招全过程。玩家将设定自己的学历、专业、求职目标和特殊经历，并在这场长达五个月（8月至12月）的虚拟秋招中经历各类高压、社交、面试等真实感极强的随机事件，并由 AI 为玩家生成专属剧情和最终结局卡片。

## 🎯 核心特性

- **AI 驱动生成**：结合火山引擎方舟模型 (Doubao) 动态生成每一次秋招突发事件和独一无二的治愈结局文案。
- **状态机与数值系统**：内置信心、压力、焦虑、心气、余额等 5 项核心属性，选项将实时影响玩家的秋招状态并导向不同的事件链。
- **16 种分支结局**：涵盖"人生赢家"、"先躺为敬"、"委屈上岸"、"铁饭碗"等符合当代年轻人的真实收尾。
- **真实代入感**：结合 15 个主流专业及其对应的头部公司/岗位进行专属内容生成。

## 🚀 本地快速启动 (推荐)

如果你只是想在本地快速体验游戏或修改静态前端，最快的方式是启动 Python 代理服务器。这不仅能够伺服 HTML 页面，还能代理解决调用大模型时的跨域 (CORS) 问题。

### 1. 启动本地服务
在项目根目录运行以下命令：
```bash
python3 server.py
```
*终端将输出：*
> ✓ 服务器启动：http://localhost:8899

### 2. 访问游戏
在浏览器中打开：
[http://localhost:8899/preview.html](http://localhost:8899/preview.html)

即可完整体验游戏。此模式默认使用了预置好的方舟 API Key (`ep-20260224204235-qmfjh`)。

---

## 🛠️ 项目架构

当前版本包含两套前端方案：
1. **纯 HTML/JS/CSS 静态单页 (推荐预览版)**
   - 文件：`preview.html`
   - 特点：单文件内聚了游戏所有视图、数据、引擎以及大模型 API 的请求逻辑。零依赖，配合 `server.py` 即可直接跑起来。
2. **Taro (React) + Zustand (小程序工程版)**
   - 目录：`src/`
   - 特点：用于后续编译打包成**微信小程序**和 H5。

### 核心目录树
```text
qiuzhao-game/
├── preview.html         # 核心！单文件前端，包含完整的 DOM 视图、样式与核心游戏引擎
├── server.py            # Python 本地开发服务器（提供静态文件和 /api/ark API 代理）
├── src/                 # Taro 工程源码目录（如需编译为微信小程序时使用）
│   ├── engine/          # 游戏状态机、属性结算与事件系统
│   ├── data/            # 预置的角色、选项和 16 种分支结局数据
│   └── services/        # 针对小程序的 Ark 大模型云函数封装
├── cloudfunctions/      # 微信小程序云开发函数（保护大模型 API Key）
├── package.json         # Node.js 依赖配置
└── config/              # Taro 编译打包配置
```

## ⚙️ AI 大模型配置指南 (二次开发必看)

项目依赖**火山引擎的方舟大模型**来动态生成剧情。如果你需要自己部署或修改模型配置：

### A. Python 代理服务配置（预览版）
如果你想使用自己的模型和 Key，请修改 `server.py`：
```python
# server.py 第 11-12 行
ARK_ENDPOINT = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions'
ARK_KEY      = '你的_API_KEY'
```
并在 `preview.html` 中同步你的接入点：
```javascript
// preview.html 第 1734 行左右
const ARK_MODEL = 'ep-你的接入点'
```

### B. 微信小程序环境配置（Taro版）
1. 登录[火山引擎控制台](https://console.volcengine.com/ark)，创建推理接入点。
2. 在**微信云开发控制台** → 云函数 `ark-proxy` 的环境变量中添加：
   `ARK_API_KEY = ep-你的API_KEY`
3. 修改 `cloudfunctions/ark-proxy/index.js` 中的 `MODEL_ID` 为你的接入点。
4. 修改 `project.config.json` 中的微信 `appid`，并将 `src/services/arkService.ts` 中的 `CLOUD_ENV` 换成你真实的云环境 ID。

---

## 🎨 扩展与定制玩法

如果你想增加新的游戏事件或修改难度，可以在 `preview.html` 中的数据区（约第 1012 行起）进行修改：
- **新增固定事件**：在 `FIXED_EVENTS` 数组中添加对象。游戏引擎会根据设定的 `chapter` 自动按序触发。
- **新增条件事件**：在 `CONDITIONAL_EVENTS` 数组中添加，可以通过 `triggerCondition` 字段限定该事件仅在玩家属于特定专业、或“压力大于 65”时才可能被抽取。
- **调整初始数值**：修改 `getInitialAttributes(player)` 函数中不同学校/背景对开局属性的增减益。
