import { create } from 'zustand'
import type { GameState, PlayerProfile, GameEvent, Chapter } from '../types/game'
import type { GameEngine } from '../engine/gameEngine'
import {
  createInitialState,
  initChapter,
  processChoice,
  advanceChapter,
  shouldAdvanceChapter,
} from '../engine/gameEngine'
import { applyDelta } from '../engine/attributeSystem'

interface GameStore {
  engine: GameEngine | null
  isAILoading: boolean
  aiErrorFallback: boolean

  // ─── Actions ────────────────────────────────────────
  startGame: (player: PlayerProfile) => void
  makeChoice: (choiceIdx: number) => void
  goNextChapter: () => void
  setAIEvent: (event: GameEvent) => void
  setAILoading: (loading: boolean) => void
  setAIError: (fallback: boolean) => void
  resetGame: () => void

  // ─── Computed getters ────────────────────────────────
  getState: () => GameState | null
  getCurrentEvent: () => GameEvent | null
  isChapterComplete: () => boolean
}

export const useGameStore = create<GameStore>((set, get) => ({
  engine: null,
  isAILoading: false,
  aiErrorFallback: false,

  startGame: (player) => {
    const state = createInitialState(player)
    let engine: GameEngine = { state, eventQueue: [] }
    engine = initChapter(engine)
    set({ engine, isAILoading: false, aiErrorFallback: false })
  },

  makeChoice: (choiceIdx) => {
    const { engine } = get()
    if (!engine || !engine.state.currentEvent) return

    const option = engine.state.currentEvent.options[choiceIdx]
    if (!option) return

    const newEngine = processChoice(engine, choiceIdx)
    set({ engine: newEngine })
  },

  goNextChapter: () => {
    const { engine } = get()
    if (!engine) return
    const newEngine = advanceChapter(engine)
    set({ engine: newEngine })
  },

  setAIEvent: (event) => {
    const { engine } = get()
    if (!engine) return
    set({
      engine: {
        ...engine,
        eventQueue: [event, ...engine.eventQueue],
        state: {
          ...engine.state,
          currentEvent: engine.state.currentEvent ?? event,
        },
      },
      isAILoading: false,
    })
  },

  setAILoading: (loading) => set({ isAILoading: loading }),
  setAIError: (fallback) => set({ aiErrorFallback: fallback, isAILoading: false }),

  resetGame: () => set({ engine: null, isAILoading: false, aiErrorFallback: false }),

  getState: () => get().engine?.state ?? null,
  getCurrentEvent: () => get().engine?.state.currentEvent ?? null,
  isChapterComplete: () => {
    const { engine } = get()
    if (!engine) return false
    return shouldAdvanceChapter(engine)
  },
}))
