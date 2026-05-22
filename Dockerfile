FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache curl

# Copy package manifest
COPY package.json ./

# Install all dependencies needed for build
RUN npm install --no-audit --no-fund

# Copy application code
COPY . .

# Build application
RUN npm run build

# Remove development dependencies after build to keep the runtime image smaller
RUN npm prune --omit=dev

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "start"]
