import React, { useState } from "react"
import { useQuery } from "react-query"
import { Project } from "../types"
import { getProjects, getProjectsByType } from "../services/api"

const projectTypes = ["社交/社区", "电商/零售/生活服务", "文娱/游戏", "金融/支付", "设计/办公", "B2B", "营销", "医疗/医药/生物", "汽车/智能座舱/自动驾驶", "科研/教育/培训", "法律/咨询/知识服务", "政务/环境/公共服务", "能源/工业", "硬件", "其他方向"]

const ProjectList: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("")

  const { data: projects, isLoading } = useQuery(["projects", selectedType], () => (selectedType ? getProjectsByType(selectedType) : getProjects()), {
    staleTime: 1000 * 60 * 5, // 5分钟缓存
  })

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "twitter":
        return "🐦"
      case "wechat":
        return "💬"
      case "xiaohongshu":
        return "📱"
      default:
        return "🔗"
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xhs-pink animate-pulse font-pixel">加载中...</div>
      </div>
    )
  }

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-pixel text-xhs-black mb-8 text-center">发现精彩项目</h1>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedType("")}
            className={`px-4 py-2 rounded-full text-sm transition-colors
              ${selectedType === "" ? "bg-xhs-pink text-white" : "bg-white text-xhs-gray hover:bg-xhs-light-pink hover:text-xhs-pink"} 
              border border-xhs-pink`}
          >
            全部
          </button>
          {projectTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-sm transition-colors
                ${selectedType === type ? "bg-xhs-pink text-white" : "bg-white text-xhs-gray hover:bg-xhs-light-pink hover:text-xhs-pink"} 
                border border-xhs-pink`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <div key={project.id} className="pixel-card group">
              <h2 className="font-pixel text-lg text-xhs-black mb-4">{project.name}</h2>
              <p className="text-xhs-gray mb-4 line-clamp-3">{project.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="inline-block px-3 py-1 bg-xhs-light-pink text-xhs-pink text-sm rounded-full">{project.type}</span>
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="pixel-button text-xs">
                  查看项目
                </a>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex space-x-4">
                  {project.socialLinks.map((link) => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="text-xhs-gray hover:text-xhs-pink transition-colors">
                      {link.type}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectList
