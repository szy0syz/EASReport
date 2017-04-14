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

> v1版本：通过脚本一键式生成txt格式日报表；

> v2版本：通过网页界面，可以自助生成日报表；

## 目标功能

- [x] v1: 一键式生成日报表 -- 完成
- [x] v2: 加入express自助生成日报 -- 完成
- [x] v2：加入handlerbars和bootstrap提供界面 -- 完成
- [x] v2：核心算法分离封装 -- 完成
- [x] v2：将报表对象读写JSON，方便前端 -- 完成
- [ ] v3：加入babel，使用ES6/7

## 安装

`git clone https://github.com/szy0syz/EASReport.git`

`npm i`

## 使用

`npm run start`