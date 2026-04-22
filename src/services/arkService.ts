import Taro from '@tarojs/taro'
import type { GameState, ArkEventResponse, ArkInterviewResponse, ArkEndingResponse, ArkMessage } from '../types/game'
import type { EventTemplate } from '../data/events/templates'
import {
  mockGenerateRandomEvent,
  mockGenerateInterviewQuestion,
  mockGenerateEndingStory,
} from './arkMock'

const CLOUD_ENV = '填入你的云环境ID'  // 格式: qiuzhao-prod-xxxxxxxx
const CLOUD_FUNC = 'ark-proxy'

// H5 开发模式下使用 Mock，无需云函数
const USE_MOCK = process.env.NODE_ENV === 'development' && process.env.TARO_ENV === 'h5'

// ─── 构建玩家画像摘要 ─────────────────────────────────────────

function buildPlayerSummary(state: GameState): string {
  const p = state.player
  if (!p) return ''

  const eduMap: Record<string, string> = {
    college: '专科', bachelor_normal: '双非本科', bachelor_211: '211本科',
    bachelor_985: '985本科', master: '硕士', phd: '博士'
  }
  const majorMap: Record<string, string> = {
    cs: '计算机', finance: '金融', law: '法学', medicine: '临床医学',
    biology: '生物', math: '数学统计', electronics: '电子通信',
    civil: '土木建筑', accounting: '会计', business: '工商管理',
    trade: '国际贸易', chinese: '中文/新闻', history: '历史哲学',
    foreign_lang: '外语', nursing: '护理'
  }
  const jobMap: Record<string, string> = {
    big_tech: '互联网大厂', state_owned: '国企', foreign: '外资',
    civil_servant: '考公', postgrad: '考研二战', explore: '自由探索'
  }
  const cityMap: Record<string, string> = {
    tier1: '北上广深', new_tier1: '新一线城市', tier2: '二线城市', hometown: '回老家'
  }

  return `学历：${eduMap[p.edu]}，专业：${majorMap[p.major]}，
求职目标：${jobMap[p.jobTarget]}，目标城市：${cityMap[p.city]}，
特殊背景：${p.backgrounds.join('/')}`.trim()
}

function buildEventHistory(state: GameState): string {
  return state.eventHistory
    .slice(-5)
    .map(h => `【${h.event.title}】选择了：${h.event.options[h.choiceIdx]?.text ?? '未知'}`)
    .join('\n') || '（暂无已发生事件）'
}

// ─── 系统Prompt ──────────────────────────────────────────────

function buildSystemPrompt(state: GameState): string {
  const { attributes } = state
  return `你是《人生简历》秋招模拟游戏的世界叙事引擎。

## 玩家画像
${buildPlayerSummary(state)}

## 当前状态
游戏时间：2024年${8 + state.chapter - 1}月
心理属性：信心${attributes.confidence}/压力${attributes.stress}/焦虑${attributes.anxiety}/心气${attributes.morale}/现金${attributes.money}

## 近期发生的事件
${buildEventHistory(state)}

## 你的要求
1. 生成符合玩家身份的个性化内容
2. 语言贴近中国当代年轻人的真实语境，口语化、有细节
3. 不要说教，不要给建议，只是呈现真实
4. 保持叙事连贯性，可引用之前发生过的事件
5. 严格按照要求的JSON格式输出，不要有任何额外文字`
}

// ─── 云函数调用封装 ──────────────────────────────────────────

async function callArkProxy(messages: ArkMessage[], systemPrompt: string): Promise<string> {
  const result = await Taro.cloud.callFunction({
    name: CLOUD_FUNC,
    data: { messages, systemPrompt },
  }) as any

  if (result.result?.error) {
    throw new Error(result.result.error)
  }
  return result.result?.content ?? ''
}

// ─── 随机事件生成 ─────────────────────────────────────────────

