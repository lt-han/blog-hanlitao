---
title: github自动部署vuepress到阿里云ECS
editLink: false
category: vuepress
tag:
  - vuepress
  - github actions
---

之前每次更新vuepress博客内容都需要手动pull代码然后build，有了 ==github acitons== 之后，只要push代码到main分支即可实现自动部署服务器了。

### 1. git bash 生成ssh密钥
在git bash 中输入
```shell
ssh-keygen -t rsa -C "123456789@xxx.com"
```
生成公钥 ==id_rsa.pub== 和私钥 ==id_rsa== ,其中 =="123456789@xxx.com"== 是你的github邮箱

### 2. 在github中的Secrets添加私钥

github --> 当前项目 --> settings --> Secrets --> New repository secret --> 将 ==id_rsa== 中的内容作为 ==PRIVATE_KEY== 的值

::: center
![](/images/github-actions-secrets-private-key.png)
:::

### 3. 在服务器配置公钥

登录服务器 --> ==cd /root/.ssh== --> ==vim authorized_keys== 并将 ==id_rsa.pub== 中的内容复制到该文件。

如果/root目录下没有.ssh目录，可以在服务器中执行 ==ssh localhost== 登录一下root用户并输入密码，就生成.ssh目录了。

### 4. 生成github actions的main.yml文件
github --> 当前项目 --> Actions --> set up a workflow yourself

之后会生成 ==.github/workflows/main.yml== 文件，只需要简单编辑main.yml文件即可

### 5. 配置main.yml文件

```yml
# This is a basic workflow to help you get started with Actions

name: Build app and deploy to aliyun

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the main branch
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # 安装Node.js 根据你本地的版本号来安装，否则可能出现build异常
      - name: use Node.js 12.13.1
        # 使用action库  actions/setup-node安装node
        uses: actions/setup-node@v1
        with:
          node-version: 12.13.1
      # 安装依赖
      - name: npm install
        run: |
          cd ./vuepress-note
          # 异常时尝试删除node_modules文件夹
          # rm -rf ./node_modules
          npm install
      # 打包
      - name: npm build
        run: |
          cd ./vuepress-note
          npm run docs:build
      # 部署到阿里云ECS
      - name: Deploy to Aliyun ECS
        uses: easingthemes/ssh-deploy@v2.1.1
        env:
          # 私钥
          SSH_PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          # scp参数
          ARGS: "-avzr --delete"
          # 源目录，build生成的dist目录
          SOURCE: "./vuepress-note/dist"
          # 服务器ip：换成你的服务器IP
          REMOTE_HOST: "123.57.38.114"
          # 用户名
          REMOTE_USER: "root"
          # 目标地址 服务器部署路径，最终会在这个路径下添加dist目录
          TARGET: "/data/web/homepage"
```

[nginx配置参考](/note/nginx/docker-for-nginx)
