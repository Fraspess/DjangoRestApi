# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# Copy all source code
COPY . .

# Build production assets
ARG BASE_URL
ENV VITE_API_BASE_URL=$BASE_URL
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy only built assets
COPY --from=builder /app/dist ./dist

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 8080

# Serve built files
CMD ["serve", "-s", "dist", "-l", "8080"]
