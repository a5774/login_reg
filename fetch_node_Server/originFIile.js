const http = require('http');
const fs = require('fs')
const servive = http.createServer((req, res) => {
    let body = '' ;
    req.setEncoding('binary')
    req.addListener('data', data => {
        // console.log(data);//body
        body+=data;
    })
    req.addListener('end',()=>{
        console.log(body );
        fs.writeFile('./File.jpg',body,{flag:"a+",encoding:'binary'},(err)=>{
            if(err) throw err;
        })
    })
    console.log( "==========");
    // same domian ,path cookie will send server 
    console.log("cookie:" + req.headers.cookie );
    console.log(req.url)//query/params 
    console.log( req.headers)
    console.log(req.method );
    // 浏览器发送预检请求，服务器响应对应策略
    // 允许所有域共享
    res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5501");
    // 允许客户端获取资源的方法
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    // 允许客户端请求头出现的头部信息  simple headers: Accept、Accept-Language、Content-Language、Content-Type(application/x-www-form-urlencoded, multipart/form-data 或 text/plain)
    // 非简单请求需在预检请求的响应头声明策略Content-Type
    // res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,*");
    // res.setHeader("Access-Control-Allow-Headers", "myheader,*");
    res.setHeader("access-control-allow-credentials", true);
    // 如果想要让客户端可以访问到其他的首部信息，可以将它们在 Access-Control-Expose-Headers 里面列出来。
    // res.setHeader("Access-Control-Expose-Headers","Content-Type");

    res.setHeader("Set-Cookie","name=server;max-age=1000");
    // res.setHeader("Set-Cookie",`name=server;domain=${res.headers.origin};max-age=1000`);

    // res.setHeader("myresponse","root")

    // console.log( res.getHeader("set-cookie") );
    fs.readFile('./data.json', { encoding: 'utf-8', flag: 'r+' }, (err, data) => {
        if(err) console.log( err );
        res.end(data);
    })
})
servive.listen(8080, () => {
    console.log('start_prot:8080');
})