export async function generateRandomEvent(
  state: GameState,
  template: EventTemplate,
): Promise<ArkEventResponse> {
  if (USE_MOCK) return mockGenerateRandomEvent()

  const messages: ArkMessage[] = [
    {
      role: 'user',
      content: `请根据以下模板，生成一个秋招随机事件。

事件类别：${template.category}
生成提示：${template.promptHint}

属性变化范围提示：
- 正向属性（可以选1-2个适当增加）：${template.effectRange.positive?.join('、') ?? '无'}
- 负向属性（可以选1-2个适当减少）：${template.effectRange.negative?.join('、') ?? '无'}
- 每个属性变化幅度在-20到+20之间

请严格按以下JSON格式输出，不要有其他文字：
{
  "event_title": "（10字以内的标题）",
  "event_desc": "（80-150字，第二人称叙事，有具体细节，口语化）",
  "options": [
    {"text": "（选项1，15-25字）", "effect": {"confidence": 0, "stress": 0, "anxiety": 0, "morale": 0, "money": 0}},
    {"text": "（选项2，15-25字）", "effect": {"confidence": 0, "stress": 0, "anxiety": 0, "morale": 0, "money": 0}},
    {"text": "（选项3，15-25字）", "effect": {"confidence": 0, "stress": 0, "anxiety": 0, "morale": 0, "money": 0}}
  ]
}`,
    },
  ]

  try {
    const raw = await callArkProxy(messages, buildSystemPrompt(state))
    const jsonStr = raw.match(/\{[\s\S]*\}/)?.[0] ?? raw
    return JSON.parse(jsonStr) as ArkEventResponse
  } catch {
    throw new Error('AI事件生成失败')
  }
}

// ─── 面试追问生成 ─────────────────────────────────────────────

export async function generateInterviewQuestion(
  state: GameState,
  context: {
    companyName: string
    position: string
    round: number
    interviewerType: string
    playerAnswer: string
    conversationHistory: string
  },
): Promise<ArkInterviewResponse> {
  if (USE_MOCK) {
    const turn = context.conversationHistory.split('\n').filter(l => l.startsWith('玩家')).length
    return mockGenerateInterviewQuestion(context.playerAnswer, turn)
  }

  const interviewerDesc: Record<string, string> = {
    strict:   '严厉型，追问细节，不轻易满意',
    friendly: '友善型，聊天式，但深挖实质',
    pressure: '压力型，故意质疑，试探心理承受',
    lazy:     '划水型，走过场，但结果不可预期',
  }

  const messages: ArkMessage[] = [
    {
      role: 'user',
      content: `当前面试场景：
公司：${context.companyName}
岗位：${context.position}（第${context.round}轮面试）
面试官风格：${interviewerDesc[context.interviewerType]}

对话历史：
${context.conversationHistory}

玩家最新回答：${context.playerAnswer}

请以面试官身份，基于玩家的回答生成下一个追问。要符合面试官风格，紧扣岗位和玩家回答内容。

按JSON格式输出：
{
  "interviewer_say": "（面试官说的话，30-80字，自然口语）",
  "hint": "（可选，给玩家的小提示，不超过20字，可以为null）"
}`,
    },
  ]

  try {
    const raw = await callArkProxy(messages, buildSystemPrompt(state))
    const jsonStr = raw.match(/\{[\s\S]*\}/)?.[0] ?? raw
    return JSON.parse(jsonStr) as ArkInterviewResponse
  } catch {
    throw new Error('面试问题生成失败')
  }
}

// ─── 结局治愈文案生成 ─────────────────────────────────────────

export async function generateEndingStory(
  state: GameState,
  context: {
    endingTitle: string
    endingSubtitle: string
    templateStory: string
    keyEvents: string[]
    peakStressEvent: string
    finalResult: string
  },
): Promise<ArkEndingResponse> {
  if (USE_MOCK) return mockGenerateEndingStory(state.ending ?? 'default')

  const messages: ArkMessage[] = [
    {
      role: 'user',
      content: `请为这位玩家生成个性化的秋招结局治愈文案。

结局标题：${context.endingTitle}
结局副标题：${context.endingSubtitle}

参考模板（可以改写，但保留核心情绪）：
${context.templateStory}

玩家经历的关键事件（请在文案中有所体现）：
${context.keyEvents.map((e, i) => `${i + 1}. ${e}`).join('\n')}

最高压力时刻：${context.peakStressEvent}
最终结果：${context.finalResult}

写作要求：
1. 400-600字
2. 第二人称叙事，直接对"你"说话
3. 引用玩家实际经历的1-2个具体事件
4. 温柔但不煽情，真实但不沉重
5. 不说"一切都会好的"这类空话
6. 结尾单独一行给出一句金句（15字以内）

按JSON格式输出：
{
  "story": "（正文）",
  "gold_quote": "（金句，15字以内）"
}`,
    },
  ]

  try {
    const raw = await callArkProxy(messages, buildSystemPrompt(state))
    const jsonStr = raw.match(/\{[\s\S]*\}/)?.[0] ?? raw
    return JSON.parse(jsonStr) as ArkEndingResponse
  } catch {
    throw new Error('结局文案生成失败')
  }
}
