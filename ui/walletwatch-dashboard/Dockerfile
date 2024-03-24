# Use an official Node.js image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml for pnpm install
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Expose the port that the development server runs on
EXPOSE 3000

# Start the development server
CMD ["pnpm", "run", "dev"]
