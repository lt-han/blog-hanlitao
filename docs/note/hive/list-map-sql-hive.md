---
title: hive查询list中的map字段
editLink: false
category: hive
tag:
  - hive查询
---

Hive SQL 有一些内置的 UDF ，如何使用这些内置 UDF 查询 list(map) 格式的数据呢？

例如：

```json
'[{"key1":"val1","key2":"val2"},{"key1":"val11","key2":"val22"}]'
```

1. 首先来看利用 get_json_object 函数查询 key1 对应的值

```sql
SELECT GET_JSON_OBJECT('{"key1":"val1","key2":"val2"}','$.key1');
```

结果为：
```
val1
```
这个语法很简单，就是从json字符串中取key为key1的值。那么对于json列表的值如何取每一个值呢？

2. 结合explode解析列表中map字段的值

```sql
SELECT
    explode(split(REGEXP_REPLACE(regexp_extract(list_map,'^\\[(.+)\\]$',1),'},{','};{'),';'))
FROM
    (
        SELECT '[{"key1":"val1","key2":"val2"},{"key1":"val11","key2":"val22"}]' AS list_map
    ) tmp;
```

结果是：

```json
{"key1":"val1","key2":"val2"}
{"key1":"val11","key2":"val22"}
```

上面的代码是什么意思呢？regexp_extract函数从字符串中获取[]中括号内的字符，然后REGEXP_REPLACE函数将所有的"},{"替换成"};{"，接下来在按照";"分号 split成map数组，这样操作的目的是防止split时，把map里面的","也拆分掉，";"可以替换成其他字符来防止冲突，最后再用explode把数组中的每一项拆分成一行数据。

::: tip 提示
explode拆分的时候，会根据原始行中列表（这里的list_map）的项数，复制其他字段的数据到拆出的多行。
:::

3. 结合LATERAL实现list(map)中字段的查询。

```sql
SELECT
    GET_JSON_OBJECT(val_map,'$.key1')
    ,GET_JSON_OBJECT(val_map,'$.key2')
FROM
    (
        SELECT '[{"key1":"val1","key2":"val2"},{"key1":"val11","key2":"val22"}]' AS list_map
    ) tmp
LATERAL VIEW explode(split(REGEXP_REPLACE(regexp_extract(list_map,'^\\[(.+)\\]$',1),'},{','};{'),';')) newtable as val_map;
```

结果是：
|     1     |     _c0     |     _c1     |
| :------:  | :---------: | :---------: |
|     2     |     val1    |     val2    |
|     3     |     val11   |     val22   |


ok,到这里我们就能从复杂的列表中的字典中取多个值了，希望这个小技巧对你能够有一点帮助。