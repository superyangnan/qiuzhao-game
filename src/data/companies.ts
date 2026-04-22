import type { Company } from '../types/game'

export const COMPANIES: Company[] = [
  // ── S级 ────────────────────────────────────────────────────────
  { id: 'bytedance',  name: '字节跳动',   tier: 'S', industry: 'internet',  salaryRange: [28, 60], rounds: 5, basePassRate: 0.08 },
  { id: 'tencent',    name: '腾讯',       tier: 'S', industry: 'internet',  salaryRange: [25, 55], rounds: 5, basePassRate: 0.08 },
  { id: 'alibaba',    name: '阿里巴巴',   tier: 'S', industry: 'internet',  salaryRange: [25, 55], rounds: 5, basePassRate: 0.10 },
  { id: 'huawei',     name: '华为',       tier: 'S', industry: 'hardware',  salaryRange: [22, 50], rounds: 4, basePassRate: 0.12 },
  { id: 'meituan',    name: '美团',       tier: 'S', industry: 'internet',  salaryRange: [22, 48], rounds: 4, basePassRate: 0.10 },
  { id: 'baidu',      name: '百度',       tier: 'S', industry: 'internet',  salaryRange: [20, 45], rounds: 4, basePassRate: 0.12 },

  // ── A级 ────────────────────────────────────────────────────────
  { id: 'jd',         name: '京东',       tier: 'A', industry: 'ecommerce', salaryRange: [18, 38], rounds: 4, basePassRate: 0.15 },
  { id: 'didi',       name: '滴滴',       tier: 'A', industry: 'internet',  salaryRange: [18, 38], rounds: 4, basePassRate: 0.15 },
  { id: 'netease',    name: '网易',       tier: 'A', industry: 'gaming',    salaryRange: [18, 40], rounds: 4, basePassRate: 0.18 },
  { id: 'kuaishou',   name: '快手',       tier: 'A', industry: 'internet',  salaryRange: [20, 42], rounds: 4, basePassRate: 0.14 },
  { id: 'pinduoduo',  name: '拼多多',     tier: 'A', industry: 'ecommerce', salaryRange: [22, 50], rounds: 3, basePassRate: 0.12, specialEvent: 'C-STRESS-PDD' },
  { id: 'xiaohongshu',name: '小红书',     tier: 'A', industry: 'internet',  salaryRange: [18, 38], rounds: 4, basePassRate: 0.15 },
  { id: 'ant',        name: '蚂蚁集团',   tier: 'A', industry: 'fintech',   salaryRange: [20, 45], rounds: 4, basePassRate: 0.12 },

  // ── B级 ────────────────────────────────────────────────────────
  { id: 'ctrip',      name: '携程',       tier: 'B', industry: 'travel',    salaryRange: [14, 28], rounds: 3, basePassRate: 0.25 },
  { id: 'boss',       name: 'BOSS直聘',   tier: 'B', industry: 'hr_tech',   salaryRange: [12, 25], rounds: 3, basePassRate: 0.28 },
  { id: 'vivo',       name: 'vivo',       tier: 'B', industry: 'hardware',  salaryRange: [13, 28], rounds: 3, basePassRate: 0.25 },
  { id: 'oppo',       name: 'OPPO',       tier: 'B', industry: 'hardware',  salaryRange: [13, 28], rounds: 3, basePassRate: 0.25 },
  { id: 'xiaomi',     name: '小米',       tier: 'B', industry: 'hardware',  salaryRange: [15, 32], rounds: 3, basePassRate: 0.22 },
  { id: 'dxy',        name: '丁香园',     tier: 'B', industry: 'health',    salaryRange: [12, 25], rounds: 3, basePassRate: 0.28 },
  { id: 'toutiao',    name: '今日头条',   tier: 'B', industry: 'media',     salaryRange: [14, 28], rounds: 3, basePassRate: 0.25 },

  // ── C级 ────────────────────────────────────────────────────────
  { id: 'state_bank',   name: '国有银行（分支）',   tier: 'C', industry: 'banking',    salaryRange: [8, 18],  rounds: 3, basePassRate: 0.35 },
  { id: 'state_grid',   name: '国家电网',           tier: 'C', industry: 'energy',     salaryRange: [8, 16],  rounds: 3, basePassRate: 0.30 },
  { id: 'local_soe',    name: '地方国企',           tier: 'C', industry: 'various',    salaryRange: [7, 15],  rounds: 2, basePassRate: 0.40 },
  { id: 'consulting_sm',name: '中小咨询公司',       tier: 'C', industry: 'consulting', salaryRange: [8, 18],  rounds: 3, basePassRate: 0.38 },
  { id: 'big4',         name: '四大会计师事务所',   tier: 'C', industry: 'accounting', salaryRange: [7, 16],  rounds: 3, basePassRate: 0.32 },

  // ── D级 ────────────────────────────────────────────────────────
  { id: 'outsourcing',  name: '外包公司',           tier: 'D', industry: 'outsource',  salaryRange: [6, 12],  rounds: 1, basePassRate: 0.70 },
  { id: 'sales',        name: '销售类岗位',         tier: 'D', industry: 'sales',      salaryRange: [4, 15],  rounds: 1, basePassRate: 0.80 },
  { id: 'small_startup',name: '小型初创公司',       tier: 'D', industry: 'startup',    salaryRange: [7, 20],  rounds: 2, basePassRate: 0.55 },
]

// 按专业方向推荐公司
export const MAJOR_COMPANY_MAP: Record<string, string[]> = {
  cs:           ['bytedance', 'tencent', 'alibaba', 'huawei', 'meituan', 'baidu', 'jd', 'didi', 'netease', 'kuaishou', 'pinduoduo', 'xiaohongshu', 'ant', 'ctrip', 'vivo', 'oppo', 'xiaomi'],
  electronics:  ['huawei', 'vivo', 'oppo', 'xiaomi', 'baidu'],
  civil:        ['local_soe', 'state_grid', 'consulting_sm'],
  biology:      ['dxy', 'small_startup'],
  math:         ['ant', 'baidu', 'tencent', 'bytedance'],
  finance:      ['ant', 'big4', 'state_bank', 'consulting_sm'],
  accounting:   ['big4', 'state_bank', 'local_soe'],
  business:     ['alibaba', 'jd', 'meituan', 'xiaohongshu', 'ctrip'],
  trade:        ['alibaba', 'jd'],
  law:          ['consulting_sm', 'local_soe'],
  chinese:      ['toutiao', 'xiaohongshu', 'boss'],
  history:      ['consulting_sm', 'local_soe', 'small_startup'],
  foreign_lang: ['consulting_sm', 'ctrip'],
  medicine:     ['dxy', 'local_soe'],
  nursing:      ['dxy', 'local_soe'],
}
