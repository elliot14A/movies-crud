# Install dependencies only when needed
FROM node:latest AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
WORKDIR /app
COPY package.json ./
RUN yarn install

# Rebuild the source code only when needed
FROM node:latest AS builder

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline
RUN npx prisma generate

# Production image, copy all the files and run next
FROM node:latest AS runner
WORKDIR /app
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
CMD ["yarn", "start"]
