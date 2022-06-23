---
title: centos中安装docker
editLink: false
category: docker
tag:
  - centos
  - docker
---

### 1. 使用官方安装脚本自动安装

``` shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

### 2. 安装依赖软件包
``` shell
sudo yum install -y yum-utils \
  device-mapper-persistent-data \
  lvm2
```

### 3. 设置阿里云镜像

``` shell
sudo yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

### 4. 安装Docker Engine-Community

``` shell
sudo yum install docker-ce docker-ce-cli containerd.io
```

### 5. 启动Docker

``` shell
sudo systemctl start docker
```

[参考文档](https://www.runoob.com/docker/centos-docker-install.html)