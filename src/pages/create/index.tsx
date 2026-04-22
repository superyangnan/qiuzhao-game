import { View, Text, ScrollView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import type { EduLevel, Major, JobTarget, City, Background } from '../../types/game'
import {
  EDU_OPTIONS, MAJOR_OPTIONS, JOB_TARGET_OPTIONS,
  CITY_OPTIONS, BACKGROUND_OPTIONS, SCHOOL_TIER_MAP,
} from '../../data/characterOptions'
import { useGameStore } from '../../store/gameStore'
import './index.scss'

type Step = 1 | 2 | 3 | 4 | 5

export default function CreatePage() {
  const startGame = useGameStore(s => s.startGame)

  const [step, setStep] = useState<Step>(1)
  const [edu, setEdu] = useState<EduLevel | null>(null)
  const [major, setMajor] = useState<Major | null>(null)
  const [jobTarget, setJobTarget] = useState<JobTarget | null>(null)
  const [city, setCity] = useState<City | null>(null)
  const [backgrounds, setBackgrounds] = useState<Background[]>([])

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '创建你的角色' })
  })

  function toggleBackground(bg: Background) {
    setBackgrounds(prev =>
      prev.includes(bg) ? prev.filter(b => b !== bg) : [...prev, bg]
    )
  }

  function canNext(): boolean {
    switch (step) {
      case 1: return edu !== null
      case 2: return major !== null
      case 3: return jobTarget !== null
      case 4: return city !== null
      case 5: return true
      default: return false
    }
  }

  function handleNext() {
    if (!canNext()) return
    if (step < 5) {
      setStep((step + 1) as Step)
    } else {
      handleStart()
    }
  }

  function handleStart() {
    if (!edu || !major || !jobTarget || !city) return
    startGame({
      edu,
      schoolTier: SCHOOL_TIER_MAP[edu],
      major,
      jobTarget,
      city,
      backgrounds,
    })
    Taro.redirectTo({ url: '/pages/game/index' })
  }

  const STEP_TITLES: Record<Step, string> = {
    1: '你的学历是？',
    2: '你的专业方向？',
    3: '求职目标是？',
    4: '想去哪个城市？',
    5: '你的特殊经历？',
  }

  return (
    <View className='create-page'>
      <View className='bg-layer' />

      {/* 进度条 */}
      <View className='progress-bar'>
        {[1, 2, 3, 4, 5].map(s => (
          <View key={s} className={`progress-dot ${s <= step ? 'active' : ''}`} />
        ))}
      </View>

      <ScrollView scrollY className='scroll-area'>
        <View className='create-content'>
          <Text className='step-num'>Step {step} / 5</Text>
          <Text className='step-title'>{STEP_TITLES[step]}</Text>

          {/* Step 1: 学历 */}
          {step === 1 && (
            <View className='options-list'>
              {EDU_OPTIONS.map(opt => (
                <View
                  key={opt.value}
                  className={`option-card ${edu === opt.value ? 'selected' : ''}`}
                  onClick={() => setEdu(opt.value)}
                >
                  <Text className='opt-icon'>{opt.icon}</Text>
                  <View className='opt-text'>
                    <Text className='opt-label'>{opt.label}</Text>
                    {opt.desc && <Text className='opt-desc'>{opt.desc}</Text>}
                  </View>
                  <View className={`opt-check ${edu === opt.value ? 'visible' : ''}`}>
                    <Text>✓</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Step 2: 专业 */}
          {step === 2 && (
            <View className='options-grid'>
              {MAJOR_OPTIONS.map(opt => (
                <View
                  key={opt.value}
                  className={`option-grid-item ${major === opt.value ? 'selected' : ''}`}
                  onClick={() => setMajor(opt.value)}
                >
                  <Text className='opt-icon-sm'>{opt.icon}</Text>
                  <Text className='opt-label-sm'>{opt.label}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Step 3: 求职目标 */}
          {step === 3 && (
            <View className='options-list'>
              {JOB_TARGET_OPTIONS.map(opt => (
                <View
                  key={opt.value}
                  className={`option-card ${jobTarget === opt.value ? 'selected' : ''}`}
                  onClick={() => setJobTarget(opt.value)}
                >
                  <Text className='opt-icon'>{opt.icon}</Text>
                  <View className='opt-text'>
                    <Text className='opt-label'>{opt.label}</Text>
                    {opt.desc && <Text className='opt-desc'>{opt.desc}</Text>}
                  </View>
                  <View className={`opt-check ${jobTarget === opt.value ? 'visible' : ''}`}>
                    <Text>✓</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Step 4: 城市 */}
          {step === 4 && (
            <View className='options-list'>
              {CITY_OPTIONS.map(opt => (
                <View
                  key={opt.value}
                  className={`option-card ${city === opt.value ? 'selected' : ''}`}
                  onClick={() => setCity(opt.value)}
                >
                  <View className='opt-text'>
                    <Text className='opt-label'>{opt.label}</Text>
                    {opt.desc && <Text className='opt-desc'>{opt.desc}</Text>}
                  </View>
                  <View className={`opt-check ${city === opt.value ? 'visible' : ''}`}>
                    <Text>✓</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Step 5: 背景（多选） */}
          {step === 5 && (
            <View>
              <Text className='step-hint'>可多选，不选也没关系</Text>
              <View className='options-list'>
                {BACKGROUND_OPTIONS.map(opt => (
                  <View
                    key={opt.value}
                    className={`option-card ${backgrounds.includes(opt.value) ? 'selected' : ''}`}
                    onClick={() => toggleBackground(opt.value)}
                  >
                    <Text className='opt-icon'>{opt.icon}</Text>
                    <Text className='opt-label'>{opt.label}</Text>
                    <View className={`opt-check ${backgrounds.includes(opt.value) ? 'visible' : ''}`}>
                      <Text>✓</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 底部按钮 */}
      <View className='bottom-bar'>
        {step > 1 && (
          <View className='btn-back' onClick={() => setStep((step - 1) as Step)}>
            <Text className='btn-back-text'>← 上一步</Text>
          </View>
        )}
        <View
          className={`btn-next ${canNext() ? 'enabled' : 'disabled'}`}
          onClick={handleNext}
        >
          <Text className='btn-next-text'>
            {step === 5 ? '🚀 开始秋招！' : '下一步 →'}
          </Text>
        </View>
      </View>
    </View>
  )
}
