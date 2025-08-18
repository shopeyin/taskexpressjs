FROM node:24-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]