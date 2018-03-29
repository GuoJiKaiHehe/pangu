var ioCookieParser = require('socket.io-cookie');
module.exports=function(io){
	io.on("ping",(msg)=>{
		console.log(msg);
	});
	io.use(ioCookieParser);
	io.use(app.io.middlewares.ePsessionAuth);
}