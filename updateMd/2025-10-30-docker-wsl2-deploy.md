# keru_blog WSL2 + Docker Compose 部署方案（前台 frontEnd、管理端 management、后端 server）

- 作者: Cascade
- 日期: 2025-10-30
- 适用环境: Windows 10/11 + WSL2 + Docker Desktop
- 目标: 在 WSL2 内通过 Docker Compose 本地部署三套服务（前台/管理端/后端），并连通 MySQL + Redis，完成 API、WebSocket、静态资源、上传/生成 PDF 的一体化验证。

## 1. 现状核对（来自仓库事实）

- 后端入口: `server/main.ts`，全局路由前缀固定为 `/api`（通过 `InversifyExpressServer(..., { rootPath: '/api' })`）。静态目录挂载：`/static`（上传/最终文件）、`/temp`（临时 PDF）。
- 端口配置: `server/src/config/app.config.ts`
  - 默认 `PORT=5566`、`HOST=localhost`、`CORS_ORIGIN` 默认包含 `http://localhost:9394`（前台开发口）
  - 数据库校验强制 MySQL 连接串：`validateConfig()` 仅接受 `mysql://...`
- Prisma 数据源: `server/prisma/schema.prisma` 指明 `provider = "mysql"`
- 前台 Vite 开发代理: `frontEnd/vite.config.ts` 使用 `createViteProxy(true, 'dev', '/dev-api')`
  - 生产构建变量：`frontEnd/.env.production` 中 `VITE_API_BASE_URL` 留空，建议在生产中设为 `/api`
- 管理端 Vite 开发代理: `management/vite.config.ts` 中定义 `/management-api` 代理到 `http://127.0.0.1:5566/api`
  - 运行时代码读取 `import.meta.env.VITE_MANAGEMENT_API_URL || '/management-api'`
- PDF Worker：
  - 前台 `public/` 存在 `pdf.worker.min.mjs` 与 `pdf-worker-setup.js`
  - `.env.production` 写的是 `VITE_PDF_WORKER_URL=/static/JS/pdf.worker.min.js`（可能与现有 `public` 文件名/路径不一致）

> 结论：后端使用 MySQL + Redis；前后端生产环境建议同域反代到后端 `/api`，以减少 CORS；WebSocket 走同域 `/socket.io` 需要在 Nginx 开启 Upgrade/Connection；PDF Worker 建议走前端静态 `/pdf.worker.min.mjs` 或明确由后端 `/static/JS/**` 提供（需二选一，保持一致）。

## 2. 架构与端口规划

- 服务组成：`mysql`、`redis`、`server`、`web_front`（前台 Nginx）、`web_admin`（管理端 Nginx）
- 端口暴露：
  - `server`: 5566（不对外暴露亦可，仅被 Nginx 内网访问）
  - `web_front`: 8080 -> Nginx 80
  - `web_admin`: 8081 -> Nginx 80
  - `mysql`: 3306（本地联调可暴露；纯容器内可不暴露）
  - `redis`: 6379（本地联调可暴露；纯容器内可不暴露）

```mermaid
flowchart LR
  A[web_front (Nginx:8080)] -->|/api,/socket.io,/static,/temp| S[server:5566]
  B[web_admin (Nginx:8081)] -->|/management-api->/api, /socket.io| S
  S -->|Prisma| M[(MySQL:3306)]
  S -->|ioredis| R[(Redis:6379)]
```

## 3. docker-compose.yml（示例）

> 放置位置建议：仓库根目录。首次仅作为 PoC/测试；如需生产可进一步加健康检查、资源限制、监控等。

```yaml
version: "3.9"

services:
  mysql:
    image: mysql:8.0
    container_name: keru_mysql
    environment:
      MYSQL_ROOT_PASSWORD: rootpass
      MYSQL_DATABASE: keru_blog
      TZ: Asia/Shanghai
    ports:
      - "3306:3306" # 可选：仅本地调试需要
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - keru_net

  redis:
    image: redis:7-alpine
    container_name: keru_redis
    ports:
      - "6379:6379" # 可选
    networks:
      - keru_net

  server:
    build:
      context: .
      dockerfile: server/Dockerfile
    container_name: keru_server
    env_file:
      - server/.env.docker
    depends_on:
      - mysql
      - redis
    volumes:
      - server_static:/app/server/static
      - server_logs:/app/server/logs
      - server_temp:/app/server/temp
    networks:
      - keru_net
    # 如需直接调试后端，可暴露端口；生产可不暴露，仅供 Nginx 内部访问
    ports:
      - "5566:5566" # 可选

  web_front:
    build:
      context: .
      dockerfile: frontEnd/Dockerfile
    container_name: keru_web_front
    depends_on:
      - server
    ports:
      - "8080:80"
    networks:
      - keru_net

  web_admin:
    build:
      context: .
      dockerfile: management/Dockerfile
    container_name: keru_web_admin
    depends_on:
      - server
    ports:
      - "8081:80"
    networks:
      - keru_net

volumes:
  mysql_data:
  server_static:
  server_logs:
  server_temp:

networks:
  keru_net:
    driver: bridge
```

