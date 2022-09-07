---
title: docker 中使用 mongodb
editLink: false
category: docker
tag:
  - mongodb
  - docker
---
[docker hub中的mongo镜像](https://hub.docker.com/_/mongo)

### 1. 拉取mongo镜像

``` shell
docker pull mongo
```
默认会拉取last版本

### 2. 启动mongo镜像

``` shell
docker volume create --name = mongodata
docker run  -p 27017:27017 --name mongo-server -v mongodata:/data/db -d mongo
```

-p: 端口号

--name: 容器别名

-v: 文件挂载。冒号左边为本地路径，冒号右边为docker内部路径

### 3. 进入容器查看

``` shell
docker exec -it mongo-server /bin/bash
```

mongo的docker简单部署完成，如果希望在windows中可视化查看mongo数据，可以下载[mongodb-compass](https://www.mongodb.com/try/download/compass)

