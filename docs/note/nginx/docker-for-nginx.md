---
title: docker 中使用 nginx
editLink: false
category: nginx
tag:
  - nginx
  - docker
---
[docker hub中的nginx镜像](https://hub.docker.com/_/nginx)

仓库中nginx的安装目录：
```shell
/etc/nginx
```

配置文件目录：
```shell
/etc/nginx/config.d/default.conf
```

网页文件目录：
```shell
/usr/share/nginx/html
```

# 使用教程

### 1.拉取镜像

```shell
docker pull nginx
```

### 2. 运行容器

这里将 ==/data/web== 挂载到容器中的 ==/usr/share/nginx/html== 

```shell
docker run -d --name my-nginx -p 80:80 -p 443:443 -v /data/web:/usr/share/nginx/html nginx
```
::: tip 参数说明
> --name  容器实例的名称

> -p 绑定端口，宿主主机端口:容器中的端口

> -v 挂载硬盘,宿主主机目录:容器中的目录
:::

### 3. 拷贝nginx目录

将容器中的 ==/etc/nginx/== 目录拷贝到宿主主机的 ==/usr/local/== 目录下
```shell
docker cp my-nginx:/etc/nginx /usr/local
```
### 4. 停止并删除容器

```shell
docker stop my-nginx

docker rm my-nginx
```

::: danger 注意
以上步骤必须执行，因为容器的运行依赖/etc/nginx，如果将一个空文件目录挂在到该目录，容器将无法启动，所以需要将该文件目录拷贝到主机中，再挂在上去。
:::

### 5. 重新运行新的容器

将 ==/usr/local/nginx== 挂在到容器中的 ==/etc/nginx==
```shell
docker run -d --name my-nginx -p 80:80 -p 443:443 -v /usr/local/nginx:/etc/nginx -v /data/web:/usr/share/nginx/html nginx
```

### 6.编辑配置文件

在宿主主机中，编辑 ==/usr/local/nginx/config.d/default.conf== ，修改网页文件路径，例如网页文件存放在宿主主机中的 ==/data/web/homepage== ，主页为 ==/data/web/homepage/index.html== ，由于将 ==/data/web== 挂载到了 ==/usr/share/nginx/html== ，所以配置文件中应该改为

```shell
location / {
  root /usr/share/nginx/html/homepage;
  index index.html index.htm;
}
```

### 7. HTTPS 配置
在 ==/usr/local/nginx/config.d/default.conf== 中追加以下内容：
```shell
server {
    listen 443 ssl http2;
    server_name  hanlitao.com;

    ssl                      on;
    ssl_certificate          /usr/share/nginx/html/ssl/hanlitao.com/hanlitao.com.pem;
    ssl_certificate_key      /usr/share/nginx/html/ssl/hanlitao.com/hanlitao.com.key;

    ssl_session_timeout  5m;

    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers   on;

    location / {
        root   /usr/share/nginx/html/homepage;
        index  index.html index.htm;
    }
}
```

其中， ==server_name== 为域名， ==ssl_certificate== 为ssl证书路径， ==ssl_certificate_key== 为ssl证书私钥的路径
### 8. 重启容器
配置完后，需要重启容器
```shell
docker restart my-nginx
```



[参考文档](https://blog.csdn.net/sculpta/article/details/107498446)