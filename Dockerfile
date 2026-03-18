# Strapi Dockerfile (Node.js 18 recommended)
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock (or package-lock.json)
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build Strapi admin panel
RUN yarn build

# Expose Strapi port (default 1337)
EXPOSE 1337

# Start Strapi
CMD ["yarn", "start"]