## 4. 后端 server/Dockerfile（示例）

> 说明：当前仓库没有标准 build（ts->js）流程，开发阶段使用 `tsx`/`ts-node` 直跑。生产更建议补充 `tsc` 编译与路径映射（tsconfig-paths/alias）后 `node dist/main.js`。本 PoC 采用 `ts-node/esm` 以最小改动直跑。

```dockerfile
# server/Dockerfile
FROM node:20-bookworm-slim AS base
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# 拷贝 monorepo（server 依赖根锁文件、prisma 等）
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY server ./server
COPY shared ./shared

# 安装依赖（仅 server 子包所需依赖）
RUN pnpm fetch && pnpm -C server install --frozen-lockfile

# Prisma 生成客户端
WORKDIR /app/server
RUN npx prisma generate

# 暴露端口
EXPOSE 5566

# 启动命令：若有迁移历史，优先 deploy；否则回退 db push
CMD sh -c "\
  (npx prisma migrate deploy || npx prisma db push) && \
  node --loader ts-node/esm main.ts"
```

> 如遇 `ts-node/esm` 兼容问题，可改为安装 `tsx`：`npm i -g tsx` 并用 `tsx main.ts` 启动；或补充 `tsc` 编译流程并用纯 JS 启动。

## 5. 前台 frontEnd/Dockerfile + Nginx 配置（示例）

- 生产推荐将 `VITE_API_BASE_URL` 设为 `/api`，通过 Nginx 转发到 `server:5566/api`，避免 CORS。
- PDF Worker 路径建议直接使用 `public/pdf.worker.min.mjs`：`VITE_PDF_WORKER_URL=/pdf.worker.min.mjs`

```dockerfile
# frontEnd/Dockerfile
FROM node:20-bookworm-slim AS builder
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /build
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY frontEnd ./frontEnd
COPY shared ./shared
# 设置生产构建环境变量（也可在命令行 --build-arg 注入）
ARG VITE_API_BASE_URL=/api
ARG VITE_PDF_WORKER_URL=/pdf.worker.min.mjs
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_PDF_WORKER_URL=$VITE_PDF_WORKER_URL
RUN pnpm fetch && pnpm -C frontEnd install --frozen-lockfile
RUN pnpm -C frontEnd run build:pro

FROM nginx:1.27-alpine AS runner
COPY frontEnd/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/frontEnd/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- `frontEnd/nginx.conf` 示例（同域代理后端 + WebSocket + 静态透传）：

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  # 前端静态
  location / {
    try_files $uri $uri/ /index.html;
  }

  # API 反向代理 -> server
  location /api/ {
    proxy_pass http://keru_server:5566/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  # WebSocket 反代
  location /socket.io/ {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_pass http://keru_server:5566/socket.io/;
  }

  # 透传后端静态/临时文件
  location /static/ {
    proxy_pass http://keru_server:5566/static/;
  }
  location /temp/ {
    proxy_pass http://keru_server:5566/temp/;
  }
}
```

## 6. 管理端 management/Dockerfile + Nginx 配置（示例）

- 运行时代码读取 `VITE_MANAGEMENT_API_URL || '/management-api'`，我们在 Nginx 将 `/management-api` 重写到后端 `/api`。

```dockerfile
# management/Dockerfile
FROM node:20-bookworm-slim AS builder
ENV PNPM_HOME=/root/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /build
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY management ./management
COPY shared ./shared
# 可按需注入其他 VITE_* 变量
RUN pnpm fetch && pnpm -C management install --frozen-lockfile
RUN pnpm -C management run build:pro

FROM nginx:1.27-alpine AS runner
COPY management/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build/management/dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

- `management/nginx.conf` 示例：

```nginx
server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # 管理端专用前缀 -> 后端 /api
  location /management-api/ {
    proxy_pass http://keru_server:5566/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  # WebSocket（如管理端也使用）
  location /socket.io/ {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "Upgrade";
    proxy_pass http://keru_server:5566/socket.io/;
  }
}
```

## 7. 后端环境变量文件 `server/.env.docker`（示例）

```env
# 服务器
NODE_ENV=production
HOST=0.0.0.0
PORT=5566

# MySQL（Prisma 要求 mysql://）
DATABASE_URL=mysql://root:rootpass@keru_mysql:3306/keru_blog

