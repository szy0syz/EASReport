# 项目问题记录

## 2017-08-02

- 在使用FCreateTime时，因为是具体到毫秒级的（2017-07-02 10:56:35.867），所以用`between 20170801 and 20170801`是过滤不到数据的，endDate得+1；所以得加判断，如果是单独只要1号数据得特殊处理。
- 这算是sql语句的坑吗