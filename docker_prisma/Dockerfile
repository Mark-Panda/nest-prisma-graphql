FROM node:14.11.0 as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY ../package*.json ./
RUN npm install
COPY ./dist /usr/share/node/dist

# 开放端口
EXPOSE 3100
# 容器启动命令
CMD ["node","dist/main.js"]

