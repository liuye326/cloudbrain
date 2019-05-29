const express = require("express");
const pool = require("../pool.js");
const bodyParser = require("body-parser");
var router = express.Router();
router.use( bodyParser.urlencoded({
	extended:false
}) );
//测试
//router.get("/test",function(req,res){
//	res.send("test 测试");
//});
//插入文章
router.get("/insert",function(req,res){
	var obj=req.query;
	//	console.log(obj);
	for(var key in obj){
		if(!obj[key]){
			res.send(key+"值为空");
			return;
		}
	}
	pool.query("INSERT INTO article_list SET ?",[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//获取文章列表（分页）
router.get("/getlist_limit",function(req,res){
	var obj=req.query;
	var a,b;
	if(obj.pno.length>0){
		a=Number(obj.pno);
	}else{
		a=1;
	}
	if(obj.count.length>0){
		b=Number(obj.count);
	}else{
		b=3;
	}
	pool.query("SELECT * FROM article_list LIMIT ?,?",[(a-1)*b,b],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//获取文章列表
router.get("/getlist_all",function(req,res){
	pool.query("SELECT * FROM article_list",(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//删除文章
router.get("/del",function(req,res){
	var obj = req.query;
	if(!obj.aid){
		res.send("aid值为空");
		return;
	}
	pool.query("DELETE FROM article_list WHERE aid=?",[obj.aid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//查询文章详情
router.get("/get",(req,res)=>{
	var obj = req.query;
	if(!obj.aid){
		res.send("aid值为空");
	}
	pool.query("SELECT * FROM article_list WHERE aia=?",[obj.aid],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
module.exports=router;