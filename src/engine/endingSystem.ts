import type { GameState, EndingType, CompanyTier } from '../types/game'
import { ENDINGS, ENDING_PRIORITY } from '../data/endings'

const TIER_ORDER: CompanyTier[] = ['D', 'C', 'B', 'A', 'S', 'special']

function tierGte(a: CompanyTier, b: CompanyTier): boolean {
  return TIER_ORDER.indexOf(a) >= TIER_ORDER.indexOf(b)
}

function getBestOfferTier(state: GameState): CompanyTier | null {
  const offers = state.applications.filter(a => a.status === 'offer')
  if (offers.length === 0) return null

  const { COMPANIES } = require('../data/companies')
  let best: CompanyTier = 'D'
  for (const app of offers) {
    const company = COMPANIES.find((c: any) => c.id === app.companyId)
    if (company && TIER_ORDER.indexOf(company.tier) > TIER_ORDER.indexOf(best)) {
      best = company.tier
    }
  }
  return best
}

function matchesEndingCondition(endingId: EndingType, state: GameState): boolean {
  const ending = ENDINGS.find(e => e.id === endingId)
  if (!ending) return false

  const { triggerCondition: cond } = ending
  const bestTier = getBestOfferTier(state)
  const hasOffer = bestTier !== null
  const { attributes, flags, player } = state

  if (cond.hasOffer === true && !hasOffer) return false
  if (cond.hasOffer === false && hasOffer) return false

  if (cond.minBestOfferTier && (!bestTier || !tierGte(bestTier, cond.minBestOfferTier))) return false
  if (cond.maxBestOfferTier && bestTier && !tierGte(cond.maxBestOfferTier, bestTier)) return false

  if (cond.minConfidence !== undefined && attributes.confidence < cond.minConfidence) return false
  if (cond.maxStress !== undefined && attributes.stress > cond.maxStress) return false
  if (cond.maxAnxiety !== undefined && attributes.anxiety > cond.maxAnxiety) return false
  if (cond.minMorale !== undefined && attributes.morale < cond.minMorale) return false

  if (cond.flags?.length && !cond.flags.every(f => flags.has(f))) return false

  if (cond.eduLevels?.length && player && !cond.eduLevels.includes(player.edu)) return false

  if (cond.specificPath && !flags.has(cond.specificPath)) return false

  return true
}

export function determineEnding(state: GameState): EndingType {
  for (const id of ENDING_PRIORITY) {
    if (matchesEndingCondition(id as EndingType, state)) {
      return id as EndingType
    }
  }
  return 'E3' // 兜底
}

// ─── 治愈文案模板填充（方舟生成失败时的兜底） ─────────────────

export function fillEndingTemplate(endingId: EndingType, state: GameState): string {
  const ending = ENDINGS.find(e => e.id === endingId)
  if (!ending || !state.player) return ending?.templateStory ?? ''

  const player = state.player
  const keyEvents = state.eventHistory.slice(0, 3).map(h => h.event.title)
  const peakStressEvent = state.eventHistory
    .reduce((max, h) => {
      const stressEffect = h.event.options[h.choiceIdx]?.effect?.stress ?? 0
      return stressEffect > max.stress ? { event: h.event.title, stress: stressEffect } : max
    }, { event: '紧张的备考阶段', stress: 0 }).event

  const eduLabel: Record<string, string> = {
    college: '专科', bachelor_normal: '普通本科', bachelor_211: '211院校',
    bachelor_985: '985院校', master: '研究生', phd: '博士'
  }
  const majorLabel: Record<string, string> = {
    cs: '计算机', finance: '金融', law: '法学', medicine: '临床医学',
    biology: '生物', math: '数学统计', electronics: '电子通信',
    civil: '土木建筑', accounting: '会计审计', business: '工商管理',
    trade: '国际贸易', chinese: '中文/新闻', history: '历史哲学',
    foreign_lang: '外语', nursing: '护理'
  }

  return ending.templateStory
    .replace('{edu}', eduLabel[player.edu] ?? player.edu)
    .replace('{major}', majorLabel[player.major] ?? player.major)
    .replace('{key_event_1}', keyEvents[0] ?? '那段难熬的日子')
    .replace('{key_event_2}', keyEvents[1] ?? '后来的低谷')
    .replace('{peak_stress_event}', peakStressEvent)
    .replace('{company_name}', '这家公司')
    .replace('{offer_a}', state.applications.find(a => a.status === 'offer')?.companyId ?? 'A公司')
    .replace('{offer_b}', state.applications.filter(a => a.status === 'offer')[1]?.companyId ?? 'B公司')
}
