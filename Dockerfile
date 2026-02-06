# 런타임 노드 22-alpine(경량 버전)
FROM node:22-alpine
# Openssl digital envelope routines::unsupported error
ENV NODE_OPTIONS=--openssl-legacy-provider
# app 폴더 추가
WORKDIR /app
# 로컬에서 디펜던시 리스트 복사
COPY package.json yarn.lock ./
## node 22로 설치
RUN yarn install
## 로컬 소스 코드 복사
COPY . .
## 포트 3000 노출
EXPOSE 3000
## 실행
CMD ["yarn", "dev"]