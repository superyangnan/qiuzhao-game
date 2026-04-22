import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad, useDidShow } from '@tarojs/taro'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useGameStore } from '../../store/gameStore'
import EventCard from '../../components/EventCard'
import OptionButton from '../../components/OptionButton'
import AttributeBar from '../../components/AttributeBar'
import type { AttributeDelta } from '../../types/game'
import { EVENT_TEMPLATES } from '../../data/events/templates'
import { generateRandomEvent } from '../../services/arkService'
import { CHAPTER_NAMES, CHAPTER_MONTHS, getCriticalStateMessage } from '../../engine/gameEngine'
import './index.scss'

export default function GamePage() {
  const { engine, makeChoice, goNextChapter, setAIEvent, setAILoading, isAILoading } = useGameStore()
  const state = engine?.state

  const [showAttrs, setShowAttrs] = useState(false)
  const [lastDelta, setLastDelta] = useState<AttributeDelta | null>(null)
  const [typedLength, setTypedLength] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [showOptions, setShowOptions] = useState(false)
  const [chapterTransition, setChapterTransition] = useState(false)
  const typingTimer = useRef<any>(null)

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '人生简历' })
  })

  useDidShow(() => {
    if (!state) {
      Taro.redirectTo({ url: '/pages/index/index' })
    }
  })

  // 打字机效果
  useEffect(() => {
    const event = state?.currentEvent
    if (!event) return

    setTypedLength(0)
    setShowOptions(false)
    setSelectedIdx(null)
    setIsTyping(true)

    const totalLen = event.desc.length
    let current = 0
    const speed = Math.max(18, Math.min(40, totalLen / 60)) // 自适应速度

    typingTimer.current = setInterval(() => {
      current += 2
      if (current >= totalLen) {
        current = totalLen
        clearInterval(typingTimer.current)
        setIsTyping(false)
        setTimeout(() => setShowOptions(true), 300)
      }
      setTypedLength(current)
    }, speed)

    return () => clearInterval(typingTimer.current)
  }, [state?.currentEvent?.id])

  // 章节结束检测
  useEffect(() => {
    if (!engine) return
    const { isChapterComplete } = useGameStore.getState()
    if (isChapterComplete()) {
      handleChapterComplete()
    }
  }, [engine?.state.chapterProgress])

  // 游戏结束检测
  useEffect(() => {
    if (state?.phase === 'ending') {
      Taro.navigateTo({ url: '/pages/ending/index' })
    }
  }, [state?.phase])

  const handleChapterComplete = useCallback(async () => {
    const currentState = useGameStore.getState().engine?.state
    if (!currentState) return

    if (currentState.chapter >= 5) {
      goNextChapter()
      return
    }

    setChapterTransition(true)
    await new Promise(r => setTimeout(r, 1500))
    setChapterTransition(false)
    goNextChapter()

    // 章节切换后尝试生成AI事件
    tryGenerateAIEvent()
  }, [goNextChapter])

  const tryGenerateAIEvent = useCallback(async () => {
    const currentState = useGameStore.getState().engine?.state
    if (!currentState || isAILoading) return

    const templates = EVENT_TEMPLATES.filter(t => {
      if (t.minChapter && currentState.chapter < t.minChapter) return false
      if (t.maxChapter && currentState.chapter > t.maxChapter) return false
      return true
    })

    if (templates.length === 0) return

    const template = templates[Math.floor(Math.random() * templates.length)]
    setAILoading(true)

    try {
      const response = await generateRandomEvent(currentState, template)
      const aiEvent = {
        id: `AI-${Date.now()}`,
        type: 'random' as const,
        category: template.category as any,
        title: response.event_title,
        desc: response.event_desc,
        options: response.options.map((opt, idx) => ({
          id: `AI-opt-${idx}`,
          text: opt.text,
          effect: opt.effect,
        })),
      }
      setAIEvent(aiEvent)
    } catch {
      setAILoading(false)
    }
  }, [isAILoading, setAILoading, setAIEvent])

  function handleSkipTyping() {
    if (!isTyping || !state?.currentEvent) return
    clearInterval(typingTimer.current)
    setTypedLength(state.currentEvent.desc.length)
    setIsTyping(false)
    setShowOptions(true)
  }

  function handleChoice(idx: number) {
    if (selectedIdx !== null || !state?.currentEvent) return
    const option = state.currentEvent.options[idx]
    setSelectedIdx(idx)
    setLastDelta(option.effect)
    setTimeout(() => {
      makeChoice(idx)
      setLastDelta(null)
    }, 600)
  }

  if (!state) return null

  const criticalMsg = getCriticalStateMessage(engine!)

  return (
    <View className='game-page'>
      <View className='bg-layer' />

      {/* 章节过渡动画 */}
      {chapterTransition && (
        <View className='chapter-transition'>
          <Text className='transition-month'>{CHAPTER_MONTHS[state.chapter]}</Text>
          <Text className='transition-name'>{CHAPTER_NAMES[state.chapter]}</Text>
        </View>
      )}

      {/* 顶部状态栏 */}
      <View className='top-bar'>
        <View className='chapter-info'>
          <Text className='chapter-month'>{CHAPTER_MONTHS[state.chapter]}</Text>
          <Text className='chapter-name'>{CHAPTER_NAMES[state.chapter]}</Text>
        </View>
        <View className='attr-toggle' onClick={() => setShowAttrs(!showAttrs)}>
          <Text className='attr-toggle-text'>状态 {showAttrs ? '▲' : '▼'}</Text>
        </View>
      </View>

      {/* 属性面板（可折叠） */}
      {showAttrs && (
        <View className='attr-panel-wrap'>
          <AttributeBar attributes={state.attributes} showDelta={lastDelta ?? undefined} />
        </View>
      )}

      {/* 临界状态提示 */}
      {criticalMsg && !showAttrs && (
        <View className='critical-banner'>
          <Text className='critical-text'>{criticalMsg}</Text>
        </View>
      )}

      {/* AI 加载提示 */}
      {isAILoading && (
        <View className='ai-loading-bar'>
          <Text className='ai-loading-text'>✨ AI正在生成新事件…</Text>
        </View>
      )}

      {/* 事件内容区 */}
      <ScrollView scrollY className='game-scroll'>
        <View className='game-content'>
          {state.currentEvent ? (
            <>
              <View onClick={handleSkipTyping}>
                <EventCard
                  event={state.currentEvent}
                  isTyping={isTyping}
                  typedLength={typedLength}
                />
              </View>

              {showOptions && (
                <View className='options-area'>
                  <Text className='options-label'>— 你选择 —</Text>
                  {state.currentEvent.options.map((opt, idx) => (
                    <OptionButton
                      key={opt.id}
                      option={opt}
                      index={idx}
                      onSelect={handleChoice}
                      selected={selectedIdx === idx}
                      disabled={selectedIdx !== null && selectedIdx !== idx}
                    />
                  ))}
                </View>
              )}
            </>
          ) : (
            <View className='loading-event'>
              <Text className='loading-dot'>…</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 底部事件进度 */}
      <View className='bottom-progress'>
        {state.eventHistory.slice(-6).map((_, i) => (
          <View key={i} className='event-dot done' />
        ))}
        {state.currentEvent && <View className='event-dot current' />}
      </View>
    </View>
  )
}
