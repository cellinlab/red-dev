export interface SocialLink {
  id?: number
  type: string
  url: string
}

export interface Project {
  id?: number
  name: string
  description: string
  type: string
  projectUrl: string
  socialLinks: SocialLink[]
  createdAt?: Date
  updatedAt?: Date
}

export type ProjectFormData = Omit<Project, "id" | "createdAt" | "updatedAt">

export type ProjectType = "社交/社区" | "电商/零售/生活服务" | "文娱/游戏" | "金融/支付" | "设计/办公" | "B2B" | "营销" | "医疗/医药/生物" | "汽车/智能座舱/自动驾驶" | "科研/教育/培训" | "法律/咨询/知识服务" | "政务/环境/公共服务" | "能源/工业" | "硬件" | "其他方向"
