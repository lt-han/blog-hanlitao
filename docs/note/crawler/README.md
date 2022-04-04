---
title: 爬虫
editLink: false
---


# 1. 请求库

爬虫第一步需要请求对方网站或接口来拿到数据，才能继续接下来的sao操作。常用的请求库有urllib、requests、selenium、aiohttp等，下面让我们来认识一下这些库有什么异同。

### 1.1 urllib

[官方文档](https://docs.python.org/3/library/urllib.html) [中文文档](https://docs.python.org/zh-cn/3/library/urllib.html)

urllib是python内置的URL处理模块，包括：request、error、parse、robotparser 4个模块。

简单示例：
```python
import urllib.request
response = urllib.request.urlopen('http://www.baidu.com')
print(response.read().decode('utf-8'))
```

### 1.2 requests

[官方文档](https://docs.python-requests.org/en/latest/) [中文文档](https://docs.python-requests.org/zh_CN/latest/)

requests是基于urllib开发的第三方包。是一个阻塞式HTTP请求库。发出一个请求后，会一直等待IO，直到网页内容完全返回后才继续执行，会白白占用CPU资源。不过对于性能要求不高的需求，还是建议使用requests包，因为它让你的程序更加简单清晰。

pip安装：
```shell
pip install requests
```

### 1.3 selenium

[官方文档](https://www.selenium.dev/selenium/docs/api/py/api.html) [中文文档](https://selenium-python-zh.readthedocs.io/en/latest/)

selenium是web自动化测试工具，他能够帮你自动渲染js，解决requests拿不到动态页面的问题，同时也可以模拟人的操作，让反爬虫变得困难。不过启动一个selenium就像启动一个浏览器一样，会比较占用资源。在使用selenium之前，需要根据浏览器版本下载WebDriver。

pip安装：
```shell
pip install selenium
```

Chrome WebDriver[下载地址](https://selenium-python-zh.readthedocs.io/en/latest/) 
Firefox WebDriver[下载地址](https://github.com/mozilla/geckodriver/releases)

简单示例：
```python
from selenium import webdriver
import time
# init browser
browser = webdriver.Chrome(r"package/chromedriver.exe")
# request url
browser.get("http://www.baidu.com")
# input word
browser.find_element_by_id("kw").send_keys("百度百科")
# click button
browser.find_element_by_id("su").click()
# wait 5s
time.sleep(5)
# close browser
browser.close()
```

### 1.4 aiohttp

aiohttp和asyncio结合，用于异步获取请求结果，相对requests来说，更节省cpu资源。

pip安装：
```shell
pip install aiohttp
```

简单示例：

```python
import aiohttp
import asyncio

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()


async def main():
    async with aiohttp.ClientSession() as session:
        html = await fetch(session, "http://www.baidu.com")
        print(html)


if __name__ == "__main__":
    asyncio.run(main())
```