# Redis
REDIS_HOST=keru_redis
REDIS_PORT=6379
REDIS_DB=0

# JWT
JWT_SECRET=please-change-me
JWT_EXPIRES_IN=7d

# CORS（若全部走 Nginx 同域，可留空或不严格限制；
# 如需直连 server 供调试，这里给出本地端口）
CORS_ORIGIN=http://localhost:8080,http://127.0.0.1:8080,http://localhost:8081,http://127.0.0.1:8081

# 上传
UPLOAD_DIR=static
MAX_FILE_SIZE=50mb

# WebRTC/WS 等
MAX_WEBSOCKET_CONNECTIONS=1000
WEBRTC_STUN_SERVERS=stun:stun.l.google.com:19302
```

## 8. 前端与管理端构建环境变量（建议）

- 前台 `VITE_API_BASE_URL=/api`
- 前台 `VITE_PDF_WORKER_URL=/pdf.worker.min.mjs`（如改为走后端 `/static/JS/...`，需确保该路径存在并同步修改）
- 管理端（可不显式设置）：`VITE_MANAGEMENT_API_URL=/management-api`

> 可通过 Dockerfile 中 `ARG/ENV` 注入，也可在构建前写入对应 `.env.production`。

## 9. WSL2 环境准备与运行步骤

1) 安装 Docker Desktop 并启用 WSL2 Integration（选择你使用的发行版，如 Ubuntu）。
2) 在 WSL shell 中进入仓库根目录（建议使用 WSL 的 Linux 路径，避免跨盘 I/O 性能问题）。
3) 准备文件：
   - `server/.env.docker`（参考上节）
   - `frontEnd/nginx.conf`、`management/nginx.conf`（参考上文）
   - 根目录 `docker-compose.yml`（参考上文）
4) 首次运行：
   - 构建并启动：`docker compose up -d --build`
5) 验证：
   - 前台：http://localhost:8080
   - 管理端：http://localhost:8081
   - 接口代理：打开浏览器开发者工具，确认 `/api/**`、`/management-api/**` 返回 200
   - WebSocket：确认 `/socket.io` 握手成功（网络面板 -> WS）
   - 静态/临时文件：访问 `http://localhost:8080/static/...`、`/temp/...` 是否透传到后端

## 10. 常见问题与排错

- Prisma 迁移
  - 如仓库包含迁移历史，`migrate deploy` 会自动应用；若无历史但需快速起表，回退到 `prisma db push`。
  - 容器重建后如表结构有更新，建议先执行 `migrate diff`/`migrate dev` 生成迁移，再 `deploy`。
- PDF Worker 路径
  - 二选一：
    1) 前端静态：`VITE_PDF_WORKER_URL=/pdf.worker.min.mjs`，无需经过后端；
    2) 后端静态：`/static/JS/pdf.worker.min.js`，需保证该文件随后端镜像存在（或构建时复制）。
- WebSocket 502/握手失败
  - 确保 Nginx location `/socket.io` 设置 `Upgrade/Connection` 头，且代理到 `keru_server:5566`。
- CORS 报错
  - 优先同域代理方案；如直连后端，需在 `CORS_ORIGIN` 添加实际访问域名与端口。
- `sharp`/`puppeteer-core` 依赖
  - 选择 `node:bookworm-slim` 通常可用预编译二进制；若仍报错，可在镜像中安装必要的系统依赖或提供外部 Chrome（`puppeteer-core` 需 `executablePath`）。
- Windows/WSL2 文件权限
  - 挂载卷如报权限异常，考虑改为命名卷（如本方案）或在 WSL 内路径下运行。

## 11. 优化与下一步

- 生产化建议
  - 给 server 增加编译产物（`tsc`）与路径别名解析（`tsconfig-paths`）后用纯 JS 启动。
  - 增加健康检查、资源限制、日志收集（ELK/EFK）、监控（Prometheus + Grafana）。
  - 统一网关：可用单一 Nginx 映射两个前端站点到不同子路径/子域。
- Monorepo 构建优化
  - 使用 `pnpm --filter` 精确安装与构建子包；或引入 Turborepo 提升构建效率。

---

## 附：快速对照表

- 后端服务口：`server:5566`（容器内网络名 `keru_server`）
- HTTP 前缀：`/api`
- Nginx 前端代理：`/api -> keru_server:5566/api`，`/socket.io -> keru_server:5566/socket.io`
- 管理端代理：`/management-api -> keru_server:5566/api`
- 静态透传：`/static`、`/temp` -> `keru_server:5566`
- 数据库：`mysql://root:rootpass@keru_mysql:3306/keru_blog`
- Redis：`keru_redis:6379`
