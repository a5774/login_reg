const fs = require('fs');

let reads =fs.createReadStream('/',{
    start:0,
    end:10,
    highWaterMark:10*1024,
    flags:"r+",
    fd:fs.openSync('./data.json'),
})

reads.addListener('readable',()=>{
    console.log( 'readable_emit_count');
    reads.read(5)
    
}).resume()//流动模式
// readable暂停模式仍可触发data事件，移除readable句柄将进入流动模式
reads.addListener('data',data=>{
    console.log( 'data_emit_count');
    console.log( data);
}).pause()//切换至暂停模式


fs.stat('./data.json',(err,state)=>{
    console.log(state);
})
fs.opendir('./',{bufferSize:64},(err,dir)=>{
    // 回调读取下一个目录条目
   dir.read((err,dirent)=>{
       console.log( dirent);
   })
   dir.read((err,dirent)=>{
       console.log( dirent.isDirectory);
   })
})
fs.readdir('./',{withFileTypes:true},(err,dirent)=>{
    console.log( dirent[0] );
})

