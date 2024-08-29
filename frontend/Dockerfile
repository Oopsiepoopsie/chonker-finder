# Dockerfile for Vite frontend

# Use an official Node.js image as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN --mount=type=secret,id=env_local_file,target=/frontend/.env.local \
    npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
# RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Run the app
# CMD ["npm", "run", "preview"]
CMD [ "npm", "run", "dev" ]
