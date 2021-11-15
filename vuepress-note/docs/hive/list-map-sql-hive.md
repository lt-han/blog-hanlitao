---
title: select map field from list with hive
# 一个页面只能有一个分类
category: hive
# 一个页面可以有多个标签
tag:
  - hive sql
---


There are some built-in UDFs in Hive SQL, and how to use these built-in UDFs to query data in list (map) format ?

Such As:

```json
'[{"key1":"val1","key2":"val2"},{"key1":"val11","key2":"val22"}]'
```

1. First, let's use get_json_object function queries the value corresponding to key1

```sql
SELECT GET_JSON_OBJECT('{"key1":"val1","key2":"val2"}','$.key1');
```

Result:
```
val1
```
This syntax is very simple, which is to take the value of key as key1 from the JSON string. So how to take each value for the value of the JSON list ?

2. Parse the value of the map field in the list in combination with the explode

```sql
SELECT
    explode(split(REGEXP_REPLACE(regexp_extract(list_map,'^\\[(.+)\\]$',1),'},{','};{'),';'))
FROM
    (
        SELECT '[{"key1":"val1","key2":"val2"},{"key1":"val11","key2":"val22"}]' AS list_map
    ) tmp;
```

Result:

```json
{"key1":"val1","key2":"val2"}
{"key1":"val11","key2":"val22"}
```

What does the above code mean ? The "regexp_extract" function obtains the characters in [] brackets from the string. The "REGEXP_REPLACE" function replaces all "},{" with "};{", and then splits into a map array according to the semicolon ";". The purpose of this operation is to prevent the "," in the map from being split. The ";" can be replaced with other characters to prevent conflicts. Finally, use "explode" to split each item in the array into a row of data.

::: tip tips
During explode splitting, the data of other fields will be copied to the split rows according to the number of items in the list (list_map here) in the original row.
:::

3. The query of fields in list (map) is realized in combination with LATERAL.

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

Result:
|     1     |     _c0     |     _c1     |
| :------:  | :---------: | :---------: |
|     2     |     val1    |     val2    |
|     3     |     val11   |     val22   |


ok, At this point, we can get multiple values from the dictionary in a complex list. I hope this tip can be of some help to you.