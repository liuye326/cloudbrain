//导入外部模块
const express = require("express");
const pool = require("../pool.js");
const bodyParser = require("body-parser");

//创建路由器
var router = express.Router();
//路由器使用body-parser
router.use( bodyParser.urlencoded({
	extended:false
}) );

//登录
router.get("/login",(req,res)=>{
    var obj = req.query;
    console.log(obj);
    for(var key in obj){
        if(!obj[key]){
            res.send(key+"值为空");
            return;
        }
    }
    pool.query("SELECT * FROM admin_list WHERE aname=? AND apwd=?",[obj.aname,obj.apwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send("1");
        }else{
            res.send("0");
        } 
    });
});
//新增用户
router.get("/insert",(req,res)=>{
    var obj = req.query;
    console.log(obj);
    for(var key in obj){
        if(!obj[key]){
            res.send(key+"值为空");
            return;
        }
    }
    pool.query("INSERT INTO admin_list SET ?",[obj],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});
//用户列表
router.get("/getlist",(req,res)=>{
    pool.query("SELECT * FROM admin_list",(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});
//删除用户
router.get("/del",(req,res)=>{
    var obj = req.query;
    if(!obj.aid){
        res.send("aid值为空");
        return;
    }
    pool.query("DELETE FROM admin_list WHERE aid=?",[obj.aid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send("1");
        }else{
            res.send("0");
        }
    });
});
//导出router
module.exports = router;