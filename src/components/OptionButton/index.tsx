import { View, Text } from '@tarojs/components'
import type { EventOption } from '../../types/game'
import './index.scss'

interface Props {
  option: EventOption
  index: number
  onSelect: (idx: number) => void
  disabled?: boolean
  selected?: boolean
}

const OPTION_LABELS = ['A', 'B', 'C', 'D']

export default function OptionButton({ option, index, onSelect, disabled, selected }: Props) {
  return (
    <View
      className={`option-btn ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={() => !disabled && onSelect(index)}
    >
      <View className='option-label-wrap'>
        <Text className='option-label'>{OPTION_LABELS[index]}</Text>
      </View>
      <Text className='option-text'>{option.text}</Text>
    </View>
  )
}
