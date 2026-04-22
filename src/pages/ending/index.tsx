import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { useGameStore } from '../../store/gameStore'
import { ENDINGS } from '../../data/endings'
import { generateEndingStory } from '../../services/arkService'
import { fillEndingTemplate } from '../../engine/endingSystem'
import './index.scss'

const CARD_GRADIENTS: Record<string, string> = {
  warm:     'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  cool:     'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  neutral:  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  dramatic: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
}

export default function EndingPage() {
  const { engine, resetGame } = useGameStore()
  const state = engine?.state

  const [story, setStory] = useState<string>('')
  const [goldQuote, setGoldQuote] = useState<string>('')
  const [isGenerating, setIsGenerating] = useState(true)
  const [typedStory, setTypedStory] = useState('')

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '你的结局' })
  })

  useEffect(() => {
    if (!state?.ending || !engine) return
    generateStory()
  }, [])

  // 打字机效果
  useEffect(() => {
    if (!story || isGenerating) return

    let idx = 0
    const timer = setInterval(() => {
      idx += 3
      if (idx >= story.length) {
        idx = story.length
        clearInterval(timer)
      }
      setTypedStory(story.slice(0, idx))
    }, 25)

    return () => clearInterval(timer)
  }, [story, isGenerating])

  async function generateStory() {
    if (!state?.ending || !engine) return
    setIsGenerating(true)

    const ending = ENDINGS.find(e => e.id === state.ending)
    if (!ending) return

    const keyEvents = state.eventHistory
      .slice(-5)
      .map(h => h.event.title)

    const peakStressEvent = state.eventHistory
      .reduce((max, h) => {
        const s = h.event.options[h.choiceIdx]?.effect?.stress ?? 0
        return s > max.stress ? { name: h.event.title, stress: s } : max
      }, { name: '备考阶段', stress: 0 }).name

    const hasOffer = state.applications.some(a => a.status === 'offer')
    const bestOffer = state.applications
      .filter(a => a.status === 'offer')
      .sort((a, b) => (b.offerSalary ?? 0) - (a.offerSalary ?? 0))[0]

    try {
      const response = await generateEndingStory(state, {
        endingTitle: ending.title,
        endingSubtitle: ending.subtitle,
        templateStory: ending.templateStory,
        keyEvents,
        peakStressEvent,
        finalResult: hasOffer
          ? `拿到了offer（${bestOffer?.companyId ?? '某公司'}）`
          : '未拿到满意offer',
      })
      setStory(response.story)
      setGoldQuote(response.gold_quote)
    } catch {
      // 兜底：使用模板
      setStory(fillEndingTemplate(state.ending, state))
      setGoldQuote(ending.goldQuote)
    } finally {
      setIsGenerating(false)
    }
  }

  function handleShare() {
    Taro.showShareMenu({ withShareTicket: false })
    Taro.shareAppMessage({
      title: `我的秋招结局：${ending?.title} | 人生简历`,
      desc: ending?.subtitle ?? '',
      path: '/pages/index/index',
    })
  }

  function handleRestart() {
    resetGame()
    Taro.reLaunch({ url: '/pages/index/index' })
  }

  if (!state?.ending) return null

  const ending = ENDINGS.find(e => e.id === state.ending)
  if (!ending) return null

  const gradient = CARD_GRADIENTS[ending.cardStyle]
  const { attributes } = state

  return (
    <View className='ending-page'>
      <View className='bg-layer' />

      <ScrollView scrollY className='ending-scroll'>
        <View className='ending-content'>
          {/* 结局标题卡片 */}
          <View className='ending-card' style={{ background: gradient }}>
            <View className='ending-card-inner'>
              <Text className='ending-rarity'>
                {ending.rarity === 'secret' ? '🔮 隐藏结局' :
                 ending.rarity === 'rare' ? '⭐ 稀有结局' : '结局'}
              </Text>
              <Text className='ending-title'>{ending.title}</Text>
              <Text className='ending-subtitle'>{ending.subtitle}</Text>

              {/* 最终属性 */}
              <View className='ending-attrs'>
                {[
                  { key: '信心', val: attributes.confidence },
                  { key: '压力', val: attributes.stress },
                  { key: '焦虑', val: attributes.anxiety },
                  { key: '心气', val: attributes.morale },
                ].map(({ key, val }) => (
                  <View key={key} className='ending-attr-item'>
                    <Text className='ending-attr-val'>{val}</Text>
                    <Text className='ending-attr-key'>{key}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* 治愈文案区 */}
          <View className='story-section'>
            {isGenerating ? (
              <View className='generating'>
                <Text className='generating-icon'>✨</Text>
                <Text className='generating-text'>AI正在为你写下专属故事…</Text>
              </View>
            ) : (
              <>
                <Text className='story-text'>{typedStory}</Text>
                {goldQuote && typedStory.length >= story.length && (
                  <View className='gold-quote-wrap'>
                    <Text className='gold-quote-line' />
                    <Text className='gold-quote'>{goldQuote}</Text>
                    <Text className='gold-quote-line' />
                  </View>
                )}
              </>
            )}
          </View>

          {/* 经历回顾 */}
          {!isGenerating && (
            <View className='replay-section'>
              <Text className='replay-title'>你经历过的那些时刻</Text>
              {state.eventHistory.slice(0, 6).map((h, i) => (
                <View key={i} className='replay-item'>
                  <Text className='replay-event-name'>{h.event.title}</Text>
                  <Text className='replay-choice'>→ {h.event.options[h.choiceIdx]?.text}</Text>
                </View>
              ))}
            </View>
          )}

          {/* 操作区 */}
          {!isGenerating && (
            <View className='action-section'>
              <View className='btn-share' onClick={handleShare}>
                <Text className='btn-share-text'>📤 分享我的结局</Text>
              </View>
              <View className='btn-restart' onClick={handleRestart}>
                <Text className='btn-restart-text'>↺ 换个身份再来一局</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}
