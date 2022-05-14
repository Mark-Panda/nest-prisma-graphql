# Nest项目

> Nest Prisma Graphql 可以使用指令
> prisma的指令实现通过 `prisma-nestjs-graphql` 来实现
> 切换node版本为16版本再启动

## 服务操作步骤

1. 映射 `prisma` 文件为数据库的命令 `npm run prisma:p`
2. GraphQL类型自动生成脚本 `npm run regen`
3. 根据 `schema.prisma` 文件自动生成增删改查业务文件的脚本命令 `npm run batch`
4. 服务启动命令 `npm run start:dev`

## 已有功能

- 登录鉴权
- 密码加盐加密
- Token续租
- Restful和GraphQL接口支持
- 日志切分
- swagger接口文档
- GraphQL的playground调试界面(开发环境下使用)
- 定时任务
- 简单角色权限控制
- 跨域
- 报错过滤器(restful)
- 响应拦截器(restful)
- 文件上传之分片上传
- docker打包
- 数据库连接信息和Redis的连接信息可以使用环境变量进行覆盖

## 待办事项

- [ ] 合并 `prisma` 文件及其脚本
- [ ] 任务队列
- [ ] 访问限流
- [ ] websocket集成

## 备注

> 因为有GraphQL的存在所以响应拦截器需要在restful接口的controller文件中引用，不能全局引用 报错拦截器同理, GraphQL有自己的返回类型
> 打包docker镜像时需要先build好dist文件再打包

## 代码结构树

```text
.
├── @generated  prisma生成的GraphQL类型用于在services中引用 通过npm run regen生成最新的
│   ├── prisma
│   └── user
├── Dockerfile
├── docker-compose.yml
├── logs  日志文件夹
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── commons  抽离的公共方法
│   ├── public-decorator
│   ├── public-module
│   └── public-tool
├── config  配置文件夹
│   ├── config.jwt.yaml
│   └── config.yaml
├── prisma  prisma文件夹
│   └── schema.prisma
├── prismaClient  prisma连接客户端文件夹  通过npm run prisma:g生成最新的
├── public  静态公共资源
│   ├── content
│   ├── playground-offline  playground离线版
│   └── scripts
├── services prisma生成的GraphQL的CRUD方法
│   ├── index.ts
│   └── user
├── src   服务独立文件夹
│   ├── app.module.ts
│   ├── main.ts
│   ├── datos  自定义公共属性
│   │   ├── common.dto.ts
│   │   └── tasks.dto.ts
│   ├── graphqlDirective  GraphQL指令文件夹
│   │   ├── index.directive.ts
│   │   ├── lower-case.directive.ts
│   │   └── upper-case.directive.ts
│   ├── graphqlResolver  GraphQL自定义方法文件夹
│   │   ├── index.ts
│   │   └── simple
│   ├── resolver  Restful自定义方法文件夹
│   │   ├── auth  登录认证
│   │   ├── index.ts
│   │   └── page  静态路由
│   ├── tasks  定时任务
│   │   ├── tasks.controller.ts
│   │   ├── tasks.module.ts
│   │   └── tasks.service.ts
│   └── upload  文件上传
│       ├── upload.controller.ts
│       ├── upload.module.ts
│       └── upload.service.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tools  命令 npm run batch 对应的代码位置，用于生成services文件夹的内容
│   └── index.ts
├── tsconfig.build.json
├── tsconfig.json
├── uploadResource  文件上传位置文件夹
├── views  静态资源文件夹
│   ├── dev.ejs
│   ├── index.ejs
│   ├── login.ejs
│   ├── playground.ejs
│   └── upload.ejs
└── ~schema.gql
```
