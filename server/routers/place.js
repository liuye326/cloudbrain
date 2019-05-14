const express = require("express");
const bodyParser = require("body-parser");
const pool = require("../pool.js");
var router = express.Router();
router.use( bodyParser.urlencoded({
	extended : false
}));
//列表
router.get("/list",(req,res)=>{
	pool.query("SELECT * FROM place",(err,result)=>{
		if(err) throw err;
		res.send(result);
		//console.log(result);
	});
});
//分页查询
router.get("/list_limit",(req,res)=>{
	var obj = req.query;
	var a = Number(obj.pno);
	var b = Number(obj.count);
	if(!obj.pno){
		a = 1;
	}
	if(!obj.count){
		b = 3;
	}
	pool.query("SELECT * FROM place LIMIT ?,?",[(a-1)*b,b],function(err,result){
		if(err) throw err;
		res.send(result);
	});
	
});
//单个查询
router.get("/list_search",(req,res)=>{
	var obj = req.query;
	//console.log(obj);
	if(!obj.pid){
		res.send("pid不能为空");
		return;
	}
	pool.query("SELECT * FROM place WHERE pid=?",[obj.pid],(err,result)=>{
		if(err) throw err;
		res.send(result[0]);
		//console.log(result[0]);
	});
});
//删除
router.get("/del",(req,res)=>{
	var obj = req.query;
	if(!obj.pid){
		res.send("编号不能为空");
	}
	pool.query("DELETE FROM place WHERE pid=?",[obj.pid],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});

});
//插入
router.post("/insert",(req,res)=>{
	var obj = req.body;
	for(var key in obj){
		if(!obj[key]){
			res.send(key+"不能为空");
			return;
		}
	}
	pool.query("INSERT INTO place SET ?",[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});

//更改
router.get("/update",(req,res)=>{
	var obj = req.query;
	for(var key in obj){
		if(!obj[key]){
			res.send(obj,"不能为空");
			return;
		}
	}
	pool.query("UPDATE place SET pname=? WHERE pid=?",[obj.pname,obj.pid],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0){
			console.log("aaa");
			res.send("1");
		}else{
			res.send("0");
		}
	});
});

module.exports = router;