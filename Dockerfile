# Use the official Node.js image from Docker Hub
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files into the container
COPY . .

COPY .env .env

# Expose the port the app will run on
EXPOSE 3000

# Run the Next.js development server
CMD ["npm", "run", "dev"]
