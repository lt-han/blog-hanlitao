---
title: docker
editLink: false
category: docker
tag:
  - docker
---

### 查看docker network

docker network ls

### 创建docker network

docker network create -d bridge ai-data-server-network


### 创建mysql docker

```shell

docker pull mysql:5.7

docker run --network  ai-data-server-network \
 -p 3306:3306 \
 --name mysql \
 -v /root/dataAlg/ai-data-server/docker/mysql/log:/var/log/mysql \
 -v /root/dataAlg/ai-data-server/docker/mysql/data:/var/lib/mysql \
 -v /root/dataAlg/ai-data-server/docker/mysql/conf:/etc/mysql \
 -e MYSQL_ROOT_PASSWORD=root \
 -d mysql:5.7
```

进入mysql

mysql -h localhost -u root -p

显示数据库

show databases;

创建数据库

create database db_test charset=utf8;

创建表

```mysql

CREATE TABLE IF NOT EXISTS `tb_test`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

```
插入数据

INSERT INTO tb_test(name) VALUES ("lthan");

### 创建kafka docker

```shell

docker pull wurstmeister/zookeeper

docker pull wurstmeister/kafka

```

创建zookeeper

docker run --network ai-data-server-network -p 2181:2181 --name zookeeper -d wurstmeister/zookeeper

创建kafka

```shell

docker run --network ai-data-server-network \
-p 9092:9092 --name kafka \
-e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
-e KAFKA_ADVERTISED_HOST_NAME=kafka \
-e KAFKA_ADVERTISED_PORT=9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092 \
-e ALLOW_PLAINTEXT_LISTENER=yes \
-d wurstmeister/kafka

```

进入kafka容器

docker exec -it kafka /bin/bash

测试

/opt/kafka_2.13-2.8.1/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test

/opt/kafka_2.13-2.8.1/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test

### 创建canal docker

```shell

docker pull canal/canal-server

docker run --name canal -d canal/canal-server

docker cp canal:/home/admin/canal-server/conf/canal.properties /root/dataAlg/ai-data-server/docker/canal/

docker cp canal:/home/admin/canal-server/conf/example/instance.properties /root/dataAlg/ai-data-server/docker/canal/

配置instance.properties

canal.instance.master.address=mysql:3306
canal.instance.dbUsername=canal
canal.instance.dbPassword=canal
canal.mq.topic=example

配置canal.properties

canal.serverMode=kafka
canal.mq.servers=kafka:9092
kafka.bootstrap.servers = kafka:9092

```

修改mysql my.cnf配置文件

```shell
[mysqld]
# 路径在/etc/mysql
log-bin=mysql-bin # 开启 binlog
binlog-format=ROW # 选择 ROW 模式
server_id=1 # 配置 MySQL replaction 需要定义，不要和 canal 的 slaveId 重复

重新运行canal

docker stop canal

docker rm canal

docker run --network ai-data-server-network \
--name canal -p 11111:11111 \
-v /root/dataAlg/ai-data-server/docker/canal/instance.properties:/home/admin/canal-server/conf/example/instance.properties \
-v /root/dataAlg/ai-data-server/docker/canal/canal.properties:/home/admin/canal-server/conf/canal.properties \
-v /root/dataAlg/ai-data-server/docker/canal/logs/:/home/admin/canal-server/logs/ \
-d canal/canal-server

```


### 测试

docker exec -it kafka /bin/bash
/opt/kafka_2.13-2.8.1/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic ai-data-server
