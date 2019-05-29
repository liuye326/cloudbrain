#设置客户端向服务器端的传输编码
SET NAMES UTF8;
#丢弃数据库cloudbrain如果存在
DROP DATABASE IF EXISTS cloudbrain;
#创建数据库cloudbrain，并设置数据库的存储编码
CREATE DATABASE cloudbrain CHARSET=UTF8;
#进入数据库
USE cloudbrain;
#表place-办公地点
CREATE TABLE place(
  pid SMALLINT PRIMARY KEY AUTO_INCREMENT,#地点编号
  pname VARCHAR(6) NOT NULL  #地点名称
);
#岗位job_list-招聘岗位
CREATE TABLE job_list(
  jid INT PRIMARY KEY AUTO_INCREMENT, #岗位编号
  jname VARCHAR(36) NOT NULL UNIQUE, #岗位名称
  details VARCHAR(1024), #详细说明
  rl_time BIGINT, #发布时间
  ed_time BIGINT, #截止日期
  place_id SMALLINT, #办公地点id
  FOREIGN KEY(place_id) REFERENCES place(pid) #设置外键约束
);
#文章article_list-文章列表
CREATE TABLE article_list(
  aid INT PRIMARY KEY AUTO_INCREMENT, #文章编号
  key_word VARCHAR(32),#文章的关键词
  pub_time BIGINT,#文章发布时间
  title VARCHAR(36),#文章的标题
  intro VARCHAR(64),#文章的简介
  content VARCHAR(20000),#文章内容
  sort BOOLEAN #文章的分类：0-新闻，1-科研文章
);
#管理员列表
CREATE TABLE admin_list(
  aid INT PRIMARY KEY AUTO_INCREMENT,#管理员ID
  aname VARCHAR(12),#用户名
  apwd VARCHAR(12)#密码
);
#插入数据
INSERT INTO admin_list VALUE(NULL,"admin","123456");