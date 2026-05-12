# ─────────────────────────────────────────────────────────────
# 1. Build Stage
# ─────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first for better caching
COPY frontend/package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY frontend/ .

# Build frontend
RUN npm run build


# ─────────────────────────────────────────────────────────────
# 2. Production Nginx Stage
# ─────────────────────────────────────────────────────────────
FROM nginx:1.27-alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx config
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copy frontend build
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]