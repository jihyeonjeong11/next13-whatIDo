FROM node:22-alpine
# Openssl digital envelope routines::unsupported error
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
# 해당 커맨드로는 파일을 '한번' 복사하므로, compose에서 업데이트를 받을 수 있도록 변경되는 부분을 mapping 해줘야 한다.
# https://github.com/vercel/next.js/issues/71622
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]