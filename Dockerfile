# Use Node 16 alpine as parent image
FROM node:20-alpine

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY ./src/package.json ./src/package-lock.json ./src/

# Install dependencies
RUN cd ./src && npm install

# Copy the rest of project files into this image
COPY . .

# Expose application port
EXPOSE 8081

# Start the application
CMD cd ./src && node index.js
