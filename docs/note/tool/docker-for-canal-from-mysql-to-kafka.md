---
title: docker 中使用 canal
editLink: false
category: docker
tag:
  - canal
  - mysql
  - kafka
  - docker
---

canal 同步 mysql binlog 数据变动到 kafka


[docker hub中的canal镜像](https://hub.docker.com/r/canal/canal-server)


# 使用教程

首先需要先安装[mysql](/note/tool/docker-for-kafka)和[kafka](/note/tool/docker-for-kafka)，然后再配置canal

### 1.拉取镜像

```shell
docker pull canal/canal-server
```

### 2. 运行容器获得配置文件
```shell
# 启动镜像 
docker run --name canal -d canal/canal-server
# 找到文件位置后 exit退出容器 将容器内部文件copy到外部
docker cp canal:/home/admin/canal-server/conf/canal.properties D:/data/docker/canal
docker cp canal:/home/admin/canal-server/conf/example/instance.properties D:/data/docker/canal
# 停止和删除容器
docker stop canal
docker rm canal
```

### 3. 配置instance.properties
```shell
canal.instance.master.address=mysql:3306
canal.instance.dbUsername=canal
canal.instance.dbPassword=canal
canal.mq.topic=example
```
### 4. 配置canal.properties

```shell
canal.serverMode=kafka
canal.mq.servers=kafka:9092
kafka.bootstrap.servers = kafka:9092
```

### 5. 修改mysql my.cnf配置文件
```shell
[mysqld]
# 路径在/etc/mysql
log-bin=mysql-bin # 开启 binlog
binlog-format=ROW # 选择 ROW 模式
server_id=1 # 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复
```
### 6. 创建mysql用户
```sql
-- 查看log-bin是否设置成功
show variables like 'log_bin';

-- 创建canal用户
CREATE USER canal IDENTIFIED BY 'canal';  
GRANT SELECT, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'canal'@'%';
FLUSH PRIVILEGES;
```
### 7. 运行容器

```shell
docker run --name canal -p 11111:11111 -d --link mysql --link kafka -v D:/data/docker/canal/instance.properties:/home/admin/canal-server/conf/example/instance.properties  -v D:/data/docker/canal/canal.properties:/home/admin/canal-server/conf/canal.properties  -v D:/data/docker/canal/logs/:/home/admin/canal-server/logs/  canal/canal-server 
```
::: tip 参数说明
> --name  容器实例的名称

> -p 绑定端口，宿主主机端口:容器中的端口

> --link 链接docker容器，这里包括mysql和kafka

> -v 挂载硬盘,宿主主机目录:容器中的目录
:::

### 8. 修改kafka配置
1. 进入kafka docker --> docker exec -it kafka /bin/bash
2. 进入kafka config目录 --> cd /opt/kafka_2.13-2.8.1/config
3. 修改server.properties --> vi server.properties  --> advertised.listeners=PLAINTEXT://kafka:9092


### 9. 修改host

1. 本机hosts增加（为了javacode可以监听kafka） --> 127.0.0.1 kafka 
2. 进入canal --> docker exec -it canal /bin/bash
3. vi /etc/hosts --> 增加127.0.0.1 kafka

### 10. 测试
1. 打开新窗口，进入kafka的docker容器 --> docker exec -it kafka /bin/bash
2. 运行kafka消费者来接受消息，监听example topic
``` shell
/opt/kafka_2.13-2.8.1/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic example
```
3. 修改mysql数据，查看kafka消费者打印的消息体。

