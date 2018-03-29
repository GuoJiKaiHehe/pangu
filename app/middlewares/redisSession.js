const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const config = app.config;
const store = new RedisStore({
		port: config.redis_port,
		host: config.redis_host,
		db: config.redis_db,
		pass: config.redis_password,
		maxAge:1000
	});
// console.log(store.get("sess"));
// store.get("xLgFRkevFqqWMHodEtWpFIj1gfYFDDwl",(err,res)=>{
// 	console.log(err,res);
// })
exports.redisStore = store;
exports.redisSession = session({
	secret: config.session_secret,
	store: store,
	resave: false,
	saveUninitialized: false,
})

