FROM node:16.15.0-slim AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:16.15.0-slim
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/styles ./styles
COPY --from=builder /app/.next ./.next
ENV PORT 80
EXPOSE 80
CMD ["npm", "start"]