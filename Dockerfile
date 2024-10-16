# Use Node.js 22 as the base image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Add build argument for NODE_ENV
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .

# Build your app
RUN pnpm run build

# Expose the port your app runs on
EXPOSE ${PORT:-4000}

# Run your app
CMD ["pnpm", "start"]
