import type { EduLevel, Major, JobTarget, City, Background, SchoolTier } from '../types/game'

export interface SelectOption<T> {
  value: T
  label: string
  desc?: string
  icon?: string
}

export const EDU_OPTIONS: SelectOption<EduLevel>[] = [
  { value: 'college',         label: '专科/高职',     desc: '解锁逆袭事件链',     icon: '🎓' },
  { value: 'bachelor_normal', label: '普通本科',       desc: '双非院校',           icon: '📘' },
  { value: 'bachelor_211',    label: '211本科',        desc: '重点高校',           icon: '📗' },
  { value: 'bachelor_985',    label: '985本科',        desc: '解锁光环压力事件',   icon: '📕' },
  { value: 'master',          label: '硕士研究生',     desc: '学硕/专硕均可',      icon: '🔬' },
  { value: 'phd',             label: '博士研究生',     desc: '选择极窄，分化剧烈', icon: '🧪' },
]

export const SCHOOL_TIER_MAP: Record<EduLevel, SchoolTier> = {
  college:         'D',
  bachelor_normal: 'C',
  bachelor_211:    'B',
  bachelor_985:    'A',
  master:          'B',
  phd:             'A',
}

export const MAJOR_OPTIONS: SelectOption<Major>[] = [
  // 理工类
  { value: 'cs',           label: '计算机/软件工程', icon: '💻' },
  { value: 'electronics',  label: '电子/通信',       icon: '📡' },
  { value: 'civil',        label: '土木/建筑',       icon: '🏗️' },
  { value: 'biology',      label: '生物/化学',       icon: '🧬' },
  { value: 'math',         label: '数学/统计',       icon: '📐' },
  // 商科类
  { value: 'finance',      label: '金融/经济',       icon: '💰' },
  { value: 'accounting',   label: '会计/审计',       icon: '📊' },
  { value: 'business',     label: '工商/市场营销',   icon: '📈' },
  { value: 'trade',        label: '国际贸易',        icon: '🌐' },
  // 文科类
  { value: 'law',          label: '法学',            icon: '⚖️' },
  { value: 'chinese',      label: '中文/新闻',       icon: '✒️' },
  { value: 'history',      label: '历史/哲学',       icon: '📜' },
  { value: 'foreign_lang', label: '外语类',          icon: '🗣️' },
  // 医学类
  { value: 'medicine',     label: '临床医学',        icon: '🏥' },
  { value: 'nursing',      label: '护理/公共卫生',   icon: '💊' },
]

export const JOB_TARGET_OPTIONS: SelectOption<JobTarget>[] = [
  { value: 'big_tech',     label: '互联网大厂',   desc: '高风险高收益',       icon: '🚀' },
  { value: 'state_owned',  label: '国有企业',     desc: '稳定导向',           icon: '🏛️' },
  { value: 'foreign',      label: '外资企业',     desc: '竞争激烈，流程漫长', icon: '🌍' },
  { value: 'civil_servant',label: '考公务员',     desc: '独立支线，成功率低', icon: '📋' },
  { value: 'postgrad',     label: '考研二战',     desc: '放弃秋招，极高风险', icon: '📚' },
  { value: 'explore',      label: '自由探索',     desc: '随机性最高',         icon: '🎲' },
]

export const CITY_OPTIONS: SelectOption<City>[] = [
  { value: 'tier1',     label: '北上广深',   desc: '机会最多，竞争最强' },
  { value: 'new_tier1', label: '新一线城市', desc: '杭州/成都/武汉/南京等' },
  { value: 'tier2',     label: '二线城市',   desc: '竞争适中，生活成本低' },
  { value: 'hometown',  label: '回到家乡',   desc: '解锁家乡专属事件链' },
]

export const BACKGROUND_OPTIONS: SelectOption<Background>[] = [
  { value: 'big_tech_intern',    label: '有大厂实习经历',     icon: '⭐' },
  { value: 'research_paper',     label: '有科研/论文发表',     icon: '📄' },
  { value: 'startup',            label: '有创业/副业经历',     icon: '💡' },
  { value: 'student_leader',     label: '学生干部/社团核心',   icon: '🎖️' },
  { value: 'competition_award',  label: '竞赛获奖',            icon: '🏆' },
  { value: 'family_connections', label: '家庭有资源/关系',     icon: '🤝' },
  { value: 'financial_pressure', label: '家庭经济压力大',      icon: '💸' },
  { value: 'cross_major',        label: '跨专业求职',          icon: '🔀' },
]

// ─── 基础属性初始化 ──────────────────────────────────────────

export function getInitialPassRate(edu: EduLevel): number {
  const rates: Record<EduLevel, number> = {
    college:         0.30,
    bachelor_normal: 0.45,
    bachelor_211:    0.60,
    bachelor_985:    0.72,
    master:          0.65,
    phd:             0.55,
  }
  return rates[edu]
}

export function getInitialAttributes(profile: {
  edu: EduLevel
  backgrounds: Background[]
}) {
  let confidence = 50
  let stress = 20
  let anxiety = 15
  let morale = 60
  let money = 50

  // 学历调整
  if (profile.edu === 'bachelor_985') { confidence += 10; stress += 10 }
  if (profile.edu === 'phd')          { confidence += 5;  anxiety += 10 }
  if (profile.edu === 'college')      { confidence -= 10; morale += 5 }

  // 背景调整
  if (profile.backgrounds.includes('big_tech_intern'))    { confidence += 15 }
  if (profile.backgrounds.includes('financial_pressure')) { money -= 20; anxiety += 10 }
  if (profile.backgrounds.includes('cross_major'))        { confidence -= 10; anxiety += 5 }
  if (profile.backgrounds.includes('family_connections')) { money += 10 }
  if (profile.backgrounds.includes('competition_award'))  { confidence += 8 }

  return {
    confidence: Math.min(100, Math.max(0, confidence)),
    stress:     Math.min(100, Math.max(0, stress)),
    anxiety:    Math.min(100, Math.max(0, anxiety)),
    morale:     Math.min(100, Math.max(0, morale)),
    money:      Math.min(100, Math.max(0, money)),
  }
}
