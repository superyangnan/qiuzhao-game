import type { GameEvent, GameState, PlayerProfile, EventTriggerCondition } from '../types/game'
import { FIXED_EVENTS } from '../data/events/fixed'
import { CONDITIONAL_EVENTS } from '../data/events/conditional'

// ─── 条件匹配 ────────────────────────────────────────────────

function matchesCondition(
  cond: EventTriggerCondition,
  state: GameState,
  player: PlayerProfile,
): boolean {
  const { chapter, attributes, flags } = state
  const { confidence, stress, anxiety, morale } = attributes

  if (cond.minChapter !== undefined && chapter < cond.minChapter) return false
  if (cond.maxChapter !== undefined && chapter > cond.maxChapter) return false

  if (cond.majors?.length && !cond.majors.includes(player.major)) return false
  if (cond.eduLevels?.length && !cond.eduLevels.includes(player.edu)) return false
  if (cond.schoolTiers?.length && !cond.schoolTiers.includes(player.schoolTier)) return false
  if (cond.jobTargets?.length && !cond.jobTargets.includes(player.jobTarget)) return false
  if (cond.backgrounds?.length && !cond.backgrounds.some(b => player.backgrounds.includes(b))) return false

  if (cond.minConfidence !== undefined && confidence < cond.minConfidence) return false
  if (cond.maxConfidence !== undefined && confidence > cond.maxConfidence) return false
  if (cond.minStress !== undefined && stress < cond.minStress) return false
  if (cond.maxStress !== undefined && stress > cond.maxStress) return false
  if (cond.minAnxiety !== undefined && anxiety < cond.minAnxiety) return false
  if (cond.maxAnxiety !== undefined && anxiety > cond.maxAnxiety) return false
  if (cond.minMorale !== undefined && morale < cond.minMorale) return false
  if (cond.maxMorale !== undefined && morale > cond.maxMorale) return false

  if (cond.flags?.length && !cond.flags.every(f => flags.has(f))) return false
  if (cond.notFlags?.length && cond.notFlags.some(f => flags.has(f))) return false

  return true
}

// ─── 固定事件 ────────────────────────────────────────────────

export function getFixedEventsForChapter(chapter: number, triggeredIds: Set<string>): GameEvent[] {
  return FIXED_EVENTS.filter(e =>
    e.chapter === chapter &&
    !(e.isOneShot && triggeredIds.has(e.id))
  )
}

// ─── 条件事件（抽取） ─────────────────────────────────────────

export function drawConditionalEvent(state: GameState): GameEvent | null {
  if (!state.player) return null

  const eligible = CONDITIONAL_EVENTS.filter(e => {
    if (e.isOneShot && state.triggeredEventIds.has(e.id)) return false
    if (!e.triggerCondition) return true
    return matchesCondition(e.triggerCondition, state, state.player!)
  })

  if (eligible.length === 0) return null

  // 权重抽取
  const totalWeight = eligible.reduce((sum, e) => sum + (e.weight ?? 1), 0)
  let rand = Math.random() * totalWeight
  for (const event of eligible) {
    rand -= (event.weight ?? 1)
    if (rand <= 0) return event
  }
  return eligible[eligible.length - 1]
}

// ─── 章节事件序列生成 ─────────────────────────────────────────

export interface ChapterEventPlan {
  fixed: GameEvent[]
  conditional: GameEvent[]
}

export function buildChapterPlan(state: GameState): ChapterEventPlan {
  const fixed = getFixedEventsForChapter(state.chapter, state.triggeredEventIds)

  // 每章从条件事件抽取1-2个
  const conditionalCount = state.chapter === 3 ? 2 : 1
  const conditional: GameEvent[] = []
  const tempTriggered = new Set(state.triggeredEventIds)

  for (let i = 0; i < conditionalCount; i++) {
    const tempState = { ...state, triggeredEventIds: tempTriggered }
    const e = drawConditionalEvent(tempState)
    if (e) {
      conditional.push(e)
      tempTriggered.add(e.id)
    }
  }

  return { fixed, conditional }
}

// ─── 事件序列排序 ─────────────────────────────────────────────

export function interleaveEvents(plan: ChapterEventPlan): GameEvent[] {
  const result: GameEvent[] = []
  const fixed = [...plan.fixed]
  const conditional = [...plan.conditional]

  // 交替插入：固定事件 → 条件事件 → 固定事件...
  while (fixed.length > 0 || conditional.length > 0) {
    if (fixed.length > 0) result.push(fixed.shift()!)
    if (conditional.length > 0) result.push(conditional.shift()!)
  }

  return result
}

// ─── 应用事件选项 ─────────────────────────────────────────────

export function applyEventChoice(
  state: GameState,
  event: GameEvent,
  choiceIdx: number,
): Partial<GameState> {
  const option = event.options[choiceIdx]
  if (!option) return {}

  const newFlags = new Set(state.flags)
  if (option.unlockFlag) newFlags.add(option.unlockFlag)

  const newTriggered = new Set(state.triggeredEventIds)
  newTriggered.add(event.id)

  return {
    flags: newFlags,
    triggeredEventIds: newTriggered,
    eventHistory: [...state.eventHistory, { event, choiceIdx }],
  }
}
