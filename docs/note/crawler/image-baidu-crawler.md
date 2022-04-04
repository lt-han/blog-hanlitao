---
title: 爬虫抓取百度图片
editLink: false
# 一个页面只能有一个分类
category: crawler
# 一个页面可以有多个标签
tag:
  - 爬虫
---
::: tip 免责声明
本文内容仅作为爬虫技术学习使用，请勿乱用或从事不法行为，否则一切后果自负。
:::

不废话，直接上代码

### 1. 获取图片地址
```python
import urllib
import requests

# 获取百度图片的请求URL
def get_urls(search_word,page_num=1):
    search_word = urllib.parse.quote(search_word)
    url = 'http://image.baidu.com/search/acjson?'

    for i in range(page_num):
          yield f'{url}tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&fr=&word={search_word}&cg=girl&queryWord={search_word}&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&hd=&latest=&copyright=&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&expermode=&nojc=&isAsync=&pn={30*i}&rn=30&gsm=f0&1636555380492='
# 获取每张图片的地址URL
def get_image_urls(url):
  headers = {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Mobile Safari/537.36'}
  json_data = requests.get(url,headers=headers).json()
  for row in json_data.get('data'):
    if row:
      yield row.get('thumbURL')

# 测试
for url in get_urls("美女"):
    print(url)
    for image_url in get_image_urls(url):
      print(image_url)
```

### 2. 下载图片

```python
import os
import asyncio
import aiohttp

# 如果使用ipython notebook报错，尝试增加2行代码
import nest_asyncio
nest_asyncio.apply()

# 异步请求图片
async def get_image(url):
  async with aiohttp.ClientSession() as session:
    response = await session.get(url)
    content = await response.read()
    return content

# 下载图片到本地文件
async def download_image(url,filename):
  html = await get_image(url)
  with open(filename,'wb') as fw:
    fw.write(html)

# 测试
task = []
search_word = "美女"

path_dir = os.path.join(os.getcwd(),search_word)

if not os.path.exists(path_dir):
  os.mkdir(path_dir) # 创建目录

for url in get_urls(search_word,2):
  for image_url in get_image_urls(url):
    filename = f"{len(task) + 1}.jpg"
    filename = os.path.join(path_dir,filename)
    task.append(asyncio.ensure_future(download_image(image_url,filename)))

# 获取事件循环 Eventloop
loop = asyncio.get_event_loop()

# 执行协程
loop.run_until_complete(asyncio.wait(task))
```

至此，异步爬取百度图片的代码就结束啦，如果对您有帮助，麻烦点个赞再走！