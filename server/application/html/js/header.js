ajax({
	url:"http://127.0.0.1:5500/cloudbrain/server/application/html/header.html",
	type:"get"
})
.then(res=>{
    // 把接收的响应放入 index首页的html div标签中
    document.getElementById("header").innerHTML=res;
    //header.innerHTML=res;
})