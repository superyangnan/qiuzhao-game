import type { GameEvent } from '../../types/game'

export const CONDITIONAL_EVENTS: GameEvent[] = [
  // ══════════════════════════════
  // 计算机专业专属
  // ══════════════════════════════
  {
    id: 'C-CS-001',
    type: 'conditional',
    category: 'stress',
    title: '力扣日记',
    desc: '你已经连续刷了三十天力扣。\n\n今天面试的算法题是一道"字节高频题"，你明明见过，就是脑子一片空白。\n\n事后你查了题解，发现就是上周刷过的原题。你盯着题解看了很久，没说话。',
    options: [
      {
        id: 'C-CS-001-A',
        text: '死磕，再刷一遍',
        effect: { stress: 15, confidence: 5, morale: 3 },
      },
      {
        id: 'C-CS-001-B',
        text: '换个方法，去找专项练习',
        effect: { stress: 5, confidence: 8 },
      },
      {
        id: 'C-CS-001-C',
        text: '找内推跳过笔试',
        effect: { confidence: 10, morale: 8 },
        unlockFlag: 'used_referral',
      },
    ],
    triggerCondition: {
      majors: ['cs'],
      minChapter: 2,
    },
    weight: 3,
  },
  {
    id: 'C-CS-002',
    type: 'conditional',
    category: 'stress',
    title: '算法岗的神话',
    desc: '你看到了某顶级大厂算法岗的JD：\n\n"要求：ACM金牌/IOI金牌，或顶会论文一作，或竞争对手同级别工作经验。"\n\n你看了看自己的简历，在空白处停留了三秒。',
    options: [
      {
        id: 'C-CS-002-A',
        text: '管他呢，直接投',
        effect: { confidence: 5, morale: 8 },
        unlockFlag: 'applied_reach',
      },
      {
        id: 'C-CS-002-B',
        text: '老实投开发岗，更稳',
        effect: { stress: -5, anxiety: -5 },
      },
      {
        id: 'C-CS-002-C',
        text: '彻底放弃大厂，换目标',
        effect: { morale: -10, confidence: -5, anxiety: -10 },
      },
    ],
    triggerCondition: {
      majors: ['cs'],
      eduLevels: ['master', 'phd'],
      minChapter: 2,
    },
    weight: 2,
  },
  {
    id: 'C-CS-003',
    type: 'conditional',
    category: 'social',
    title: '35岁程序员魔咒',
    desc: '你在微博热搜上看到一篇文章：《被优化的第180天：一个35岁程序员的自述》。\n\n文章写得很真实，没有煽情，就是平静地讲了他的经历。\n\n你刷完了全文，然后看了看招聘软件上那些"35岁以下"的岗位要求。',
    options: [
      {
        id: 'C-CS-003-A',
        text: '关掉，别影响心情',
        effect: { anxiety: 5 },
      },
      {
        id: 'C-CS-003-B',
        text: '认真想了想职业规划',
        effect: { stress: 10, confidence: 5, morale: 3 },
        unlockFlag: 'thought_career',
      },
      {
        id: 'C-CS-003-C',
        text: '转发到朋友圈配了句"共勉"',
        effect: { anxiety: 3, morale: 3 },
      },
    ],
    triggerCondition: {
      majors: ['cs'],
      jobTargets: ['big_tech'],
      minChapter: 2,
    },
    weight: 2,
  },

  // ══════════════════════════════
  // 金融专业专属
  // ══════════════════════════════
  {
    id: 'C-FIN-001',
    type: 'conditional',
    category: 'social',
    title: '鄙视链现场',
    desc: '群面现场，复旦金融的同学在自我介绍时说："我目前只考虑高盛和摩根，其他的都是备选。"\n\n他说这句话时神情自然，不带一点炫耀，好像这只是在说今天天气不错。\n\n你抬头看了他一眼，然后低下头整理了一下自己的发言提纲。',
    options: [
      {
        id: 'C-FIN-001-A',
        text: '不在乎，专注自己的表现',
        effect: { confidence: 3, morale: 5 },
      },
      {
        id: 'C-FIN-001-B',
        text: '有点动摇，感觉自己不够格',
        effect: { confidence: -15, anxiety: 12 },
      },
      {
        id: 'C-FIN-001-C',
        text: '他也没有offer，谁知道最后怎样',
        effect: { morale: 8, confidence: 5 },
      },
    ],
    triggerCondition: {
      majors: ['finance'],
      minChapter: 3,
    },
    weight: 2,
  },
  {
    id: 'C-FIN-002',
    type: 'conditional',
    category: 'stress',
    title: '实习经历缺失',
    desc: '面试官看了你的简历，停在"实习经历"那一栏。\n\n"你……没有金融相关的实习？"\n\n沉默了三秒，感觉比三分钟还长。\n\n"是的，因为学校课业比较重……"',
    options: [
      {
        id: 'C-FIN-002-A',
        text: '用学术成绩和其他经历弥补',
        effect: { confidence: 5, stress: 10 },
      },
      {
        id: 'C-FIN-002-B',
        text: '承认不足，表达学习意愿',
        effect: { confidence: 3, anxiety: 8 },
      },
      {
        id: 'C-FIN-002-C',
        text: '这家不合适，转向其他方向',
        effect: { morale: -5, confidence: -5, anxiety: -5 },
        unlockFlag: 'finance_pivot',
      },
    ],
    triggerCondition: {
      majors: ['finance', 'accounting'],
      minChapter: 3,
    },
    weight: 2,
    isOneShot: true,
  },

  // ══════════════════════════════
  // 医学专业专属
  // ══════════════════════════════
  {
    id: 'C-MED-001',
    type: 'conditional',
    category: 'social',
    title: '规培困境',
    desc: '你在医院实习，规培工资1500块/月。\n\n高中同班同学在互联网公司发了张图，说今天加班但是"痛并快乐着"，配了一张餐厅的炸鸡腿。\n\n你看着手里的工作餐，点了个赞，然后把手机放进口袋。',
    options: [
      {
        id: 'C-MED-001-A',
        text: '医生是有意义的职业，我不后悔',
        effect: { morale: 10, confidence: 8, anxiety: 5 },
      },
      {
        id: 'C-MED-001-B',
        text: '有点动摇，考虑转行',
        effect: { confidence: -10, anxiety: 20, morale: -10 },
        unlockFlag: 'med_considering_pivot',
      },
      {
        id: 'C-MED-001-C',
        text: '熬过规培就好了，以后不一样',
        effect: { morale: 5, stress: 10 },
      },
    ],
    triggerCondition: {
      majors: ['medicine'],
    },
    weight: 3,
    isOneShot: true,
  },

  // ══════════════════════════════
  // 土木/建筑专属
  // ══════════════════════════════
  {
    id: 'C-CIVIL-001',
    type: 'conditional',
    category: 'stress',
    title: '行业寒冬',
    desc: '你打开招聘软件，发现今年建筑类岗位的数量比去年少了一半。\n\n某大型设计院的招聘负责人说，由于市场环境，今年HC有所缩减……\n\n你的同学里，有三个已经转行准备考公了。',
    options: [
      {
        id: 'C-CIVIL-001-A',
        text: '坚守本专业，总有地方要人',
        effect: { confidence: 5, stress: 15, anxiety: 10 },
      },
      {
        id: 'C-CIVIL-001-B',
        text: '考虑转型——项目管理/房地产咨询',
        effect: { anxiety: 8, morale: 3 },
        unlockFlag: 'civil_pivot',
      },
      {
        id: 'C-CIVIL-001-C',
        text: '准备考公/事业单位，求稳',
        effect: { morale: -5, anxiety: -5 },
        unlockFlag: 'civil_exam',
      },
    ],
    triggerCondition: {
      majors: ['civil'],
      minChapter: 2,
    },
    weight: 3,
    isOneShot: true,
  },

  // ══════════════════════════════
  // 学历相关
  // ══════════════════════════════
  {
    id: 'C-EDU-001',
    type: 'conditional',
    category: 'stress',
    title: '学历歧视现场',
    desc: '你打开心仪公司的JD，看到最后一行：\n\n"学历要求：211/985院校本科及以上。"\n\n你把页面滑回顶部，看了看公司logo，再看了看自己的简历。',
    options: [
      {
        id: 'C-EDU-001-A',
        text: '还是投，简历不一定被卡',
        effect: { confidence: 3, anxiety: 10 },
      },
      {
        id: 'C-EDU-001-B',
        text: '找有内推的人走后门',
        effect: { morale: 5, confidence: 8 },
        unlockFlag: 'used_referral',
      },
      {
        id: 'C-EDU-001-C',
        text: '换目标，这家不适合我',
        effect: { morale: -5, anxiety: -5 },
      },
      {
        id: 'C-EDU-001-D',
        text: '好，让我记住这个名字，以后再说',
        effect: { morale: 10, confidence: 5 },
      },
    ],
    triggerCondition: {
      schoolTiers: ['C', 'D'],
      minChapter: 2,
    },
    weight: 3,
  },
  {
    id: 'C-EDU-002',
    type: 'conditional',
    category: 'stress',
    title: '顶校光环的重量',
    desc: '面试官看到你的学校，眼睛亮了一下，然后问了一句让你噎住的话：\n\n"你们学校这么好，为什么来我们这种公司？"\n\n这句话的答案，你回答过很多次，但每一次都感觉有点不对。',
    options: [
      {
        id: 'C-EDU-002-A',
        text: '"贵司的业务方向和我的规划高度契合。"（标准答案）',
        effect: { confidence: 5, stress: 5 },
      },
      {
        id: 'C-EDU-002-B',
        text: '"我认为企业文化比平台名气更重要。"（真心话）',
        effect: { confidence: 8, morale: 5 },
      },
      {
        id: 'C-EDU-002-C',
        text: '"……"（沉默了一下，没想好怎么说）',
        effect: { confidence: -5, stress: 10 },
      },
    ],
    triggerCondition: {
      schoolTiers: ['S', 'A'],
      minChapter: 3,
    },
    weight: 2,
  },
  {
    id: 'C-EDU-003',
    type: 'conditional',
    category: 'turning',
    title: '双非逆袭时刻',
    desc: '本来以为简历会被卡，没想到HR约了你面试。\n\n她说，你的实习经历和项目经历让我们觉得很有潜力，学校不是我们最看重的部分。\n\n你握着手机，手有点抖。',
    options: [
      {
        id: 'C-EDU-003-A',
        text: '认真准备，不能浪费这次机会',
        effect: { confidence: 25, stress: 15, morale: 20 },
        unlockFlag: 'underdog_chance',
      },
      {
        id: 'C-EDU-003-B',
        text: '有点受宠若惊，先稳住心态',
        effect: { confidence: 15, morale: 15 },
        unlockFlag: 'underdog_chance',
      },
    ],
    triggerCondition: {
      schoolTiers: ['C', 'D'],
      backgrounds: ['big_tech_intern'],
      minChapter: 3,
    },
    weight: 1,
    isOneShot: true,
  },

  // ══════════════════════════════
  // 考公支线
  // ══════════════════════════════
  {
    id: 'C-CIVIL-SVC-001',
    type: 'conditional',
    category: 'turning',
    title: '国考报名截止',
    desc: '报名截止日还有两天。\n\n你盯着公务员报名页面，旁边同学说："要不要一起报？稳稳当当的。"\n\n你想了想，家里人的声音在耳边隐约响起。',
    options: [
      {
        id: 'C-CIVIL-SVC-001-A',
        text: '报名，全力备考',
        effect: { anxiety: -10, morale: 5, stress: 5 },
        unlockFlag: 'civil_exam_entered',
        nextEventId: 'CIVIL-EXAM-MINI',
      },
      {
        id: 'C-CIVIL-SVC-001-B',
        text: '不报，专注秋招',
        effect: { morale: 5, stress: 5 },
      },
      {
        id: 'C-CIVIL-SVC-001-C',
        text: '两个都试试，兵分两路',
        effect: { stress: 20, anxiety: 15 },
        unlockFlag: 'civil_exam_entered',
        nextEventId: 'CIVIL-EXAM-MINI',
      },
    ],
    triggerCondition: {
      minChapter: 2,
      maxChapter: 3,
    },
    weight: 2,
    isOneShot: true,
  },

  // ══════════════════════════════
  // 心理状态触发事件
  // ══════════════════════════════
  {
    id: 'C-PSYCH-001',
    type: 'conditional',
    category: 'stress',
    title: '快撑不住了',
    desc: '那天你坐在宿舍里，什么都没做，就这样坐了两个小时。\n\n不是不想动，只是动不了。\n\n脑子里一片嗡嗡声，全是还没回音的公司、还没做完的题，以及那个越来越近的毕业。',
    options: [
      {
        id: 'C-PSYCH-001-A',
        text: '给自己放一天假，什么都不做',
        effect: { stress: -15, anxiety: -10, morale: 10 },
        unlockFlag: 'took_rest',
      },
      {
        id: 'C-PSYCH-001-B',
        text: '去跑步，出出汗',
        effect: { stress: -10, morale: 15, confidence: 5 },
      },
      {
        id: 'C-PSYCH-001-C',
        text: '打开电脑，继续干',
        effect: { stress: 10, morale: -10 },
      },
    ],
    triggerCondition: {
      minStress: 75,
      maxConfidence: 40,
    },
    weight: 3,
    isOneShot: true,
  },
  {
    id: 'C-PSYCH-002',
    type: 'conditional',
    category: 'light',
    title: '破釜沉舟的念头',
    desc: '你有一个大胆的想法：\n\n放掉手里的保底offer，全力冲刺最后一家梦想公司。\n\n理智说不行，但你感觉……不搏一次，好像一辈子都会后悔。',
    options: [
      {
        id: 'C-PSYCH-002-A',
        text: '赌！放弃保底，全力冲',
        effect: { morale: 20, confidence: 10, anxiety: 25 },
        unlockFlag: 'gambling_last',
        nextEventId: 'HIDDEN-GAMBLE',
      },
      {
        id: 'C-PSYCH-002-B',
        text: '算了，稳稳当当上岸要紧',
        effect: { morale: -5, anxiety: -15 },
        unlockFlag: 'offer_accepted',
      },
    ],
    triggerCondition: {
      minStress: 65,
      minMorale: 65,
      flags: ['has_offer_keep_going'],
    },
    weight: 1,
    isOneShot: true,
  },
]
