import type { Attributes, AttributeDelta, AttributeKey } from '../types/game'

export const ATTR_CLAMP = { min: 0, max: 100 }

export function applyDelta(attrs: Attributes, delta: AttributeDelta): Attributes {
  const next = { ...attrs }
  for (const key of Object.keys(delta) as AttributeKey[]) {
    const d = delta[key] ?? 0
    next[key] = Math.min(ATTR_CLAMP.max, Math.max(ATTR_CLAMP.min, next[key] + d))
  }
  return next
}

// ─── 属性临界状态检测 ────────────────────────────────────────

export type CriticalState =
  | 'breakdown'        // 崩溃：压力>80 AND 信心<30
  | 'lying_flat'       // 躺平：焦虑>80 AND 心气<30
  | 'broke'            // 缺钱：现金<20
  | 'burning'          // 破釜沉舟：压力>70 AND 心气>70
  | 'balanced'         // 佛系：所有属性在40-60之间
  | 'none'

export function detectCriticalState(attrs: Attributes): CriticalState {
  const { confidence, stress, anxiety, morale, money } = attrs

  if (stress > 80 && confidence < 30) return 'breakdown'
  if (anxiety > 80 && morale < 30)    return 'lying_flat'
  if (money < 20)                     return 'broke'
  if (stress > 70 && morale > 70)     return 'burning'

  const allBalanced = [confidence, stress, anxiety, morale, money]
    .every(v => v >= 38 && v <= 62)
  if (allBalanced) return 'balanced'

  return 'none'
}

// ─── 属性标签 ────────────────────────────────────────────────

export function getAttributeLabel(key: AttributeKey): string {
  const map: Record<AttributeKey, string> = {
    confidence: '信心',
    stress:     '压力',
    anxiety:    '焦虑',
    morale:     '心气',
    money:      '现金',
  }
  return map[key]
}

export function getAttributeIcon(key: AttributeKey): string {
  const map: Record<AttributeKey, string> = {
    confidence: '💪',
    stress:     '😤',
    anxiety:    '😰',
    morale:     '🔥',
    money:      '💰',
  }
  return map[key]
}

export function getAttributeColor(key: AttributeKey, value: number): string {
  if (key === 'stress' || key === 'anxiety') {
    if (value > 75) return '#e74c3c'
    if (value > 50) return '#e67e22'
    return '#27ae60'
  }
  if (value < 25) return '#e74c3c'
  if (value < 45) return '#e67e22'
  return '#3498db'
}

// ─── 属性等级描述 ────────────────────────────────────────────

export function getAttributeDesc(key: AttributeKey, value: number): string {
  if (key === 'confidence') {
    if (value >= 80) return '充满斗志'
    if (value >= 60) return '还不错'
    if (value >= 40) return '有点动摇'
    if (value >= 20) return '快撑不住了'
    return '已经放弃了'
  }
  if (key === 'stress') {
    if (value >= 85) return '快崩了'
    if (value >= 65) return '压力山大'
    if (value >= 45) return '还好'
    if (value >= 25) return '比较轻松'
    return '心如止水'
  }
  if (key === 'anxiety') {
    if (value >= 85) return '极度焦虑'
    if (value >= 65) return '焦虑中'
    if (value >= 45) return '有点担心'
    if (value >= 25) return '比较淡定'
    return '完全放开了'
  }
  if (key === 'morale') {
    if (value >= 80) return '燃！'
    if (value >= 60) return '有劲头'
    if (value >= 40) return '还行'
    if (value >= 20) return '有点蔫'
    return '摆烂中'
  }
  // money
  if (value >= 80) return '不差钱'
  if (value >= 55) return '够用'
  if (value >= 35) return '省着点'
  if (value >= 15) return '捉襟见肘'
  return '快揭不开锅了'
}
