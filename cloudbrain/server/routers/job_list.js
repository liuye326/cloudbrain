const express = require("express");
const pool = require("../pool.js");
const bodyParser = require("body-parser");
var router = express.Router();
router.use( bodyParser.urlencoded({
	extended:false
}) );
//插入工作招聘
router.get("/insert",function(req,res){
	var obj = req.query;
	for(var key in obj){
		if(!obj[key]){
			res.send(key+"值缺失");
			return;
		}
	}
	pool.query("INSERT INTO job_list SET ?",[obj],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//删除工作招聘
router.get("/delete",function(req,res){
	var obj = req.query;
	if(!obj.jid){
		res.send("jid值缺失");
		return;
	}
	pool.query("DELETE FROM job_list WHERE jid=?",[obj.jid],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//更改工作招聘信息
router.get("/update",function(req,res){
	var obj = req.query;
	for(var key in obj){
		if(!obj[key]){
			res.send(key+"值缺失");
			return;
		}
	}
	console.log(obj);
	pool.query("UPDATE job_list SET jname=?,details=?,ed_time=?,place_id=? WHERE jid=?",[obj.jname,obj.details,obj.ed_time,obj.place_id,obj.jid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("1");
		}else{
			res.send("0");
		}
	});
});
//查询招聘
router.get("/search",function(req,res){
	var obj = req.query;
	if(!obj.jid){
		res.send("jid值为空");
	}
	pool.query("SELECT * FROM job_list WHERE jid=?",[obj.jid],(err,result)=>{
		if(err) throw err;
		var arr=result[0];
		res.send(arr);
	});
});
//分页查询
router.get("/list_limit",function(req,res){
	var obj = req.query;
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
	pool.query("SELECT * FROM job_list LIMIT ?,?",[(a-1)*b,b],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

module.exports = router;
