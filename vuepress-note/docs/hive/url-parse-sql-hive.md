---
title: parse url with hive
---


Hive have parse_url built-in function, such as:

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

To parse the parameters, you only need to add the parameter name after 'QUERY'

```sql
SELECT parse_url(url, 'QUERY', 'age') FROM t_tmp; -- 18
```

If there is no  ==http://== or ==https://== in URL

```sql
SELECT parse_url(concat("https://",url), 'QUERY', 'age') FROM t_tmp; -- 18

-- or
SELECT parse_url(case when url like 'http://%' or url like 'https://%' then url else concat('http://',url) end, 'QUERY', 'age') FROM t_tmp; -- 18
```