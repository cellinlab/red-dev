import React, { useState } from "react"
import { useMutation } from "react-query"
import { Project } from "../types"
import { createProject } from "../services/api"

const projectTypes = ["社交/社区", "电商/零售/生活服务", "文娱/游戏", "金融/支付", "设计/办公", "B2B", "营销", "医疗/医药/生物", "汽车/智能座舱/自动驾驶", "科研/教育/培训", "法律/咨询/知识服务", "政务/环境/公共服务", "能源/工业", "硬件", "其他方向"]

const ProjectSubmit: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: projectTypes[0],
    projectUrl: "",
    socialLinks: [{ type: "", url: "" }],
  })

  const mutation = useMutation(createProject, {
    onSuccess: () => {
      alert("项目提交成功！")
      setFormData({
        name: "",
        description: "",
        type: projectTypes[0],
        projectUrl: "",
        socialLinks: [{ type: "", url: "" }],
      })
    },
    onError: () => {
      alert("提交失败，请重试")
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(formData)
  }

  const handleSocialLinkChange = (index: number, field: "type" | "url", value: string) => {
    const newSocialLinks = [...formData.socialLinks]
    newSocialLinks[index] = { ...newSocialLinks[index], [field]: value }
    setFormData({ ...formData, socialLinks: newSocialLinks })
  }

  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [...formData.socialLinks, { type: "", url: "" }],
    })
  }

  const removeSocialLink = (index: number) => {
    const newSocialLinks = formData.socialLinks.filter((_, i) => i !== index)
    setFormData({ ...formData, socialLinks: newSocialLinks })
  }

  return (
    <div className="mt-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-pixel text-xhs-black mb-8 text-center">提交你的项目</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-pixel text-sm text-xhs-black mb-2">项目名称</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="pixel-input" placeholder="给你的项目起个名字" />
        </div>

        <div>
          <label className="block font-pixel text-sm text-xhs-black mb-2">项目描述</label>
          <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="pixel-input min-h-[100px]" placeholder="详细介绍你的项目" />
        </div>

        <div>
          <label className="block font-pixel text-sm text-xhs-black mb-2">项目类型</label>
          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="pixel-input">
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-pixel text-sm text-xhs-black mb-2">项目链接</label>
          <input type="url" required value={formData.projectUrl} onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })} className="pixel-input" placeholder="https://github.com/your-project" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block font-pixel text-sm text-xhs-black">社交链接</label>
            <button type="button" onClick={addSocialLink} className="pixel-button text-xs">
              添加链接
            </button>
          </div>
          <div className="space-y-4">
            {formData.socialLinks.map((link, index) => (
              <div key={index} className="flex gap-4">
                <input type="text" value={link.type} onChange={(e) => handleSocialLinkChange(index, "type", e.target.value)} className="pixel-input flex-1" placeholder="平台名称" />
                <input type="url" value={link.url} onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)} className="pixel-input flex-1" placeholder="链接地址" />
                {formData.socialLinks.length > 1 && (
                  <button type="button" onClick={() => removeSocialLink(index)} className="px-3 py-2 text-xhs-pink hover:text-red-600">
                    删除
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button type="submit" disabled={mutation.isLoading} className="pixel-button">
            {mutation.isLoading ? "提交中..." : "提交项目"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProjectSubmit
