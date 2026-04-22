import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState } from 'react'
import './index.scss'

export default function IndexPage() {
  const [entering, setEntering] = useState(false)

  useLoad(() => {
    Taro.setNavigationBarTitle({ title: '人生简历' })
  })

  function handleStart() {
    setEntering(true)
    setTimeout(() => {
      Taro.navigateTo({ url: '/pages/create/index' })
    }, 300)
  }

  return (
    <View className='index-page'>
      {/* 背景渐变层 */}
      <View className='bg-layer' />
      <View className='bg-grid' />

      <View className={`content ${entering ? 'fade-out' : 'fade-in'}`}>
        {/* 标题区域 */}
        <View className='hero'>
          <View className='hero-tag'>
            <Text className='hero-tag-text'>🎓 2024届 秋招模拟器</Text>
          </View>
          <Text className='hero-title'>人生简历</Text>
          <Text className='hero-subtitle'>你的秋招，你来经历</Text>
          <Text className='hero-desc'>
            基于你的真实身份，
            {'\n'}AI全程参与，生成你的专属秋招故事
          </Text>
        </View>

        {/* 特性列表 */}
        <View className='features'>
          <View className='feature-item'>
            <Text className='feature-icon'>🎲</Text>
            <View className='feature-text'>
              <Text className='feature-title'>个性化体验</Text>
              <Text className='feature-desc'>根据学历·专业·背景生成专属剧情</Text>
            </View>
          </View>
          <View className='feature-item'>
            <Text className='feature-icon'>🤖</Text>
            <View className='feature-text'>
              <Text className='feature-title'>AI实时驱动</Text>
              <Text className='feature-desc'>方舟大模型生成随机事件与面试对话</Text>
            </View>
          </View>
          <View className='feature-item'>
            <Text className='feature-icon'>💫</Text>
            <View className='feature-text'>
              <Text className='feature-title'>16种专属结局</Text>
              <Text className='feature-desc'>治愈文案·分享卡片·记录你的秋招</Text>
            </View>
          </View>
        </View>

        {/* 开始按钮 */}
        <View className='action-area'>
          <View className='btn-start' onClick={handleStart}>
            <Text className='btn-start-text'>开始我的秋招</Text>
            <Text className='btn-start-sub'>约10分钟完成一局</Text>
          </View>
          <Text className='disclaimer'>
            * 游戏中所有公司名称仅用于模拟，不代表真实招聘情况
          </Text>
        </View>
      </View>
    </View>
  )
}
