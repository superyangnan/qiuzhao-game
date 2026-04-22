// 本地开发 Mock：AI 调用的兜底数据，让游戏在无网络/无云函数时也能完整体验

import type { ArkEventResponse, ArkInterviewResponse, ArkEndingResponse } from '../types/game'

const MOCK_EVENTS: ArkEventResponse[] = [
  {
    event_title: '凌晨的招聘群',
    event_desc: '凌晨两点，你刷到招聘群里有人发了一张截图：某大厂HR说今年HC砍了一半。\n\n消息下面跟了几十条回复，有人说"早就听说了"，有人说"假的别信"。\n\n你盯着屏幕，不知道该不该继续刷下去。',
    options: [
      { text: '关掉手机，强迫自己睡觉', effect: { stress: -5, anxiety: 5 } },
      { text: '认真搜索一下消息来源', effect: { stress: 10, confidence: 3 } },
      { text: '转发给朋友，一起讨论', effect: { anxiety: 8, morale: 3 } },
    ],
  },
  {
    event_title: '偶遇学长',
    event_desc: '在图书馆碰到了去年秋招上岸的学长。他问你最近怎么样，你说"还在找"。\n\n他点点头，说了句："当时我也投了三个月，现在回头看，其实挺正常的。"\n\n你不知道该接什么，只是笑了笑。',
    options: [
      { text: '请他吃饭，聊聊经验', effect: { confidence: 12, morale: 8, money: -8 } },
      { text: '简单聊几句，各自去忙', effect: { morale: 5 } },
      { text: '问他能不能内推', effect: { confidence: 8, morale: 5 } },
    ],
  },
  {
    event_title: '意外的好消息',
    event_desc: '下午三点，手机突然响了。\n\n是一个你都快忘了投过的公司，说是笔试通过了，问你这周能不能来面试。\n\n你翻了翻记录，是两个月前投的，当时完全没报希望。',
    options: [
      { text: '立刻确认时间，认真准备', effect: { confidence: 18, stress: 10, morale: 15 } },
      { text: '先查一下这家公司什么水平', effect: { confidence: 10, morale: 8 } },
    ],
  },
  {
    event_title: '宿舍夜聊',
    event_desc: '熄灯后宿舍里没人睡，大家都在刷手机。\n\n有人问："你们觉得今年形势怎么样？"\n\n室友说了句让你一时无语的话："反正比去年好吧，去年更惨。"',
    options: [
      { text: '"对，加油，明天继续。"', effect: { morale: 8 } },
      { text: '"好不好我也不知道，睡了。"', effect: { stress: -5 } },
      { text: '把自己的焦虑说出来，大家聊聊', effect: { anxiety: -8, morale: 10, stress: -5 } },
    ],
  },
  {
    event_title: '简历又被刷了',
    event_desc: '今天又收到了三封一模一样的拒信，只有公司名字不同。\n\n"感谢您对本公司的关注，经综合评估，您的简历……"\n\n你读到第三封的时候，已经不太有感觉了。',
    options: [
      { text: '淡定，继续投下一批', effect: { confidence: -3, stress: 5, morale: 3 } },
      { text: '重新审视简历，看哪里出了问题', effect: { stress: 12, confidence: 5 } },
      { text: '今天先不投了，出去走走', effect: { stress: -8, anxiety: -5, morale: 5 } },
    ],
  },
]

const MOCK_INTERVIEW_FOLLOWUPS = [
  '你刚才说到了这个项目，能详细说说你在里面具体负责了什么吗？',
  '你提到团队协作，有没有遇到过冲突，你是怎么处理的？',
  '你的优势我们了解了，说说你觉得自己最大的不足是什么？',
  '如果你来到我们公司，三个月内你希望做到什么？',
  '你对我们公司了解多少？为什么选择我们？',
  '你还有其他offer在谈吗？如果我们给你offer，你会怎么考虑？',
]

const MOCK_ENDING_STORIES: Record<string, { story: string; gold_quote: string }> = {
  default: {
    story: `从那个八月开始，你经历了这一切。

投出去的简历，等待回音的夜晚，群面里的沉默，HR已读不回的三秒钟。

有些事你做到了，有些事你没做到。这很正常，大多数人的秋招都不是一帆风顺的故事。

你经历过压力，经历过焦虑，也在某些瞬间感到过一点点希望。这些都是真实的，都是你的。

无论最终的结果是什么，你把这段路走完了。

一个走完了的人，不管走到了哪里，都值得被好好对待——包括被你自己好好对待。`,
    gold_quote: '走完了，就是一种完成。',
  },
  A1: {
    story: `你拿到了那个offer。

说实话，第一反应不是狂喜，而是有点不真实。然后是累。然后才是一点点高兴。

秋招这段时间，你经历了不少。那些凌晨刷题的夜晚，那些投出去之后没有回音的等待，那些面试之后不知道结果的煎熬——都过去了。

站在这个位置，你可能会发现，它没有你想象的那么"终点"。新的压力会来，新的焦虑也会来。

但那是另一个故事了。

这个故事，你走完了，走得不错。`,
    gold_quote: '到了，但路还在继续。',
  },
  E2: {
    story: `这个秋天，你没有拿到满意的结果。

这句话说出来还是很重的。你不需要假装它不重要，也不需要用"过程更重要"来安慰自己——结果重要，这没有错。

但有一件事值得你记住：

你把整个秋招走完了。从第一封投递到最后一次等待，中间那些笔试、拒信、面试、沉默，你全部经历了，而且你完整地走出来了。

这不是小事。经历一次完整的失败，并且还能站在这里，是很多人做不到的事。

你做到了。`,
    gold_quote: '没拿到offer，不等于什么都没得到。',
  },
}

// ─── Mock 函数 ────────────────────────────────────────────────

export async function mockGenerateRandomEvent(): Promise<ArkEventResponse> {
  await delay(600)
  return MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)]
}

export async function mockGenerateInterviewQuestion(
  playerAnswer: string,
  turnCount: number,
): Promise<ArkInterviewResponse> {
  await delay(800)
  const question = MOCK_INTERVIEW_FOLLOWUPS[turnCount % MOCK_INTERVIEW_FOLLOWUPS.length]
  return {
    interviewer_say: question,
    hint: turnCount === 0 ? '提示：尽量结合具体经历来回答' : undefined,
  }
}

export async function mockGenerateEndingStory(endingId: string): Promise<ArkEndingResponse> {
  await delay(1500)
  return MOCK_ENDING_STORIES[endingId] ?? MOCK_ENDING_STORIES.default
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
