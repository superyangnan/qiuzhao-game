import { View, Text } from '@tarojs/components'
import type { GameEvent } from '../../types/game'
import './index.scss'

interface Props {
  event: GameEvent
  isTyping?: boolean
  typedLength?: number
}

const CATEGORY_BADGE: Record<string, { label: string; color: string }> = {
  light:     { label: '✨ 小插曲', color: '#f39c12' },
  stress:    { label: '😤 压力来袭', color: '#e74c3c' },
  social:    { label: '💬 社交现场', color: '#9b59b6' },
  turning:   { label: '🔄 转折时刻', color: '#3498db' },
  interview: { label: '💼 面试现场', color: '#1abc9c' },
}

export default function EventCard({ event, isTyping = false, typedLength }: Props) {
  const badge = CATEGORY_BADGE[event.category] ?? CATEGORY_BADGE.light
  const displayDesc = typedLength !== undefined
    ? event.desc.slice(0, typedLength)
    : event.desc

  return (
    <View className='event-card'>
      <View className='event-badge' style={{ backgroundColor: badge.color + '22', borderColor: badge.color + '66' }}>
        <Text className='event-badge-text' style={{ color: badge.color }}>{badge.label}</Text>
      </View>

      <Text className='event-title'>{event.title}</Text>

      <View className='event-desc-wrap'>
        <Text className='event-desc'>{displayDesc}</Text>
        {isTyping && <Text className='cursor'>|</Text>}
      </View>
    </View>
  )
}
