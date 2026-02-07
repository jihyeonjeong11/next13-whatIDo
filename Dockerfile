# 런타임 노드 22-alpine(경량 버전)
# FROM node:22-alpine
# # Openssl digital envelope routines::unsupported error
# ENV NODE_OPTIONS=--openssl-legacy-provider
# # app 폴더 추가
# WORKDIR /app
# # 로컬에서 디펜던시 리스트 복사
# COPY package.json yarn.lock ./
# ## node 22로 설치
# RUN yarn install
# ## 로컬 소스 코드 복사
# COPY . .
# ## 포트 3000 노출
# EXPOSE 3000
# ## 실행
# CMD ["yarn", "dev"]

# https://github.com/AnwarHossainSR/nextjs-16-template/blob/main/Dockerfile

# Use an official Node.js runtime as a base image
FROM node:20.20.0-alpine

# ENV NODE_OPTIONS=--openssl-legacy-provider

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN npm install --global pm2

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Change ownership to the non-root user
RUN chown -R node:node /usr/app

# Copy all files
COPY ./ ./

# Build app
#RUN npm run build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch app with PM2
CMD [ "pm2-runtime", "start", "npm", "--", "run", "dev" ]