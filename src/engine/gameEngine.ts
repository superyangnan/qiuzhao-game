import type { GameState, Chapter, GameEvent, PlayerProfile, Attributes } from '../types/game'
import { applyDelta, detectCriticalState } from './attributeSystem'
import { buildChapterPlan, interleaveEvents, applyEventChoice } from './eventSystem'
import { determineEnding, fillEndingTemplate } from './endingSystem'
import { getInitialAttributes } from '../data/characterOptions'

export const CHAPTER_NAMES: Record<number, string> = {
  1: '8月·内推季',
  2: '9月·海投期',
  3: '10月·高峰期',
  4: '11月·等待期',
  5: '12月·收尾期',
}

export const CHAPTER_MONTHS: Record<number, string> = {
  1: '2024年8月',
  2: '2024年9月',
  3: '2024年10月',
  4: '2024年11月',
  5: '2024年12月',
}

// ─── 初始状态工厂 ─────────────────────────────────────────────

export function createInitialState(player: PlayerProfile): GameState {
  const attrs = getInitialAttributes(player) as Attributes
  return {
    phase: 'playing',
    chapter: 1,
    chapterProgress: 0,
    player,
    attributes: attrs,
    flags: new Set<string>(),
    triggeredEventIds: new Set<string>(),
    applications: [],
    currentEvent: null,
    currentInterview: null,
    eventHistory: [],
    ending: null,
    endingStory: '',
  }
}

// ─── 章节事件队列 ─────────────────────────────────────────────

export interface GameEngine {
  state: GameState
  eventQueue: GameEvent[]
}

export function initChapter(engine: GameEngine): GameEngine {
  const plan = buildChapterPlan(engine.state)
  const queue = interleaveEvents(plan)
  return {
    ...engine,
    eventQueue: queue,
    state: {
      ...engine.state,
      chapterProgress: 0,
      currentEvent: queue[0] ?? null,
    },
  }
}

// ─── 处理玩家选择 ─────────────────────────────────────────────

export function processChoice(engine: GameEngine, choiceIdx: number): GameEngine {
  const { state, eventQueue } = engine
  if (!state.currentEvent) return engine

  const event = state.currentEvent
  const option = event.options[choiceIdx]
  if (!option) return engine

  // 应用属性变化
  const newAttrs = applyDelta(state.attributes, option.effect)

  // 应用事件副作用（flags 等）
  const eventChanges = applyEventChoice(state, event, choiceIdx)

  // 检测临界状态，可能插入强制事件
  const criticalState = detectCriticalState(newAttrs)
  let newQueue = eventQueue.slice(1) // 移除已处理的事件

  // 如果有指定下一个事件
  if (option.nextEventId) {
    const { FIXED_EVENTS } = require('../data/events/fixed')
    const { CONDITIONAL_EVENTS } = require('../data/events/conditional')
    const all = [...FIXED_EVENTS, ...CONDITIONAL_EVENTS]
    const nextEvent = all.find((e: GameEvent) => e.id === option.nextEventId)
    if (nextEvent) {
      newQueue = [nextEvent, ...newQueue]
    }
  }

  const newProgress = state.chapterProgress + 1
  const nextEvent = newQueue[0] ?? null

  const newState: GameState = {
    ...state,
    ...eventChanges,
    attributes: newAttrs,
    chapterProgress: newProgress,
    currentEvent: nextEvent,
  }

  return { state: newState, eventQueue: newQueue }
}

// ─── 推进到下一章节 ───────────────────────────────────────────

export function advanceChapter(engine: GameEngine): GameEngine {
  const { state } = engine
  const nextChapter = (state.chapter + 1) as Chapter

  if (nextChapter > 5) {
    // 进入结局
    const endingId = determineEnding(state)
    const endingStory = fillEndingTemplate(endingId, state)
    return {
      ...engine,
      eventQueue: [],
      state: {
        ...state,
        phase: 'ending',
        ending: endingId,
        endingStory,
      },
    }
  }

  const newState: GameState = {
    ...state,
    chapter: nextChapter,
    chapterProgress: 0,
    currentEvent: null,
  }

  return initChapter({ state: newState, eventQueue: [] })
}

// ─── 检查是否应当推进章节 ─────────────────────────────────────

export function shouldAdvanceChapter(engine: GameEngine): boolean {
  return engine.eventQueue.length === 0 && engine.state.currentEvent === null
}

// ─── 临界状态摘要（用于UI提示） ───────────────────────────────

export function getCriticalStateMessage(engine: GameEngine): string | null {
  const critical = detectCriticalState(engine.state.attributes)
  switch (critical) {
    case 'breakdown':
      return '⚠️ 你感到快撑不住了……'
    case 'lying_flat':
      return '😮‍💨 你开始觉得，躺平也没什么不好……'
    case 'broke':
      return '💸 钱包见底了，压力又多了一层'
    case 'burning':
      return '🔥 你感到一种孤注一掷的冲动'
    case 'balanced':
      return '😌 你保持着一种奇特的平静'
    default:
      return null
  }
}
