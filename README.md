# Jenkins Set up

## Git

### 1. git plugin 설치

> Dashboard → Jenkins 관리 → Plugins

- Available plugins : Jenkins에 설치해 사용할 수 있는 plugin 목록
- Installed plugins : 설치된 plugin 목록

### 2. Git Credential 세팅

> Dashboard → Jenkins 관리 → Credentials

- [Git credential 부분](https://velog.io/@jmyoon8/123123)  참고
- Git private key 발급
- Global credentials 에 등록( 등록 방법은 검색하면 블로그에 방법 잘 나옴)

## Jenkins Item

> Dashboard → 새로운 Item

- Pipeline project 생성
- Pipeline : Pipeline script from SCM
- SCM : Git → repo 정보 + credential 세팅
- Script Path : Jenkinsfile

## Jenkinsfile

```bash
pipeline {
     agent any

     tools {
        nodejs "nodeJS 20.16.0"
     }

     stages {
        stage("Prepare") {
            steps {
                sh "npm install -g yarn"
            }
        }
        stage("Clean Up Docker") {
            steps {
                sh '''
                    if test "`docker ps -aq --filter name=fe-docker-test`"; then
                    docker stop [container_name]
                    docker rm [container_name]
                    docker rmi [image_name]
                    fi
                '''
            }
        }
        stage("Build Docker Image") {
            steps {
                sh "yarn docker:image"
            }
        }
        stage("Run Docker Container") {
            steps {
                sh "yarn docker:run"
            }
        }
    }
}
```

# Docker Setup

> [Nextjs Example](https://github.com/vercel/next.js/tree/main/examples/with-docker)

## Dockerfile
```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile;
RUN rm -rf ./.next/cache

# Rebuild the source code only when needed
FROM base AS builder

ARG ENV_MODE

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env.$ENV_MODE ./.env.production
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
```

- **FROM** : 기반이 되는 이미지 레이어 `<이미지 이름>:<태그>`
- **MAINTAINER :** 메인테이너 정보
- **RUN :** 도커이미지가 생성되기 전에 수행할 쉘 명령어
- **VOLUME :** VOLUME은 디렉터리의 내용을 컨테이너에 저장하지 않고 호스트에 저장하도록 설정
    - 데이터 볼륨을 호스트의 특정 디렉터리와 연결하려면 docker run 명령에서 -v 옵션을 사용
    - ex) `-v /root/data:/data`
- **CMD :** 컨테이너가 시작되었을 때 실행할 실행 파일 또는 셸 스크립트
    - 해당 명령어는 DockerFile내 1회만 쓸 수 있음
- **WORKDIR :** CMD에서 설정한 실행 파일이 실행될 디렉터리
- **EXPOSE :** 호스트와 연결할 포트 번호

## Docker 명령어

- `package.json` 파일의 `script` 부분 확인

### image 생성
```shell
docker build -t [image_name] -f ./Dockerfile . --build-arg ENV_MODE=production
```

### container 생성
```shell
docker run --name [container_name] -dp 3000:3000 [image_name]
```
