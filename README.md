# 基于NestJS的单体服务

> Nest Prisma Graphql 可以使用指令
> prisma的指令实现通过 `prisma-nestjs-graphql` 来实现
> 切换node版本为16版本再启动

## 服务操作步骤

1. 拉取仓库代码
2. 安装依赖包 `npm install`
3. 映射 `prisma` 文件为数据库的命令 `npm run prisma:p`
4. GraphQL类型自动生成脚本 `npm run regen`
5. 根据 `schema.prisma` 文件自动生成增删改查业务文件的脚本命令 `npm run batch`
6. 服务启动命令 `npm run start:dev`

## 已有功能

- 登录鉴权
- 密码加盐加密
- Token续租
- Restful和GraphQL接口支持
- 日志切分
- swagger接口文档
- GraphQL的playground调试界面(开发环境下使用)
- 定时任务
- 角色权限控制 依据token查询用户角色
- 跨域
- 报错过滤器(restful)
- 响应拦截器(restful)
- 文件上传之分片上传
- docker打包
- 数据库连接信息和Redis的连接信息可以使用环境变量进行覆盖
- 限流 令牌桶 使用lua脚本和Redis实现
- websocket集成
- GraphQL中间件
- GraphQL异常友好型提示(自定义异常)

## 待办事项

- [ ] 合并 `prisma` 文件及其脚本
- [ ] 任务队列

## 备注

> 因为有GraphQL的存在所以响应拦截器需要在restful接口的controller文件中引用，不能全局引用 报错拦截器同理, GraphQL有自己的返回类型

> 打包docker镜像时需要先build好dist文件再打包

> 角色守卫由全局改为控制器使用，因为要和JWT协同，JWT是控制器级别的。删除GraphQL的权限开关，变为永久需要验证JWT。

> 当使用角色控制方法权限时，需要将权限的装饰器写在认证的上方，让代码先走jwt的认证权限，jwt会将username存放在req中，在角色Guard判断时就可以获取到真正的用户信息，判断用户角色，防止网络拦截判断。

> 为了使用`graphql-middleware`中间件包（由于该包当前仍未支持`graphql`16版本，当支持可以将后面两个包升级），降低了`graphql`版本`16.3->15.8.0`和`prisma-graphql-type-decimal`版本 `2.0->1.0`。

## 多任务执行方法

> 适用于GraphQL方法

### 规则说明

1. 必须传一个multiTasking方法
2. 必须采用参数和请求体分开写的格式
3. 仅适用于业务模型的CRUD，不支持批量CRUD方法和自定义方法

示例如下
```graphql
mutation (
  $createOneDogData:DogCreateInput!,
  $createOneUser:UserCreateInput!, 
  $updateOneAnimalData: AnimalUpdateInput!,
  $updateOneAnimalWhere:AnimalWhereUniqueInput!
){
  multiTasking
  createOneDog(data:$createOneDogData){
    id
    code
    name
  }
  updateOneAnimal(data:$updateOneAnimalData, where:$updateOneAnimalWhere){
    code
    name
  }
   createOneUser(data:$createOneUser){
    username
    person{
      code
      name
    }
  }
}

{
  "createOneUser": {
    "username": "lisha",
    "email": "lisha@qq.com",
    "password": "123456",
    "person": {
      "create": [
        {
          "code": "GH001"
        }
      ]
    }
  },
  "createOneDogData": {
    "code": "D001",
    "name": "泰迪"
  },
  "updateOneAnimalData": {
    "code": {
      "set": "A001"
    },
    "name": {
      "set": "走兽"
    },
    "dogId": {
      "set": "D001"
    }
  },
  "updateOneAnimalWhere": {
    "id": "cl4ew915800257kw8emter805"
  }
}

```

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
