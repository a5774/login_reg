const http = require('http');
const fs = require('fs')
const servive = http.createServer((req, res) => {
    req.setEncoding("utf-8")
    req.addListener('data', data => {
        // console.log(data);//body
    })
    console.log(req.url.includes('img'));
    if(req.url.includes('img')){
        console.log( req.headers)
        res.setHeader('Content-Type','image/jpeg')
        res.setHeader("Set-Cookie","img=CA")
        fs.readFile('./File.jpg',{encoding:'binary'},(err,data)=>{
            if (err) console.log(err);
            // console.log( data );
            res.end(data,'binary')
        })
    }else if(req.url.includes("data")){
    console.log( "==========");
    // same domian ,path cookie will send server 
    console.log("cookie:" + req.headers.cookie );
    console.log(req.url)//query/params 
    console.log( req.headers)
    console.log(req.method );
    res.setHeader("myresponse","root")
    // 浏览器发送预检请求，服务器响应对应策略,非跨域下， dont has method，header，orgin limit
    // 允许所有域共享
    // res.setHeader("Access-Control-Allow-Origin","*");
    // 在存在凭据请求下：credentials:'include',’*‘将失效
    res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5501");
    // 允许客户端获取资源的方法
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    // 允许客户端请求头出现的头部信息  simple headers: Accept、Accept-Language、Content-Language、Content-Type(application/x-www-form-urlencoded, multipart/form-data 或 text/plain)
    // 非简单请求需在预检请求的响应头声明策略
    res.setHeader("Access-Control-Allow-Headers","myresponse,Content-Type,myheader,token");
    // credentials:'include',’*‘将失效
    // res.setHeader("Access-Control-Allow-Headers",'*');
    // 允许响应头暴露至客户端,需构造器中的credentials 选项结合使用,是否接受携带凭据（cookie）进行实际的请求。
    res.setHeader("Access-control-allow-credentials", true);
    // 客户端可以访问到响应头首部字段条目
    // res.setHeader("Access-Control-Expose-Headers","Content-Type,myresponse") 
    // 非简答响应头暴露至客户端条目,credentials:'include',’*‘将失效
    // 简单响应头在携带凭据下，*失效，需指定简单响应头条目
    res.setHeader("Access-Control-Expose-Headers","*") 
    // /s cors策略被客户端缓存过期时间，过期将重新发送预检
    res.setHeader("Access-Control-Max-Age","1000") 

    
    res.setHeader("Set-Cookie","n=s;max-age=1000");
    // res.setHeader("Set-Cookie","name=server;max-age=1000;Same-Site=None");
    // res.setHeader("Set-Cookie",`name=server;domain=${res.headers.origin};max-age=1000`);


    // console.log( res.getHeader("set-cookie") );
    fs.readFile('./data.json', { encoding: 'utf-8', flag: 'r+' }, (err, data) => {
        if(err) console.log( err );
        res.end(data);
    })
}else{
    res.end('404 found')
}      
})
servive.listen(8080, () => {
    console.log('start_prot:8080');
})



