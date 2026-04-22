// ─── 角色相关类型 ───────────────────────────────────────────

export type EduLevel = 'college' | 'bachelor_normal' | 'bachelor_211' | 'bachelor_985' | 'master' | 'phd'

export type SchoolTier = 'S' | 'A' | 'B' | 'C' | 'D'

export type Major =
  | 'cs' | 'electronics' | 'civil' | 'biology' | 'math'
  | 'finance' | 'accounting' | 'business' | 'trade'
  | 'law' | 'chinese' | 'history' | 'foreign_lang'
  | 'medicine' | 'nursing'

export type JobTarget = 'big_tech' | 'state_owned' | 'foreign' | 'civil_servant' | 'postgrad' | 'explore'

export type City = 'tier1' | 'new_tier1' | 'tier2' | 'hometown'

export type Background =
  | 'big_tech_intern'
  | 'research_paper'
  | 'startup'
  | 'student_leader'
  | 'competition_award'
  | 'family_connections'
  | 'financial_pressure'
  | 'cross_major'

export interface PlayerProfile {
  edu: EduLevel
  schoolTier: SchoolTier
  major: Major
  jobTarget: JobTarget
  city: City
  backgrounds: Background[]
  name?: string
}

// ─── 心理属性 ───────────────────────────────────────────────

export interface Attributes {
  confidence: number  // 信心 0-100
  stress: number      // 压力 0-100
  anxiety: number     // 焦虑 0-100
  morale: number      // 心气 0-100
  money: number       // 现金 0-100
}

export type AttributeKey = keyof Attributes

export type AttributeDelta = Partial<Record<AttributeKey, number>>

// ─── 事件系统 ───────────────────────────────────────────────

export type EventType = 'fixed' | 'conditional' | 'random' | 'hidden'
export type EventCategory = 'light' | 'stress' | 'social' | 'turning' | 'interview'

export interface EventOption {
  id: string
  text: string
  effect: AttributeDelta
  nextEventId?: string        // 指定下一个触发的事件
  unlockFlag?: string         // 解锁某个flag
  requireFlag?: string        // 需要某个flag才可选
}

export interface GameEvent {
  id: string
  type: EventType
  category: EventCategory
  title: string
  desc: string
  options: EventOption[]
  triggerCondition?: EventTriggerCondition
  chapter?: number            // 属于哪个章节
  weight?: number             // 随机抽取权重
  isOneShot?: boolean         // 是否只触发一次
}

export interface EventTriggerCondition {
  minChapter?: number
  maxChapter?: number
  majors?: Major[]
  eduLevels?: EduLevel[]
  schoolTiers?: SchoolTier[]
  jobTargets?: JobTarget[]
  backgrounds?: Background[]
  minConfidence?: number
  maxConfidence?: number
  minStress?: number
  maxStress?: number
  minAnxiety?: number
  maxAnxiety?: number
  minMorale?: number
  maxMorale?: number
  flags?: string[]            // 需要哪些flag已激活
  notFlags?: string[]         // 哪些flag未激活
}

// ─── 公司与求职 ───────────────────────────────────────────────

export type CompanyTier = 'S' | 'A' | 'B' | 'C' | 'D' | 'special'

export interface Company {
  id: string
  name: string
  tier: CompanyTier
  industry: string
  salaryRange: [number, number]  // 月薪 k
  rounds: number                 // 面试轮数
  basePassRate: number           // 基础通过率
  specialEvent?: string          // 关联特殊事件id
}

export interface ApplicationRecord {
  companyId: string
  status: 'applied' | 'test' | 'interview' | 'offer' | 'rejected' | 'ghosted'
  round: number
  offerSalary?: number
}

// ─── 面试系统 ───────────────────────────────────────────────

export type InterviewerType = 'strict' | 'friendly' | 'pressure' | 'lazy'

export interface InterviewSession {
  companyId: string
  round: number
  interviewerType: InterviewerType
  messages: InterviewMessage[]
  isComplete: boolean
  result?: 'pass' | 'fail'
}

export interface InterviewMessage {
  role: 'interviewer' | 'player'
  content: string
  timestamp: number
}

// ─── 结局系统 ───────────────────────────────────────────────

export type EndingType = 'A1' | 'A2' | 'B1' | 'B2' | 'B3' | 'C1' | 'C2' | 'C3' | 'C4' | 'D1' | 'D2' | 'D3' | 'E1' | 'E2' | 'E3' | 'E4'

export interface Ending {
  id: EndingType
  title: string
  subtitle: string
  rarity: 'common' | 'uncommon' | 'rare' | 'secret'
  triggerCondition: EndingCondition
  templateStory: string  // 治愈文案模板，变量用{placeholder}
  goldQuote: string      // 金句（兜底，方舟生成失败时用）
  cardStyle: 'warm' | 'cool' | 'neutral' | 'dramatic'
}

export interface EndingCondition {
  minBestOfferTier?: CompanyTier
  maxBestOfferTier?: CompanyTier
  hasOffer?: boolean
  minConfidence?: number
  maxStress?: number
  maxAnxiety?: number
  minMorale?: number
  flags?: string[]
  eduLevels?: EduLevel[]
  specificPath?: string
}

// ─── 游戏状态 ───────────────────────────────────────────────

export type GamePhase = 'idle' | 'creating' | 'playing' | 'interview' | 'ending'

export type Chapter = 1 | 2 | 3 | 4 | 5

export interface GameState {
  phase: GamePhase
  chapter: Chapter
  chapterProgress: number          // 当前章节内第几个事件
  player: PlayerProfile | null
  attributes: Attributes
  flags: Set<string>               // 已激活的标志位
  triggeredEventIds: Set<string>   // 已触发的事件id
  applications: ApplicationRecord[]
  currentEvent: GameEvent | null
  currentInterview: InterviewSession | null
  eventHistory: Array<{event: GameEvent; choiceIdx: number}>
  ending: EndingType | null
  endingStory: string              // 方舟生成的治愈文案
}

// ─── 方舟API相关 ───────────────────────────────────────────────

export interface ArkMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface ArkEventResponse {
  event_title: string
  event_desc: string
  options: Array<{
    text: string
    effect: AttributeDelta
  }>
}

export interface ArkInterviewResponse {
  interviewer_say: string
  hint?: string
}

export interface ArkEndingResponse {
  story: string
  gold_quote: string
}
