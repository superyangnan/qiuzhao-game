import { View, Text } from '@tarojs/components'
import type { Attributes, AttributeKey } from '../../types/game'
import {
  getAttributeLabel,
  getAttributeIcon,
  getAttributeColor,
  getAttributeDesc,
} from '../../engine/attributeSystem'
import './index.scss'

interface Props {
  attributes: Attributes
  showDelta?: Partial<Record<AttributeKey, number>>
}

const ATTR_KEYS: AttributeKey[] = ['confidence', 'stress', 'anxiety', 'morale', 'money']

export default function AttributeBar({ attributes, showDelta }: Props) {
  return (
    <View className='attr-panel'>
      {ATTR_KEYS.map(key => {
        const value = attributes[key]
        const delta = showDelta?.[key]
        const color = getAttributeColor(key, value)

        return (
          <View key={key} className='attr-row'>
            <View className='attr-label'>
              <Text className='attr-icon'>{getAttributeIcon(key)}</Text>
              <Text className='attr-name'>{getAttributeLabel(key)}</Text>
            </View>
            <View className='attr-bar-wrap'>
              <View className='attr-bar-bg'>
                <View
                  className='attr-bar-fill'
                  style={{ width: `${value}%`, backgroundColor: color }}
                />
              </View>
              <Text className='attr-value'>{value}</Text>
              {delta !== undefined && delta !== 0 && (
                <Text
                  className={`attr-delta ${delta > 0 ? 'positive' : 'negative'}`}
                >
                  {delta > 0 ? `+${delta}` : `${delta}`}
                </Text>
              )}
            </View>
            <Text className='attr-desc'>{getAttributeDesc(key, value)}</Text>
          </View>
        )
      })}
    </View>
  )
}
