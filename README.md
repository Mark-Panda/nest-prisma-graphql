# Nest项目

> Nest Prisma Graphql 可以使用指令
> prisma的指令实现通过 `prisma-nestjs-graphql` 来实现
> 切换node版本为12版本再启动

## 服务操作步骤

1. 映射 `prisma` 文件为数据库的命令 `npm run prisma:p`
2. 通过 `prisma` 文件生成代码优先的TS文件命令 `npm run prisma:g`
3. 代码格式化生成的TS文件命令 `npm run format:g`
4. 根据 `schema.prisma` 文件自动生成增删改查业务文件的脚本命令 `npm run batch`
5. 服务启动命令 `npm run start:dev account`

## 待办事项

- [ ] 合并 `prisma` 文件及其脚本
- [x] prisma客户端独立生成

## 目录结构

```text
.
├── @generated  prisma对应的GraphQL模型参数  npm run regen脚本生成
├── README.md
├── apps    多服务文件夹
│   └── account
│       ├── src
│       ├── test
│       └── tsconfig.app.json
├── config  配置文件夹
│   ├── apps
│   │   └── account.yaml
│   ├── config.jwt.yaml
│   ├── config.microservice.yaml
│   └── config.yaml
├── docker_prisma   docker文件
│   └── docker-compose.yml
├── libs    公共模块
│   ├── public-decorator  公共装饰器
│   │   ├── src
│   │   └── tsconfig.lib.json
│   ├── public-module   公共模块
│   │   ├── src
│   │   └── tsconfig.lib.json
│   └── public-tool     公共工具
│       ├── src
│       └── tsconfig.lib.json
├── logs  日志
├── nest-cli.json
├── package-lock.json
├── package.json
├── prisma  prisma模型文件夹
│   └── schema.prisma
├── services  GraphQL下CRUD的方法  npm run batch脚本生成
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tools   npm run batch 脚本实质操作的就是这个工具
│   └── index.ts
├── tsconfig.build.json
├── tsconfig.json
└── ~schema.gql
```
