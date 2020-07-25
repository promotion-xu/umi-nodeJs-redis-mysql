##效果图
![](https://user-gold-cdn.xitu.io/2020/7/25/173860129d48863b?w=1200&h=1000&f=gif&s=1332684)

# umi-nodeJs-mysql

一个致力于打造灵活中台系统的 `umi@3` 脚手架

## 安装依赖

```
yarn
```

## 本地调试

```bash
yarn start
```

## 打包到 `.zip`

```bash
bash shells/build.sh
```

## 打包到 `docker`

```bash
docker build --no-cache -t <app-name>:<tag> .
```

## 服务端

1. 目录： /server/blog-1/
2. 启动服务端: 根目录执行 yarn server
3. 需要根据本地环境配置 redis, mysql。 /server/blog-1/src/conf/db.js

### redis

1. Start

```terminal
  redis-server
```

### 掘金地址

[](https://juejin.im/post/5f1c26ae5188252e6c6106a7)
https://juejin.im/post/5f1c26ae5188252e6c6106a7

### github 地址

[](https://github.com/promotion-xu/umi-nodeJs-redis-mysql)
https://github.com/promotion-xu/umi-nodeJs-redis-mysql
