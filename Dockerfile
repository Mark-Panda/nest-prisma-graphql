FROM node:18.4.0-alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY ./prisma ./prisma
COPY ./dist ./dist

# bcrypt ->　make build-base
# 只有v3.4还有python2
# sed -i 's/v3.15/v3.4/g' /etc/apk/repositories && \
# node-gyp@9.0.0支持node16+
RUN \
    sed -i "s/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g" /etc/apk/repositories && \
    apk --update --no-cache add python3 make build-base && \
    npm config set registry https://registry.npmmirror.com && \
    npm install -g node-gyp@9.0.0 && \
    npm install --production --unsafe-perm && \
    npm i -g prisma@3.14.0 && \
    prisma generate && \
    apk del python3 make build-base 


WORKDIR /app
CMD [ "npm", "run", "start:prod" ]

EXPOSE 3100

