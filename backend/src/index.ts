import express, { Request, Response } from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
import { body, validationResult } from "express-validator"

const prisma = new PrismaClient()
const app = express()

// 配置 CORS
app.use(
  cors({
    origin: "*", // 允许前端域名访问
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
)

app.use(express.json())

// 获取所有项目
app.get("/api/projects", async (_req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        socialLinks: true,
      },
    })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: "获取项目列表失败" })
  }
})

// 按类型获取项目
app.get("/api/projects/type/:type", async (req: Request, res: Response) => {
  try {
    const { type } = req.params
    const projects = await prisma.project.findMany({
      where: {
        type,
      },
      include: {
        socialLinks: true,
      },
    })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: "获取项目列表失败" })
  }
})

// 创建新项目
app.post(
  "/api/projects",
  [
    body("name").notEmpty().withMessage("项目名称不能为空"),
    body("description").notEmpty().withMessage("项目描述不能为空"),
    body("type").notEmpty().withMessage("项目类型不能为空"),
    body("projectUrl").isURL().withMessage("项目链接必须是有效的URL"),
    body("socialLinks").isArray().withMessage("社交链接必须是数组"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { name, description, type, projectUrl, socialLinks } = req.body
      const project = await prisma.project.create({
        data: {
          name,
          description,
          type,
          projectUrl,
          socialLinks: {
            create: socialLinks,
          },
        },
        include: {
          socialLinks: true,
        },
      })
      res.status(201).json(project)
    } catch (error) {
      res.status(500).json({ error: "创建项目失败" })
    }
  }
)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})
