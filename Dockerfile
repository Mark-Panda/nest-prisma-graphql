FROM node:16.14.2 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

# RUN npm run build

# FROM node:16.14.2

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist

EXPOSE 3100
CMD [ "npm", "run", "start:dev" ]
# CMD [ "npm", "run", "start:prod" ]