import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const getProjects = async () => {
  const response = await api.get("/api/projects")
  return response.data
}

export const getProjectsByType = async (type: string) => {
  const response = await api.get(`/api/projects/type/${encodeURIComponent(type)}`)
  return response.data
}

export const createProject = async (projectData: any) => {
  const response = await api.post("/api/projects", projectData)
  return response.data
}

export default api
