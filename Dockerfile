FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json yarn.lock tsconfig.json ./
RUN npm install --immutable

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV production

RUN apk add curl

COPY --from=builder /app/node_modules/ ./node_modules/
COPY --from=builder /app/dist/ ./dist/
COPY --from=builder /app/src/ ./src/
COPY --from=builder app/package*.json app/yarn.lock app/tsconfig.json app/nest-cli.json ./

CMD ["node", "dist/main.js"]