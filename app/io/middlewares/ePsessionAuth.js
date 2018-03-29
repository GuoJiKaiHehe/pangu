module.exports=function(socket,next){
	// console.log(socket.request,'socket.request.session');
	var cookie = socket.request.headers.cookie;
	// console.log(socket.request);
	if(cookie && cookie['connect.sid']){
		var sessionId = cookie['connect.sid'].slice(2);
		// console.log(app.redis.hgetall);
		// app.redis.hget("sess",(err,obj)=>{
		// 	console.log(obj,err);
		// })
		// app.redis.rpush("aa",[11,33],(err,result)=>{
		// 		console.log(err,result);
		// })
		// app.redis.hset('filed002', 'key001', 'wherethersisadoor', function (err, res) {
		// 	console.log(err,res);
		// })
		console.log(sessionId);
		var index = sessionId.indexOf(".");
		var sessionIdKey =  sessionId.slice(0,index);
		console.log(sessionIdKey)
		app.middlewares.redisSession.redisStore.get(sessionIdKey,(err,res)=>{
				// console.log(err,res,'---');
		});
	}else{
		next(new Error("NOT_VALID_SESSION"));
	}
	// console.log(app.config.redis.prefix)
		// app.redis.hgetall("eryi",(err,result)=>{
		// 	console.log(cookie,sessionId);
		// 	console.log(err,result,'-----')
		// })
	// next();
}
// s:xLgFRkevFqqWMHodEtWpFIj1gfYFDDwl.YDSWooiuX/f6Dl0sSFu5keqMQbNk+ezAp2p6Ndeygac


// xLgFRkevFqqWMHodEtWpFIj1gfYFDDwl.YDSWooiuX/f6Dl0sSFu5keqMQbNk+ezAp2p6Ndeygac
