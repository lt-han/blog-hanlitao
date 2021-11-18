---
title: hive查询解析URL
---

hive自带了parse_url函数，示例如下：

```sql

WITH t_tmp AS (
    SELECT 'https://hanlitao.com?age=18&name=hanlitao' AS url
)

SELECT
    parse_url(url, 'PROTOCOL') as protocol -- https
    ,parse_url(url, 'HOST') as host -- hanlitao.com
    ,parse_url(url, 'REF') as ref -- \N
    ,parse_url(url, 'PATH') as path -- \N
    ,parse_url(url, 'QUERY') as query -- age=18&name=hanlitao
    ,parse_url(url, 'FILE') as file -- ?age=18&name=hanlitao
    ,parse_url(url, 'AUTHORITY') as authority -- hanlitao.com
    ,parse_url(url, 'USERINFO') as userinfo -- \N
FROM t_tmp;
```

要解析其中的参数，只需要再QUERY后面增加参数名入参即可

```sql
SELECT parse_url(url, 'QUERY', 'age') FROM t_tmp; -- 18
```

如果URL中没有 ==http://== 或 ==https://==

```sql
SELECT parse_url(concat("https://",url), 'QUERY', 'age') FROM t_tmp; -- 18

-- or
SELECT parse_url(case when url like 'http://%' or url like 'https://%' then url else concat('http://',url) end, 'QUERY', 'age') FROM t_tmp; -- 18
```