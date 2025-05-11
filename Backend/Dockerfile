# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port used by backend server (e.g., 5000)
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
