FROM node:20-alpine

WORKDIR /app

# 全局安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml (如果存在)
COPY package.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install

# 复制其余文件
COPY . .

# 生成 Prisma 客户端
RUN pnpm prisma generate

# 暴露端口
EXPOSE 5000

# 启动开发服务器
CMD ["pnpm", "dev"] 