FROM node:22-alpine
# Openssl digital envelope routines::unsupported error
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY package.json yarn.lock source.config.ts next.config.mjs ./
RUN --mount=type=cache,id=yarn,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile
# https://github.com/vercel/next.js/issues/71622
COPY . .
EXPOSE 3000
CMD ["yarn", "dev:docker"]