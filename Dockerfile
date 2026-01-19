# Install dependencies if needed
FROM node:22.14.0-alpine AS deps

# Create directory and set it as working directory
WORKDIR /api

# Copy package and package-lock into working directory
COPY package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

#########################################################

# Rebuild source code if needed
FROM node:22.14.0-alpine AS builder

# Create directory and set it as working directory
WORKDIR /api

# Copy dependencies from deps stage
COPY --from=deps --chown=node /api/node_modules ./node_modules

# Copy source code
COPY . . 

# Generate prisma client
RUN npx prisma generate

# Build application
RUN npm run build

#########################################################

# Production stage
FROM node:22.14.0-alpine AS prod

# Create directory and set it as working directory
WORKDIR /api

# Copy dependencies
COPY --from=builder /api/node_modules ./node_modules

ENV PATH=/api/node_modules/.bin:$PATH

# Copy built code
COPY --from=builder --chown=node /api/dist ./

# Copy Prisma
COPY --from=builder /api/prisma ./prisma

# Copy package.json for ECMA to work (type: module)
COPY package.json .

# Expose port - which port the (service in the) container listens to
EXPOSE 3000

# Start server
CMD ["npm", "run", "start"] 