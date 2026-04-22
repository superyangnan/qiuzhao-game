import type { GameEvent } from '../../types/game'

export const FIXED_EVENTS: GameEvent[] = [
  // ══════════════════════════════
  // 第一章：8月 内推季
  // ══════════════════════════════
  {
    id: 'F-001',
    type: 'fixed',
    category: 'social',
    chapter: 1,
    title: '朋友圈内推轰炸',
    desc: '八月初，你的手机开始震个不停。秋招群、同学群、师兄师姐群……到处都是"字节内推码来了！""腾讯名额有限，手速快的上！"\n\n你看着屏幕，深呼一口气。秋招，真的开始了。',
    options: [
      {
        id: 'F-001-A',
        text: '广撒网，先投一百家',
        effect: { anxiety: 10, morale: 5, money: -5 },
        unlockFlag: 'strategy_scatter',
      },
      {
        id: 'F-001-B',
        text: '精准出击，只投心仪的十家',
        effect: { confidence: 5, anxiety: 5 },
        unlockFlag: 'strategy_precise',
      },
      {
        id: 'F-001-C',
        text: '先把题刷完再说',
        effect: { stress: 8, morale: 3 },
        unlockFlag: 'strategy_study',
      },
      {
        id: 'F-001-D',
        text: '再等等，时间还早',
        effect: { anxiety: -5, morale: -5 },
        unlockFlag: 'strategy_wait',
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-002',
    type: 'fixed',
    category: 'stress',
    chapter: 1,
    title: '简历初稿危机',
    desc: '你打开简历，盯着那份一年没更新的Word文档沉默了三分钟。\n\n教育经历、实习经历、项目经历……怎么感觉每一行都在暴露自己的不足？\n\n"要不要找人帮我改一改？"',
    options: [
      {
        id: 'F-002-A',
        text: '付费找专业机构修改（-20金钱）',
        effect: { confidence: 10, money: -20 },
        unlockFlag: 'resume_paid',
      },
      {
        id: 'F-002-B',
        text: '求师兄师姐帮忙看看',
        effect: { confidence: 8, morale: 5 },
        unlockFlag: 'resume_referral',
      },
      {
        id: 'F-002-C',
        text: '自己改，相信自己',
        effect: { confidence: 5, stress: 5 },
        unlockFlag: 'resume_self',
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-003',
    type: 'fixed',
    category: 'social',
    chapter: 1,
    title: '秋招群建立',
    desc: '你被拉进了一个叫"2025届秋招互助群"的微信群。\n\n里面三百个人，每天从早到晚都有消息。有人分享笔试题，有人晒offer，有人在问"被HR挂了正常吗"……\n\n你把这个群设成了免打扰，然后内心五味杂陈。',
    options: [
      {
        id: 'F-003-A',
        text: '认真看每一条消息，吸收情报',
        effect: { anxiety: 15, confidence: 5 },
      },
      {
        id: 'F-003-B',
        text: '只看笔经/面经，屏蔽噪音',
        effect: { stress: 5, confidence: 3 },
      },
      {
        id: 'F-003-C',
        text: '直接免打扰，眼不见心不烦',
        effect: { anxiety: -5, morale: 3 },
      },
    ],
    isOneShot: true,
  },

  // ══════════════════════════════
  // 第二章：9月 海投期
  // ══════════════════════════════
  {
    id: 'F-010',
    type: 'fixed',
    category: 'stress',
    chapter: 2,
    title: '第一封拒信',
    desc: '你投出去的第五封简历，今天有了回音。\n\n"感谢您投递XX公司，经综合评估，您的简历与岗位要求不匹配，我们将保留您的信息以备……"\n\n你盯着这封模板邮件看了很久，手机屏幕亮了又暗。\n\n第一次，就这样。',
    options: [
      {
        id: 'F-010-A',
        text: '没事的，这才第一封，继续投',
        effect: { confidence: -5, morale: 5 },
      },
      {
        id: 'F-010-B',
        text: '去刷了会儿手机，假装没看见',
        effect: { anxiety: 8, stress: 5 },
      },
      {
        id: 'F-010-C',
        text: '认真反思简历哪里出了问题',
        effect: { confidence: 3, stress: 10, morale: 3 },
        unlockFlag: 'resume_reflect',
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-011',
    type: 'fixed',
    category: 'light',
    chapter: 2,
    title: '第一封笔试邀请',
    desc: '终于！\n\n邮件通知：您已通过简历筛选，请于本周六完成在线笔试，时长120分钟，请合理安排时间……\n\n你把消息转发给家人，看到妈妈回了个"加油！"和五个大拇指表情包。',
    options: [
      {
        id: 'F-011-A',
        text: '认真备考，刷历年题',
        effect: { confidence: 8, stress: 15, morale: 10 },
        unlockFlag: 'first_test_prepared',
      },
      {
        id: 'F-011-B',
        text: '随缘，看看水平怎么样',
        effect: { confidence: 5, morale: 12, stress: 5 },
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-012',
    type: 'fixed',
    category: 'social',
    chapter: 2,
    title: '国庆节：回家被催',
    desc: '难得的假期，你回了家。\n\n饭桌上，亲戚们的问题如约而至——\n\n"找工作了吗？""打算去哪个城市？""有没有编制？""你们班同学都找到了吧？"\n\n你把筷子放下，深呼一口气。',
    options: [
      {
        id: 'F-012-A',
        text: '"还在努力，有进展会告诉你们的。"（平静应对）',
        effect: { stress: 5, morale: 3 },
      },
      {
        id: 'F-012-B',
        text: '"都投着呢，不一定的。"（敷衍）',
        effect: { anxiety: 10, stress: 8 },
      },
      {
        id: 'F-012-C',
        text: '借上厕所暂时逃离',
        effect: { anxiety: 5, morale: -5 },
      },
      {
        id: 'F-012-D',
        text: '借助这个契机认真聊聊未来',
        effect: { confidence: 5, morale: 8, stress: 5 },
        unlockFlag: 'family_talk',
      },
    ],
    isOneShot: true,
  },

  // ══════════════════════════════
  // 第三章：10月 高峰期
  // ══════════════════════════════
  {
    id: 'F-020',
    type: 'fixed',
    category: 'interview',
    chapter: 3,
    title: '第一次群面',
    desc: `你穿上了那套买了一年没穿过的正装，坐在一排陌生人旁边，等待群面开始。\n\n主考官把一道题放在屏幕上："请各位围绕'共享经济的下一个蓝海'进行20分钟的小组讨论。"\n\n全场沉默了三秒钟。`,
    options: [
      {
        id: 'F-020-A',
        text: '第一个开口，主动担任leader',
        effect: { confidence: 10, stress: 10 },
        unlockFlag: 'group_leader',
        nextEventId: 'INTERVIEW-GROUP',
      },
      {
        id: 'F-020-B',
        text: '等别人先开口，然后补充',
        effect: { stress: 5, anxiety: 8 },
        nextEventId: 'INTERVIEW-GROUP',
      },
      {
        id: 'F-020-C',
        text: '认真记录，做好timekeeper',
        effect: { confidence: 3, morale: 5 },
        unlockFlag: 'group_timekeeper',
        nextEventId: 'INTERVIEW-GROUP',
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-021',
    type: 'fixed',
    category: 'stress',
    chapter: 3,
    title: '凌晨等笔试结果',
    desc: '你躺在床上，手机放在枕边。\n\n今天的笔试……感觉还行？但最后两道大题没写完。算法题看着眼熟，就是想不起来。\n\n凌晨一点，你刷了第十二遍邮件。没有新消息。\n\n你打开力扣，又关上了。',
    options: [
      {
        id: 'F-021-A',
        text: '强迫自己睡觉，明天还有面试',
        effect: { stress: -5, anxiety: 10 },
      },
      {
        id: 'F-021-B',
        text: '刷题到凌晨三点',
        effect: { stress: 15, anxiety: 5, confidence: 3 },
        unlockFlag: 'insomnia',
      },
      {
        id: 'F-021-C',
        text: '给朋友发消息吐槽，抱团取暖',
        effect: { anxiety: -5, morale: 8, stress: 5 },
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-022',
    type: 'fixed',
    category: 'stress',
    chapter: 3,
    title: 'HR已读不回',
    desc: '那家你最看好的公司，面试后一周了，没有任何消息。\n\n你在招聘平台上给HR发了一条"请问面试结果如何"。\n\n已读。\n\n没有回复。\n\n你刷新了三次，确认那个已读的勾是真实存在的。',
    options: [
      {
        id: 'F-022-A',
        text: '再等等，可能是在走流程',
        effect: { anxiety: 20, stress: 10 },
      },
      {
        id: 'F-022-B',
        text: '死心了，去投下一家',
        effect: { confidence: -10, morale: -5, stress: -5 },
        unlockFlag: 'ghosted_once',
      },
      {
        id: 'F-022-C',
        text: '再发一条催催看',
        effect: { anxiety: 5, confidence: 3 },
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-023',
    type: 'fixed',
    category: 'light',
    chapter: 3,
    title: '第一个口头offer',
    desc: 'HR在电话里说："我们对您非常满意，offer很快会发过来，请注意查收邮件。"\n\n你挂掉电话，在宿舍楼道里站了一分钟。\n\n然后给妈妈打了个电话，说了三个字："有了。"',
    options: [
      {
        id: 'F-023-A',
        text: '立刻接受，放弃其他面试',
        effect: { confidence: 15, stress: -20, anxiety: -20, morale: 15 },
        unlockFlag: 'first_offer_accepted',
      },
      {
        id: 'F-023-B',
        text: '有了保底，继续冲更好的',
        effect: { confidence: 25, morale: 20 },
        unlockFlag: 'has_offer_keep_going',
      },
      {
        id: 'F-023-C',
        text: '等等，这个offer还不够好',
        effect: { confidence: 10, anxiety: 10 },
      },
    ],
    isOneShot: true,
  },

  // ══════════════════════════════
  // 第四章：11月 等待期
  // ══════════════════════════════
  {
    id: 'F-030',
    type: 'fixed',
    category: 'stress',
    chapter: 4,
    title: '漫长的等待',
    desc: '十一月的某一天，你意识到自己已经三天没投简历了。\n\n不是不想投，而是……已经不知道该投什么了。\n\n手机里存着七八个"等待结果"的公司，它们像石头一样沉在心底，每次想起来都会悬一悬。',
    options: [
      {
        id: 'F-030-A',
        text: '重新梳理，继续海投',
        effect: { stress: 10, morale: 5, anxiety: 8 },
      },
      {
        id: 'F-030-B',
        text: '给所有在等的公司发一遍进度询问',
        effect: { anxiety: 5, confidence: 3 },
      },
      {
        id: 'F-030-C',
        text: '放空三天，休息一下',
        effect: { stress: -10, anxiety: -5, morale: 8 },
        unlockFlag: 'took_rest',
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-031',
    type: 'fixed',
    category: 'social',
    chapter: 4,
    title: '家里又来电话了',
    desc: '"现在怎么样了？找到工作没？"\n\n你妈的声音从手机里传来，你听出了她藏在语气里的担心。\n\n你不知道怎么开口，沉默了两秒。',
    options: [
      {
        id: 'F-031-A',
        text: '"快了快了，有消息告诉你。"',
        effect: { anxiety: 8, morale: -3 },
      },
      {
        id: 'F-031-B',
        text: '说实话，告诉她现在的压力',
        effect: { stress: -10, morale: 10, anxiety: 5 },
        unlockFlag: 'family_honest',
      },
      {
        id: 'F-031-C',
        text: '"有一个还在谈，挺好的。"（撒谎）',
        effect: { stress: 5, confidence: -5 },
      },
    ],
    isOneShot: true,
  },
  {
    id: 'F-032',
    type: 'fixed',
    category: 'social',
    chapter: 4,
    title: '好友上岸了',
    desc: '室友小张把手机屏幕推过来：是腾讯的offer截图。\n\n"哈，终于！你也快了！"\n\n他说得很自然，没有任何炫耀的意思。但你心里有什么东西，悄悄刺了一下。\n\n你笑着说恭喜，然后拿起手机刷了十分钟微博。',
    options: [
      {
        id: 'F-032-A',
        text: '真心为他高兴，问问他面试经验',
        effect: { confidence: 5, morale: 5, anxiety: 5 },
      },
      {
        id: 'F-032-B',
        text: '恭喜完就去图书馆，不想待在宿舍',
        effect: { anxiety: 15, stress: 10, morale: -5 },
      },
      {
        id: 'F-032-C',
        text: '把这个当成动力，告诉自己快了',
        effect: { morale: 10, confidence: 3, anxiety: 8 },
      },
    ],
    isOneShot: true,
  },

  // ══════════════════════════════
  // 第五章：12月 收尾期
  // ══════════════════════════════
  {
    id: 'F-040',
    type: 'fixed',
    category: 'turning',
    chapter: 5,
    title: 'Offer抉择时刻',
    desc: '十二月中旬，你整理了一下手里的牌：\n\n还在等的公司还有两家，但offer期限截止日期就在明天。\n\n你盯着屏幕上的表格——薪资、城市、稳定性、发展前景……每一列都有自己的理由。\n\n要做决定了。',
    options: [
      {
        id: 'F-040-A',
        text: '接受现有最好的offer，上岸为先',
        effect: { stress: -25, anxiety: -25, confidence: 15, morale: 10 },
        unlockFlag: 'offer_accepted',
      },
      {
        id: 'F-040-B',
        text: '再赌最后一次，继续等梦想公司',
        effect: { stress: 15, anxiety: 20 },
        unlockFlag: 'gambling_last',
      },
      {
        id: 'F-040-C',
        text: '放弃秋招，考虑其他出路',
        effect: { morale: -10, anxiety: 10, confidence: -5 },
        unlockFlag: 'gave_up_qiuzhao',
      },
    ],
    isOneShot: true,
  },
]
