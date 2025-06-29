# Use Node.js Alpine image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm typescript

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
# executes when building the image
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN pnpm build

# Start application
# executed when the container starts
CMD ["pnpm", "start"]