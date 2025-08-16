# Use official Node.js LTS image
FROM node:24-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install 


# Copy the rest of the app
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Environment variables will be passed during run
CMD ["node", "server.js"]
