---
title: docker 中使用 mysql
editLink: false
category: docker
tag:
  - mysql
  - docker
---
[docker hub中的mysql镜像](https://hub.docker.com/_/mysql)

### 1. 拉取mysql镜像

``` shell
docker pull mysql:5.7
```
拉取mysql指定5.7版本

### 2. 启动mysql镜像

(1) for linux

``` shell
docker run \
 -p 3306:3306 \
 --name mysql \
 -v /data/docker/mysql/log:/var/log/mysql \ 
 -v /data/docker/mysql/data:/var/lib/mysql \ 
 -v /data/docker/mysql/conf:/etc/mysql \ 
 -e MYSQL_ROOT_PASSWORD=root \ 
 -d mysql:5.7
```

(2) for windows

``` shell
docker run -p 3306:3306 --name mysql -v D:/data/docker/mysql/log:/var/log/mysql -v D:/data/docker/mysql/data:/var/lib/mysql -v D:/data/docker/mysql/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql:5.7
```

-p: 端口号

--name: 容器别名

-v: 文件挂载。冒号左边为本地路径，冒号右边为docker内部路径

-e: MYSQL_ROOT_PASSWORD=root,设置root用户的密码为root

-d: 后台运行

### 3. 进入容器查看

``` shell
docker exec -it mysql /bin/bash
```

mysql:5.7的docker简单部署完成，如果希望在windows中可视化查看mysql数据，可以下载[tableplus](https://tableplus.com/)

