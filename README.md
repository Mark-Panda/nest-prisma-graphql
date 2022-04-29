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
- 全局报错过滤器
- 全局响应拦截器

## 待办事项

- [ ] 合并 `prisma` 文件及其脚本
- [ ] 上传文件
- [ ] 任务队列
- [ ] 访问限流
