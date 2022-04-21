---
title: ElasticSearch嵌套查询
editLink: false
category: ElasticSearch
tag:
  - query
---

ElasticSearch多字段 AND OR 组合嵌套查询

查询逻辑如下：
```sql
SELECT * FROM my_type 
WHERE 
    (first_name = "Khan" AND second_name = "Han") 
    OR 
    (first_name = "Austin" AND second_name = "Wang")
```

### 1. 创建索引
```json
PUT my_index
{
  "mappings": {
    "my_type":{
      "properties": {
        "group_name": {
          "type": "text"
        },
        "members": {
          "type": "nested",
          "properties": {
            "first_name": { "type": "keyword" },
            "last_name": { "type": "keyword" },
            "age": { "type": "integer" }
          }
        }
      }
    }
  }
}
```

### 2. 导入测试数据
```json
POST my_index/my_type/1
{
  "group_name": "Algorithm Engineering",
  "members": [
        {
            "first_name": "Khan",
            "last_name": "Han",
            "age": 30
        },
        {
            "first_name": "Austin",
            "last_name": "Wang",
            "age": 35
        },
        {
            "first_name": "Lycra",
            "last_name": "Li",
            "age": 28
        }
    ]
}
```

### 3. 验证数据导入成功
```json
GET my_index/my_type/_search
{
  "query": {
    "match_all": {}
  }
}
```

### 4. 查询语法
```json
POST my_index/my_type/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "nested": {
            "path": "members",
            "query": {
              "bool": {
                "must": [
                  {
                    "term": {
                      "members.first_name": "Khan"
                    }
                  },
                  {
                    "term": {
                      "members.last_name": "Han"
                    }
                  }
                ]
              }
            }
          }
        },
        {
          "nested": {
            "path": "members",
            "query": {
              "bool": {
                "must": [
                  {
                    "term": {
                      "members.first_name": "Austin"
                    }
                  },
                  {
                    "term": {
                      "members.last_name": "Wang"
                    }
                  }
                ]
              }
            }
          }
        }
      ]
    }
  }
}
```

上面的查询，在member内要同时满足 first_name 和 last_name 才会返回。

::: tip 为什么用nested数据类型呢？
:::

在elasticsearch中，默认的索引对每个字段都是数组类型，支持0个或多个值。也就是默认数据类型中，实际存储是这样的：

```json
fist_name: ["Khan","Austin","Lycra"]
second_name: ["Han","Wang","Li"]
```

这种数据类型没办法满足上面的SQL查询，会出现串member匹配，比如会匹配 Austin Han

而nested数据类型是可以支持这种复杂查询。

[参考问答](https://stackoverflow.com/questions/53810743/search-for-multiple-fields-in-a-nested-document-divided-by-an-or-clause-in-elast)