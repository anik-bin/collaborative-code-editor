# ==========================================
# STAGE 1: Install Dependencies
# ==========================================
FROM node:20-alpine AS deps
# libc6-compat is required for some Node packages on Alpine Linux
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files and install precisely what is in package-lock.json
COPY package.json package-lock.json* ./
RUN npm ci

# ==========================================
# STAGE 2: Build the Application
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry for faster builds
ENV NEXT_TELEMETRY_DISABLED=1

# Catch the environment variables passed from docker-compose
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WS_URL

# Bake those variables into the Next.js production build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

# Compile the standalone app
RUN npm run build

# ==========================================
# STAGE 3: Production Runner (The Final Image)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# SECURITY: Create a restricted user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy ONLY the optimized standalone files and public assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the restricted user
USER nextjs

EXPOSE 3000
ENV PORT=3000
# Ensure Next.js listens on all network interfaces inside Docker
ENV HOSTNAME="0.0.0.0"

# Start the optimized Node server
CMD ["node", "server.js"]