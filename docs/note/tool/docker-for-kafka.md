---
title: docker 中使用 kafka
editLink: false
category: docker
tag:
  - kafka
  - docker
---

[docker hub中的zookeeper镜像](https://hub.docker.com/r/wurstmeister/zookeeper)

[docker hub中的kafka镜像](https://hub.docker.com/r/wurstmeister/kafka)

### 1. 拉取zookeeper和kafka镜像

``` shell
docker pull wurstmeister/zookeeper

docker pull wurstmeister/kafka
```
默认会拉取last版本

### 2. 启动zookeeper和kafka镜像

``` shell
docker run -p 2181:2181 --name zookeeper -d wurstmeister/zookeeper

docker run -p 9092:9092 --name kafka --link zookeeper -e KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 -e KAFKA_ADVERTISED_HOST_NAME=localhost -e KAFKA_ADVERTISED_PORT=9092 -d wurstmeister/kafka
```

-p: 端口号

--name: 容器别名

-e: KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 设置zookeeper主机为zookeeper:2181

-e: KAFKA_ADVERTISED_HOST_NAME=localhost 设置docker宿主主机ip为localhost

-e: KAFKA_ADVERTISED_PORT=9092 设置docker宿主主机端口号为9092

-d: 后台运行

### 3. 进入容器查看

``` shell
docker exec -it kafka /bin/bash
```

### 4. 测试

打开新窗口1，进入docker容器，运行kafka生产者来发布消息
``` shell
/opt/kafka_2.13-2.8.1/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic test
```

打开新窗口2，进入docker容器，运行kafka消费者来接受消息
``` shell
/opt/kafka_2.13-2.8.1/bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test
```

此时，在窗口1中输入数据，会在窗口2中打印出来


kafka的docker简单部署完成，如果希望在windows中可视化查看kafka数据，可以下载[kafka-tool](https://www.kafkatool.com/download.html)

