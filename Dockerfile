# ==============================
# Stage 1: Build Stage
# ==============================
# Use a small Node.js image for building
FROM node:24-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./

# Install only production dependencies (faster & smaller)
RUN npm ci --only=production

# Copy the rest of the application source code
COPY . .

# ==============================
# Stage 2: Production Stage
# ==============================
# Use a fresh small Node.js image for runtime
FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy production dependencies and source from builder stage
COPY --from=builder /app ./

# Expose port (match your app)
EXPOSE 3000

# Use environment variable for NODE_ENV
ENV NODE_ENV=production

# Start the app
CMD ["node", "server.js"]
