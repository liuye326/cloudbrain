//加载第三方模块
const express = require("express");
const placeRouter = require("./routers/place.js");
const jobRouter = require("./routers/job_list.js");
const articalRouter =require("./routers/artical_list.js");
const adminRouter =require("./routers/admin_list.js");

//创建服务器
var server = express();
server.listen(8080);
//设置静态资源存储
server.use( express.static( "public" ) );
//挂载路由器
server.use("/place",placeRouter);
server.use("/job",jobRouter);
server.use("/artical",articalRouter);
server.use("/admin",adminRouter);