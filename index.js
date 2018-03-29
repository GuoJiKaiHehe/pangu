require('colors');
global.__DEV__=true;


var start_time = Date.now();
console.log('start:',start_time);
const path = require('path');
const server = require("./app/app");

var io = require('socket.io')(server,{
});

const config = app.config;
const logger = app.logger;
global.logger=logger;
app.baseDir=__dirname;
global.sleep=function(second){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			resolve('ok');
		},second*1000)
	})
}


process.on("exit",(code)=>{
	 console.log('退出码为:', code);
});
/*const host = app.address().address
const port = app.address().port*/
// console.log(server);

io.on('connection', function(){ 
	console.log("socket.io.connection");
	require("./app/routes/routes.io")(io);
});


server.listen(config.port,()=>{
	var second = Math.round((Date.now()-start_time)/1000);
	console.log('耗费时间:',second+'s');
});

