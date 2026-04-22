import type { Ending } from '../types/game'

export const ENDINGS: Ending[] = [
  // ── A类：大满贯 ───────────────────────────────────────────────
  {
    id: 'A1',
    title: '人生赢家',
    subtitle: '你站在了大多数人仰望的地方',
    rarity: 'rare',
    cardStyle: 'warm',
    triggerCondition: {
      minBestOfferTier: 'S',
      minConfidence: 65,
      maxStress: 55,
    },
    templateStory: `从{edu}毕业的你，带着{major}专业的背景，走进了这场名叫秋招的考场。

你还记得{key_event_1}的那个夜晚。那时候你可能没想到，这段路最终会走到今天这里。

{company_name}的offer躺在你的邮箱里。数字是真实的，工牌是真实的，第一天上班时那种轻微的不真实感，也是真实的。

站在这个位置上，会有一点孤独。你在人群里，却不一定找得到能分享这份感受的人。那没关系。

真正的赢不是别人看你的眼神，是你知道自己为什么在这里。`,
    goldQuote: '你到了，但路还长，走好。',
  },
  {
    id: 'A2',
    title: '甜蜜的烦恼',
    subtitle: '两个大offer，这种困扰很多人一生都遇不到',
    rarity: 'rare',
    cardStyle: 'warm',
    triggerCondition: {
      minBestOfferTier: 'A',
      flags: ['has_two_offers'],
    },
    templateStory: `你面对的不是没有offer，而是两个都不想放弃的offer。

{offer_a}和{offer_b}，各有各的理由，各有各的代价。

其实做这个选择本身，就已经是一种答案了。你在秋招里跑赢了很多人，这不是偶然——是你那些不被看见的努力堆出来的。

不管你最终选了哪个，都不会是错的。因为让你走到今天的那个你，就在那个选择背后。`,
    goldQuote: '每一个好的选择，都值得被认真对待。',
  },

  // ── B类：稳落地 ───────────────────────────────────────────────
  {
    id: 'B1',
    title: '刚刚好',
    subtitle: '不是最闪亮的，但这就是你的位置',
    rarity: 'common',
    cardStyle: 'neutral',
    triggerCondition: {
      minBestOfferTier: 'B',
      maxBestOfferTier: 'A',
    },
    templateStory: `不是顶流的大厂，不是让朋友圈惊叫的名字，但这份offer，是你实实在在打出来的。

{key_event_1}的时候你没有放弃，{key_event_2}的时候你也挺过来了。这一路不算光鲜，但每一步都是你自己走的。

有些人把秋招当作证明自己的考场，有些人只是想找一个可以好好工作的地方。你是哪一种，只有你自己知道。

这份工作，会是你的起点。什么时候出发，完全由你决定。`,
    goldQuote: '平稳落地，也是一种勇气。',
  },
  {
    id: 'B2',
    title: '回家也不错',
    subtitle: '有些人的终点，是别人出发的地方',
    rarity: 'common',
    cardStyle: 'warm',
    triggerCondition: {
      minBestOfferTier: 'C',
      flags: ['chosen_hometown'],
    },
    templateStory: `你最终选择了回家。

这个决定，可能有人不理解，可能你自己偶尔也会问一句"要不要再拼一把"。

但那条街你从小走过，那家餐馆你吃了二十年，那些人说的话里有你熟悉的口音。

慢一点，不是落后。离家近，不是失败。

你选择的不是"逃"，是"回"。这中间有一个字的距离，也有很多人一辈子没能走完的距离。`,
    goldQuote: '选择慢一点的生活，需要比别人更多的勇气。',
  },
  {
    id: 'B3',
    title: '铁饭碗',
    subtitle: '稳定，是另一种可能',
    rarity: 'uncommon',
    cardStyle: 'cool',
    triggerCondition: {
      flags: ['civil_exam_success'],
    },
    templateStory: `你考上了。

备考的那段时间，你放弃了很多，刷了无数真题，背了无数申论框架。很多人说考公没意思，但你知道自己为什么选这条路。

铁饭碗里装的不一定是安逸，有时候是一种叫做"确定性"的东西——在这个时代，确定性本身就很贵。

未来那份工作可能平淡，也可能充实，但那是你的选择，没有人可以替你评判它的意义。`,
    goldQuote: '稳定，不是平庸，是一种选择的结果。',
  },

  // ── C类：曲折 ─────────────────────────────────────────────────
  {
    id: 'C1',
    title: '二战吧',
    subtitle: '你把今年的失败，变成了明年的弹药',
    rarity: 'common',
    cardStyle: 'cool',
    triggerCondition: {
      hasOffer: false,
      minMorale: 45,
      flags: ['decided_retry'],
    },
    templateStory: `这一年的秋招，你没有拿到满意的结果。

说没关系是假的，你也不需要假装没关系。{peak_stress_event}的时候，你压力到底有多大，那是真实存在过的感受。

但你选择了再来一次。这不是因为你不服气，而是因为你还没准备好放弃。

失败是真实的，但它不是终点，只是一个转折处的休息点。

明年的你，会站在更清楚的起点上出发。今年的这一切，都会是弹药。`,
    goldQuote: '今年的代价，是明年的底气。',
  },
  {
    id: 'C2',
    title: '弯路也是路',
    subtitle: '你走了一段弯路，才找到了正路',
    rarity: 'uncommon',
    cardStyle: 'neutral',
    triggerCondition: {
      flags: ['cross_major_success'],
    },
    templateStory: `当初填报志愿，你大概没想到今天会做这份工作。

跨专业求职，每投一次简历都需要多解释一段自己的逻辑，每次面试都需要多说服一遍面试官。

但你撑下来了，而且在这个过程中，你比很多人更清楚自己到底想要什么。

那条弯路上，你学到的，不只是知识，还有选择的代价和选择的意义。`,
    goldQuote: '不走弯路的人，不知道直路的珍贵。',
  },
  {
    id: 'C3',
    title: '跳台',
    subtitle: '这不是终点，只是一个起跳点',
    rarity: 'common',
    cardStyle: 'neutral',
    triggerCondition: {
      minBestOfferTier: 'D',
      maxBestOfferTier: 'C',
      minMorale: 35,
    },
    templateStory: `拿到这份offer的时候，你可能有点不甘心。

薪资不如预期，公司不是心仪的那个，城市也不一定是最想去的。

但你没有放弃，你选择先站到地上，再想办法往高处走。这需要一点务实，也需要一点勇气——放弃执念，是很难的事。

跳台不是终点，而是你起跳的地方。`,
    goldQuote: '先落地，再起飞，顺序不重要，方向重要。',
  },
  {
    id: 'C4',
    title: '逆袭传说',
    subtitle: '他们划定的边界，你一脚踢开了',
    rarity: 'secret',
    cardStyle: 'dramatic',
    triggerCondition: {
      minBestOfferTier: 'A',
      eduLevels: ['college'],
    },
    templateStory: `你是专科学历，他们说你进不了这种公司。

你投了，过了，面了，拿了。

这条路上你比别人多绕了多少圈，多被刷了多少次简历，多解释了多少次"虽然学历不高但……"，你心里比任何人都清楚。

但你到了。

这个行业有很多标签，你撕掉了其中一个。不是为了证明给任何人看，只是证明给你自己看：那些写在JD里的要求，不是你的天花板。`,
    goldQuote: '他们用学历画的圆，关不住你。',
  },

  // ── D类：另辟蹊径 ─────────────────────────────────────────────
  {
    id: 'D1',
    title: 'Gap Year宣言',
    subtitle: '你给了自己一段时间，来好好听自己说话',
    rarity: 'uncommon',
    cardStyle: 'warm',
    triggerCondition: {
      flags: ['gave_up_qiuzhao', 'decided_gap_year'],
      minMorale: 50,
    },
    templateStory: `你没有在这个秋天找到工作，但你做了一个也许更难的决定：

先停下来。

不是逃跑，是暂停。不是放弃，是给自己一段时间，在全力冲刺之前，先弄清楚自己要跑向哪里。

这需要忍受很多——别人的目光，自己内心的不安，那种"是不是落后了"的焦虑。

但如果你没搞清楚方向，跑得再快也只是在绕圈。

去听听你自己的声音吧。`,
    goldQuote: '停下来，不是放弃，是为了走得更远。',
  },
  {
    id: 'D2',
    title: '造工作的人',
    subtitle: '别人在找工作，你在造工作',
    rarity: 'secret',
    cardStyle: 'dramatic',
    triggerCondition: {
      flags: ['startup_path'],
    },
    templateStory: `你没有去投递别人的招聘简历，你选择了另一条路。

这条路没有稳定，没有确定的薪资，没有那个能向父母汇报的offer截图。

有的是凌晨三点还亮着的屏幕，是反复被否定然后重来的方案，是那种不知道何时是头的不确定感。

但也有一种东西，是在别处找不到的：那是属于你的事，是你搭起来的东西。

不是所有人都适合这条路，但你偏偏选了它。`,
    goldQuote: '有的人找工作，有的人造工作，都是勇气。',
  },
  {
    id: 'D3',
    title: '另一个起点',
    subtitle: '你选择了在更远的地方重新出发',
    rarity: 'uncommon',
    cardStyle: 'cool',
    triggerCondition: {
      flags: ['study_abroad_path'],
    },
    templateStory: `你选择了出国。

可能是为了更好的机会，可能是为了逃开这里的内卷，可能是因为你本来就对外面的世界更好奇。

动机不重要，重要的是你去了。

离开不是放弃，是扩张。你把自己的地图画大了一点，把可能性的边界往外推了一点。

异乡的第一年会很难，但那是你的故事里最特别的一章。`,
    goldQuote: '离开不是逃跑，是把世界画大了一点。',
  },

  // ── E类：情绪共鸣（最难触发） ────────────────────────────────
  {
    id: 'E1',
    title: '崩溃与重建',
    subtitle: '你崩溃过，然后重新站了起来，这就够了',
    rarity: 'rare',
    cardStyle: 'dramatic',
    triggerCondition: {
      flags: ['had_breakdown', 'offer_accepted'],
    },
    templateStory: `你崩溃过。

不是轻描淡写的"有点累"，而是真实地撑不住了：{peak_stress_event}的时候，那种感觉你还记得吗？

那种时候，很多人选择假装自己还好。你也可能假装过。但你还是撑下来了，一天一天地，走到了今天。

拿到这个offer的你，和刚开始秋招的你，已经不是同一个人了。

你经历了什么，你自己知道。那些经历不会消失，只会成为你的一部分。`,
    goldQuote: '崩溃过的人，重建起来的东西更结实。',
  },
  {
    id: 'E2',
    title: '什么都没得到，但我还是我',
    subtitle: '你完整地经历了一次失败，还完整地走出来了',
    rarity: 'rare',
    cardStyle: 'neutral',
    triggerCondition: {
      hasOffer: false,
      maxStress: 60,
      maxAnxiety: 60,
    },
    templateStory: `这个秋天，你没有拿到offer。

这句话，说出来还是很重的。你不需要假装它不重要。

但有一件事值得你记住：你经历了整个秋招，从第一封投递到最后一次等待，中间所有的笔试、拒信、面试、沉默——你全部经历了，而且你完整地走出来了。

这一年，你没有在最难的地方倒下。

这不是小事。真的不是。`,
    goldQuote: '没有拿到offer，不等于你什么都没得到。',
  },
  {
    id: 'E3',
    title: '平静经过',
    subtitle: '你没有特别拼，也没有特别惨，你只是经历了',
    rarity: 'uncommon',
    cardStyle: 'neutral',
    triggerCondition: {
      minBestOfferTier: 'C',
    },
    templateStory: `你的秋招，不是一个激烈的故事。

没有戏剧性的逆转，没有惊天的高光，也没有彻底的低谷。就是一步一步地走，一封一封地等，一次一次地继续。

这种经历，没有那么好说给别人听，但它是真实的——大多数人的秋招，都长这个样子。

不要觉得平静是一种遗憾。能平静地经历一件本来很焦虑的事情，是一种了不起的能力。`,
    goldQuote: '平静经过，也是一种完成。',
  },
  {
    id: 'E4',
    title: '还在路上',
    subtitle: '有些人的秋招，叫做整个青春',
    rarity: 'secret',
    cardStyle: 'warm',
    triggerCondition: {
      flags: ['spring_recruitment_ongoing'],
    },
    templateStory: `秋招结束了，你的路还没有结束。

春招开始了，你还在找。这不是什么丢人的事，这只是你的节奏比别人慢了一点——而"慢"，不是"错"。

那些已经上岸的人，也有他们的困惑和不安。而你，还有时间去找到真正适合自己的地方。

这封信，写给还在路上的你：

走慢一点没关系，迷路了可以问路，累了可以停一停。但别停太久——不是因为要赶，而是因为你值得找到那个地方。`,
    goldQuote: '有些路，走慢一点，才能看清楚方向。',
  },
]

// 结局判断优先级顺序（越靠前越优先匹配）
export const ENDING_PRIORITY: string[] = [
  'C4', // 逆袭传说（最稀有，先判）
  'D2', // 造工作
  'E1', // 崩溃与重建
  'E4', // 还在路上
  'A1', // 人生赢家
  'A2', // 甜蜜的烦恼
  'B3', // 铁饭碗
  'D1', // Gap Year
  'D3', // 出国
  'C1', // 二战
  'C2', // 弯路
  'E2', // 什么都没得到
  'B2', // 回家
  'C3', // 跳台
  'B1', // 刚刚好
  'E3', // 平静经过（兜底）
]
