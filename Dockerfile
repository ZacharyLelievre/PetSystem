FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment variable to resolve the OpenSSL issue
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build the React app
RUN npm run build

# Serve the app using a simple server
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["serve", "-s", "build"]