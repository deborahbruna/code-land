## Build UI - React
FROM node:lts-slim AS ui-build

COPY client/ /usr/src/app/client

WORKDIR /usr/src/app/client
RUN npm install && npm run build

## Server build
FROM node:16-alpine AS server-build

COPY server/ /usr/src/app/server
COPY --from=ui-build /usr/src/app/client/build/* /usr/src/app/server/public/client/build/

WORKDIR /usr/src/app/server
COPY package*.json ./

RUN npm ci

EXPOSE 3000

CMD ["node", "bin/www"]