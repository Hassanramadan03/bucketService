# Use the official Node.js v14 image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port your Node.js application listens on (e.g., 3000)
EXPOSE 3000

# Start the Node.js application
CMD ["node", "app.js"]
