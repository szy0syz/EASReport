<div align="center">
      <img src="http://ofx24fene.bkt.clouddn.com//img/2017/Kingdee-EAS.jpg">
  <h1>EASReport</h1>
  <p>  
      这是一个 nodejs + express + sequelize … 实现的 个人项目  <br/>
      它可以一键式生成EAS各项文字或图形报表
  <p>
</div>

## 开发背景

因XX每天需要用金蝶EAS查询数据制作日报表，性质属于重复机械化劳动，故开发此系统。

## 实现介绍

本项目主要使用Sequelize的原始查询数据库生成原始数据，然后再搭载Express框架分析处理数据后对外提供服务。其中原始查询使用了两年前做BI——Tableau用的SQL语句查询。

## 技术栈

nodejs + express + sequelize + sql + bluebird + handlerbars + bootstrap

## 版本介绍

### v1版本

通过脚本一键式生成txt格式日报表；

### v2版本

- 通过网页界面，可以自助生成日报表
- ES5、字符串拼接报表
- v2版本时我刚接触js，完全不知道promise，我竟然会用bluebird
- 流程：get请求生成某个日期的日报表，bluebird分别生成三个逻辑，两个sql和一个存储过程，然后bluebird套三个查询执行promise.all，sequlize原生查询后返回结果，最后根据结果处理逻辑生成进、销、存对象，然后再交给报表生成逻辑生成报表

### v3版本

- 本来应该async/await、Koa、sequlize、decorator，最后还是按模块开发

## 目标功能

- [x] v1: 一键式生成日报表 -- 完成
- [x] v2: 加入express自助生成日报 -- 完成
- [x] v2：加入handlerbars和bootstrap提供界面 -- 完成
- [x] v2：核心算法分离封装 -- 完成
- [x] v2：将报表对象读写JSON，方便前端 -- 完成
- [ ] v3：bable、es6/7

## 安装

```bash
git clone https://github.com/szy0syz/EASReport.git

npm install
```

## 使用

```bash
npm run start
```

## 总结

目前改项目仅解决公司内部自身需求，不通用，后期将分离核心算法，仿Tableau功能用JavaScript实现。
