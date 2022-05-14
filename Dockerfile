FROM node:16.14.2-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ./prisma ./prisma
COPY ./dist ./dist

RUN \
    npm config set registry https://registry.npmmirror.com && \
    npm install --production && \
    npm i -g prisma@3.10.0 && \
    prisma generate 


WORKDIR /app
CMD [ "npm", "run", "start:prod" ]

EXPOSE 3100

