# Nest项目

> Nest Prisma Graphql 可以使用指令
> prisma的指令实现通过 `prisma-nestjs-graphql` 来实现
> 切换node版本为12版本再启动

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

## 待办事项

- [ ] 合并 `prisma` 文件及其脚本
- [ ] 任务队列
- [ ] 访问限流
- [ ] 数据库连接信息和Redis的连接信息可以使用环境变量进行覆盖
- [ ] websocket集成
- [ ] docker打包

## 备注

> 因为有GraphQL的存在所以响应拦截器需要在restful接口的controller文件中引用，不能全局引用 报错拦截器同理, GraphQL有自己的返回类型
