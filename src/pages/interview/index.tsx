import { View, Text, Input, ScrollView } from '@tarojs/components'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { useState, useRef, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import { generateInterviewQuestion } from '../../services/arkService'
import type { InterviewerType } from '../../types/game'
import './index.scss'

const INTERVIEWER_NAMES: Record<InterviewerType, string> = {
  strict:   '严厉的HR',
  friendly: '友善的主管',
  pressure: '压力面试官',
  lazy:     '划水面试官',
}

const INTERVIEWER_AVATARS: Record<InterviewerType, string> = {
  strict:   '😐',
  friendly: '😊',
  pressure: '😤',
  lazy:     '😴',
}

// 预设开场白
const OPENING_QUESTIONS: Record<InterviewerType, string> = {
  strict:   '好，先做一下自我介绍吧。尽量简洁，重点突出。',
  friendly: '欢迎来到我们公司！先聊聊你自己吧，随便说说。',
  pressure: '你的简历我看了，坦白说有几个地方让我有些疑问……不过先自我介绍。',
  lazy:     '嗯，来了，先介绍一下自己吧。',
}

export default function InterviewPage() {
  const router = useRouter()
  const { engine, makeChoice } = useGameStore()
  const state = engine?.state

  const companyId = router.params.companyId as string
  const interviewerType = (router.params.type ?? 'friendly') as InterviewerType

  const [messages, setMessages] = useState<Array<{ role: 'interviewer' | 'player'; content: string }>>([
    { role: 'interviewer', content: OPENING_QUESTIONS[interviewerType] },
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [turnCount, setTurnCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [result, setResult] = useState<'pass' | 'fail' | null>(null)
  const scrollRef = useRef<any>(null)

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '面试中' })
  })

  useEffect(() => {
    // 自动滚动到底部
    setTimeout(() => {
      scrollRef.current?.scrollToLower()
    }, 100)
  }, [messages])

  async function handleSend() {
    if (!inputText.trim() || isLoading || !state) return

    const playerMsg = inputText.trim()
    setInputText('')

    const newMessages = [...messages, { role: 'player' as const, content: playerMsg }]
    setMessages(newMessages)

    const newTurn = turnCount + 1
    setTurnCount(newTurn)

    // 3-5轮后结束面试
    if (newTurn >= 4 + Math.floor(Math.random() * 2)) {
      setTimeout(() => endInterview(newMessages), 800)
      return
    }

    setIsLoading(true)

    const history = newMessages
      .map(m => `${m.role === 'interviewer' ? '面试官' : '玩家'}：${m.content}`)
      .join('\n')

    try {
      const response = await generateInterviewQuestion(state, {
        companyName: companyId,
        position: '目标岗位',
        round: 1,
        interviewerType,
        playerAnswer: playerMsg,
        conversationHistory: history,
      })

      setMessages(prev => [...prev, {
        role: 'interviewer',
        content: response.interviewer_say,
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'interviewer',
        content: '嗯，好的……那你还有什么要问我的吗？',
      }])
    } finally {
      setIsLoading(false)
    }
  }

  function endInterview(finalMessages: typeof messages) {
    // 根据面试对话质量判断结果（简化逻辑：随机+面试官类型加权）
    const basePass = interviewerType === 'lazy' ? 0.65
      : interviewerType === 'friendly' ? 0.55
      : interviewerType === 'strict' ? 0.4
      : 0.35

    const passed = Math.random() < basePass
    setResult(passed ? 'pass' : 'fail')
    setIsComplete(true)

    setMessages(prev => [...prev, {
      role: 'interviewer',
      content: passed
        ? '好的，今天的面试就到这里，我们会在一周内通知你结果。你的表现让我们印象深刻。'
        : '感谢你今天来参加面试，我们会综合所有候选人的情况做决定，后续HR会联系你。',
    }])
  }

  function handleFinish() {
    Taro.navigateBack()
    // 将面试结果同步给游戏引擎
    if (result === 'pass') {
      makeChoice(0) // 面试通过选项
    } else {
      makeChoice(1) // 面试失败选项
    }
  }

  return (
    <View className='interview-page'>
      <View className='bg-layer' />

      {/* 面试官信息栏 */}
      <View className='interviewer-bar'>
        <Text className='interviewer-avatar'>{INTERVIEWER_AVATARS[interviewerType]}</Text>
        <View className='interviewer-info'>
          <Text className='interviewer-name'>{INTERVIEWER_NAMES[interviewerType]}</Text>
          <Text className='interviewer-company'>{companyId} · 第1轮面试</Text>
        </View>
        <View className='turn-counter'>
          <Text className='turn-text'>{turnCount}/4+ 轮</Text>
        </View>
      </View>

      {/* 对话区 */}
      <ScrollView scrollY className='chat-area' ref={scrollRef} scrollIntoView='bottom-anchor'>
        <View className='chat-content'>
          {messages.map((msg, idx) => (
            <View key={idx} className={`chat-bubble-wrap ${msg.role}`}>
              {msg.role === 'interviewer' && (
                <Text className='bubble-avatar'>{INTERVIEWER_AVATARS[interviewerType]}</Text>
              )}
              <View className={`chat-bubble ${msg.role}`}>
                <Text className='bubble-text'>{msg.content}</Text>
              </View>
            </View>
          ))}

          {isLoading && (
            <View className='chat-bubble-wrap interviewer'>
              <Text className='bubble-avatar'>{INTERVIEWER_AVATARS[interviewerType]}</Text>
              <View className='chat-bubble interviewer loading'>
                <Text className='loading-dots'>…</Text>
              </View>
            </View>
          )}

          {isComplete && (
            <View className='result-banner'>
              <Text className={`result-text ${result}`}>
                {result === 'pass' ? '🎉 面试通过！' : '😔 面试未通过'}
              </Text>
              <View className='btn-finish' onClick={handleFinish}>
                <Text className='btn-finish-text'>返回游戏</Text>
              </View>
            </View>
          )}

          <View id='bottom-anchor' />
        </View>
      </ScrollView>

      {/* 输入区 */}
      {!isComplete && (
        <View className='input-area'>
          <Input
            className='chat-input'
            value={inputText}
            onInput={e => setInputText(e.detail.value)}
            placeholder='输入你的回答…'
            placeholderClass='input-placeholder'
            onConfirm={handleSend}
            disabled={isLoading}
          />
          <View
            className={`send-btn ${inputText.trim() && !isLoading ? 'enabled' : 'disabled'}`}
            onClick={handleSend}
          >
            <Text className='send-text'>发送</Text>
          </View>
        </View>
      )}
    </View>
  )
}
