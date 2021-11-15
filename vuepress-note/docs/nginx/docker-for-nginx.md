---
title: Docker For Nginx
editLink: false
category: nginx
tag:
  - nginx
  - docker
---

[nginx image in docker hub](https://hub.docker.com/_/nginx)

Installation directory of nginx in the warehouse：
```shell
/etc/nginx
```

Directory of configuration files：
```shell
/etc/nginx/config.d/default.conf
```

Directory of web page files：
```shell
/usr/share/nginx/html
```

# Using tutorials

### 1.Pull image

```shell
docker pull nginx
```

### 2. Run container

We hang the host directory ==/data/web== to ==/usr/share/nginx/html== in container 

```shell
docker run -d --name my-nginx -p 80:80 -p 443:443 -v /data/web:/usr/share/nginx/html nginx
```
::: tip parameter description
> --name  name of the container instance

> -p binding port, port in host : port in container

> -v hang hard directory, directory in host: directory in container
:::

### 3. Copy nginx directory

we copy the host dir ==/etc/nginx/== to  ==/usr/local/== in container
```shell
docker cp my-nginx:/etc/nginx /usr/local
```
### 4. Stop and remove the container

```shell
docker stop my-nginx

docker rm my-nginx
```

::: danger take care
The above steps must be carried out because the operation of the container depends on /etc/nginx. If you hang an empty file directory to this directory, the container will not start. Therefore, you need to copy the file directory to the host and hang it.
:::

### 5. Rerun the new container

hang the host directory ==/usr/local/nginx== to ==/etc/nginx== in container
```shell
docker run -d --name my-nginx -p 80:80 -p 443:443 -v /usr/local/nginx:/etc/nginx -v /data/web:/usr/share/nginx/html nginx
```

### 6. Edit the default.conf file

In host computer,edit ==/usr/local/nginx/config.d/default.conf== , modify the path of the web page file, such asthe path where the web page file is stored in the host computer directory ==/data/web/homepage== , index page ==/data/web/homepage/index.html== , because we hang the  ==/data/web== to ==/usr/share/nginx/html== . so,the config file should be modify as bellow

```shell
location / {
  root /usr/share/nginx/html/homepage;
  index index.html index.htm;
}
```

### 7. HTTPS config
Add the following contents to  ==/usr/local/nginx/config.d/default.conf== :
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


In here the ==server_name== is domain name, the ==ssl_certificate== is the path of ssl certificate, and ==ssl_certificate_key== is the path to the SSL certificate private key. 
### 8. Restart the container
After configuration, restart the container
```shell
docker restart my-nginx
```



[Reference Documents](https://blog.csdn.net/sculpta/article/details/107498446)