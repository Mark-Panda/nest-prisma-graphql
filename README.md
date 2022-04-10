# Nest项目

> Nest Prisma Graphql 可以使用指令
> prisma的指令实现通过 `prisma-nestjs-graphql` 来实现
> 切换node版本为12版本再启动

## 服务操作步骤

1. 映射 `prisma` 文件为数据库的命令 `npm run prisma:p`
2. 通过 `prisma` 文件生成代码优先的TS文件命令 `npm run prisma:g`
3. 代码格式化生成的TS文件命令 `npm run format:g`
4. 根据 `schema.prisma` 文件自动生成增删改查业务文件的脚本命令 `npm run batch`
5. 服务启动命令 `npm run start:dev`

## 待办事项

- [ ] 合并 `prisma` 文件及其脚本
- [x] prisma客户端独立生成
