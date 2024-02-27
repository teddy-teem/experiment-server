# Use Node 16 alpine as parent image
FROM node:20-alpine

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY . .

# Install dependencies
RUN npm install

# Copy the rest of project files into this image
# Expose application port
EXPOSE 8082

# Start the application
CMD  node index.js
