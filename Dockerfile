# 1. Use official Node.js base image
FROM node:lts-alpine AS deps

# 2. Set working directory
WORKDIR /app

# 3. Install dependencies (optimizes caching for node_modules)
COPY package.json package-lock.json ./
RUN npm ci

# 4. Copy remaining files
COPY . .

# 5. Build Next.js assets
RUN npm run build

# 6. Production image, copy only necessary files
FROM node:lts-alpine AS runner
WORKDIR /app

COPY --from=deps /app/.next ./.next
COPY --from=deps /app/public ./public
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/next.config.js ./next.config.js
COPY --from=deps /app/tailwind.config.js ./tailwind.config.js
COPY --from=deps /app/postcss.config.js ./postcss.config.js
COPY --from=deps /app/tsconfig.json ./tsconfig.json

# 7. Expose the port Next.js runs on
EXPOSE 3000

# 8. Start the Next.js production server
CMD ["npm", "start"]
