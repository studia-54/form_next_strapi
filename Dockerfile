FROM node:18-alpine3.18
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/

RUN npm i -g pnpm
RUN npm install -g node-gyp
ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .

RUN chown -R node:node /opt/app

USER node

RUN pnpm config set fetch-retry-maxtimeout 600000 -g && pnpm install && pnpm build
EXPOSE 3000
CMD ["pnpm", "run", "start"]