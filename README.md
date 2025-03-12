# 独立开发者大赛项目导航

一个用于展示和提交独立开发者大赛参赛作品的导航平台。采用赛博朋克风格设计，提供项目展示和提交功能。

## 技术栈

- 前端：React + TypeScript + Tailwind CSS
- 后端：Express + TypeScript + Prisma
- 数据库：PostgreSQL
- 部署：Docker Compose

## 功能特点

- 赛博朋克风格的 UI 设计
- 项目分类展示
- 项目提交功能
- 支持多个社交媒体链接
- 响应式设计

## 开发环境设置

1. 克隆项目：

```bash
git clone <repository-url>
cd project-name
```

2. 启动开发环境：

```bash
docker-compose up
```

3. 初始化数据库：

```bash
docker-compose exec backend pnpm prisma migrate dev
```

## 访问应用

- 前端：http://localhost:3000
- 后端 API：http://localhost:5000
- 数据库：localhost:5432

## API 文档

### 获取所有项目

```
GET /api/projects
```

### 按类型获取项目

```
GET /api/projects/type/:type
```

### 提交新项目

```
POST /api/projects
Content-Type: application/json

{
  "name": "项目名称",
  "description": "项目描述",
  "type": "项目类型",
  "projectUrl": "项目地址",
  "socialLinks": [
    {
      "type": "twitter",
      "url": "https://twitter.com/..."
    }
  ]
}
```

## 项目类型

- 社交/社区
- 电商/零售/生活服务
- 文娱/游戏
- 金融/支付
- 设计/办公
- B2B
- 营销
- 医疗/医药/生物
- 汽车/智能座舱/自动驾驶
- 科研/教育/培训
- 法律/咨询/知识服务
- 政务/环境/公共服务
- 能源/工业
- 硬件
- 其他方向

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT
