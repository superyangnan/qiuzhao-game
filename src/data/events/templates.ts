// 方舟大模型随机事件生成模板
// 每个模板定义了事件的背景框架，AI负责填充具体内容

export interface EventTemplate {
  id: string
  category: 'light' | 'stress' | 'social' | 'turning'
  promptHint: string            // 给方舟的生成提示
  effectRange: {                // 属性变化幅度范围
    positive?: string[]         // 可能的正向属性
    negative?: string[]         // 可能的负向属性
  }
  optionCount: number
  weight: number
  minChapter?: number
  maxChapter?: number
}

export const EVENT_TEMPLATES: EventTemplate[] = [
  // ─── 轻松类 ──────────────────
  {
    id: 'R-LIGHT-001',
    category: 'light',
    promptHint: '求职群里发生了一件有点好笑/温暖的事情，让玩家短暂放松了一下',
    effectRange: {
      positive: ['morale', 'confidence'],
      negative: ['anxiety'],
    },
    optionCount: 2,
    weight: 2,
    minChapter: 1,
  },
  {
    id: 'R-LIGHT-002',
    category: 'light',
    promptHint: '面试官问了一个奇葩/出乎意料的问题，玩家需要临场应对',
    effectRange: {
      positive: ['confidence', 'morale'],
      negative: ['stress'],
    },
    optionCount: 3,
    weight: 2,
    minChapter: 3,
  },
  {
    id: 'R-LIGHT-003',
    category: 'light',
    promptHint: '师兄师姐或朋友传授了一个实用的求职小技巧或内部消息',
    effectRange: {
      positive: ['confidence', 'morale'],
    },
    optionCount: 2,
    weight: 2,
    minChapter: 1,
  },
  {
    id: 'R-LIGHT-004',
    category: 'social',
    promptHint: '家人/室友做了一件暖心的事，让玩家感到被支持',
    effectRange: {
      positive: ['morale', 'confidence'],
      negative: ['stress', 'anxiety'],
    },
    optionCount: 2,
    weight: 2,
  },

  // ─── 压力类 ──────────────────
  {
    id: 'R-STRESS-001',
    category: 'stress',
    promptHint: '网上传出某大厂今年大幅缩招或暴雷的消息，但真实性不明',
    effectRange: {
      negative: ['confidence', 'morale', 'anxiety'],
    },
    optionCount: 3,
    weight: 3,
    minChapter: 2,
  },
  {
    id: 'R-STRESS-002',
    category: 'stress',
    promptHint: '笔试题完全超出认知范围，玩家不知道该怎么做',
    effectRange: {
      negative: ['confidence', 'stress'],
      positive: ['morale'],
    },
    optionCount: 3,
    weight: 3,
    minChapter: 2,
  },
  {
    id: 'R-STRESS-003',
    category: 'stress',
    promptHint: '同时收到两个公司的面试邀请，时间完全冲突，必须放弃一个',
    effectRange: {
      negative: ['stress', 'anxiety'],
      positive: ['confidence'],
    },
    optionCount: 2,
    weight: 2,
    minChapter: 3,
  },
  {
    id: 'R-STRESS-004',
    category: 'stress',
    promptHint: '投了很多简历但通过率极低，玩家开始怀疑自己的简历或方向',
    effectRange: {
      negative: ['confidence', 'morale', 'stress'],
    },
    optionCount: 3,
    weight: 3,
    minChapter: 2,
  },
  {
    id: 'R-STRESS-005',
    category: 'stress',
    promptHint: '某公司流程拖了很久没有消息，玩家不知道是被淘汰还是还在走流程',
    effectRange: {
      negative: ['anxiety', 'stress'],
    },
    optionCount: 3,
    weight: 3,
    minChapter: 3,
  },

  // ─── 社交类 ──────────────────
  {
    id: 'R-SOCIAL-001',
    category: 'social',
    promptHint: '家长再次催问求职进展，这次态度比之前更急切，玩家要选择怎么应对',
    effectRange: {
      negative: ['stress', 'anxiety'],
      positive: ['morale'],
    },
    optionCount: 3,
    weight: 3,
    minChapter: 2,
  },
  {
    id: 'R-SOCIAL-002',
    category: 'social',
    promptHint: '室友或同学拿到了一个很好的offer，玩家内心有复杂的感受',
    effectRange: {
      negative: ['confidence', 'morale', 'anxiety'],
      positive: ['morale'],
    },
    optionCount: 3,
    weight: 3,
    minChapter: 3,
  },
  {
    id: 'R-SOCIAL-003',
    category: 'social',
    promptHint: '恋人/伴侣的offer在另一个城市，两人面临异地的现实问题',
    effectRange: {
      negative: ['stress', 'anxiety', 'morale'],
      positive: ['morale', 'confidence'],
    },
    optionCount: 3,
    weight: 2,
    minChapter: 3,
  },
  {
    id: 'R-SOCIAL-004',
    category: 'social',
    promptHint: '导师提出帮写推荐信，但附加了某种条件（如留校/参与项目）',
    effectRange: {
      positive: ['confidence'],
      negative: ['stress', 'morale'],
    },
    optionCount: 3,
    weight: 2,
  },

  // ─── 转折类 ──────────────────
  {
    id: 'R-TURN-001',
    category: 'turning',
    promptHint: '一个意外的内推机会出现了，来自一个意想不到的人',
    effectRange: {
      positive: ['confidence', 'morale'],
    },
    optionCount: 2,
    weight: 2,
    minChapter: 2,
  },
  {
    id: 'R-TURN-002',
    category: 'turning',
    promptHint: '原本以为无缘的心仪公司突然开放了新HC，再次出现机会',
    effectRange: {
      positive: ['confidence', 'morale'],
      negative: ['stress'],
    },
    optionCount: 2,
    weight: 1,
    minChapter: 3,
  },
  {
    id: 'R-TURN-003',
    category: 'turning',
    promptHint: '已经放弃的公司突然发来面试邀请，让玩家重新燃起希望',
    effectRange: {
      positive: ['confidence', 'morale'],
      negative: ['anxiety'],
    },
    optionCount: 2,
    weight: 2,
    minChapter: 4,
  },
  {
    id: 'R-TURN-004',
    category: 'turning',
    promptHint: '一直没什么期待的公司给出了意外好的offer，玩家需要重新评估',
    effectRange: {
      positive: ['confidence', 'morale'],
      negative: ['stress', 'anxiety'],
    },
    optionCount: 2,
    weight: 2,
    minChapter: 4,
  },
]
