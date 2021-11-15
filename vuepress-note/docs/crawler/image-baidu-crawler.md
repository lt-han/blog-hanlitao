---
title: Crawler grabs Baidu pictures
editLink: false
# 一个页面只能有一个分类
category: crawler
# 一个页面可以有多个标签
tag:
  - crawler
---
::: tip Disclaimer
The content of this article is only used for learning crawler technology. Do not use it indiscriminately or engage in illegal acts, otherwise you will bear all the consequences.
:::

No nonsense, go straight to the code

### 1. Get picture address
```python
import urllib
import requests

# Request URL for Baidu pictures
def get_urls(search_word,page_num=1):
    search_word = urllib.parse.quote(search_word)
    url = 'http://image.baidu.com/search/acjson?'

    for i in range(page_num):
          yield f'{url}tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&fr=&word={search_word}&cg=girl&queryWord={search_word}&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&hd=&latest=&copyright=&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&expermode=&nojc=&isAsync=&pn={30*i}&rn=30&gsm=f0&1636555380492='
# Get the address URL of each picture
def get_image_urls(url):
  headers = {'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Mobile Safari/537.36'}
  json_data = requests.get(url,headers=headers).json()
  for row in json_data.get('data'):
    if row:
      yield row.get('thumbURL')

# Test
for url in get_urls("girl"):
    print(url)
    for image_url in get_image_urls(url):
      print(image_url)
```

### 2. Download images

```python
import os
import asyncio
import aiohttp

# If an error is reported using IPython notebook, try adding 2 lines of code
import nest_asyncio
nest_asyncio.apply()

# Asynchronous request picture
async def get_image(url):
  async with aiohttp.ClientSession() as session:
    response = await session.get(url)
    content = await response.read()
    return content

# Download picture to local file
async def download_image(url,filename):
  html = await get_image(url)
  with open(filename,'wb') as fw:
    fw.write(html)

# Test
task = []
search_word = "girl"

path_dir = os.path.join(os.getcwd(),search_word)

if not os.path.exists(path_dir):
  os.mkdir(path_dir) # create directory

for url in get_urls(search_word,2):
  for image_url in get_image_urls(url):
    filename = f"{len(task) + 1}.jpg"
    filename = os.path.join(path_dir,filename)
    task.append(asyncio.ensure_future(download_image(image_url,filename)))

# Get event loop
loop = asyncio.get_event_loop()

# Execute coroutine
loop.run_until_complete(asyncio.wait(task))
```

So far, the code for asynchronously crawling Baidu pictures is over. If it helps you, please point a praise before you go!