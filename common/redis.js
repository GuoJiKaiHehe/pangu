
const Redis = require("redis");
const config = app.config;
const bluebird = require("bluebird");
const client = Redis.createClient({
  port: config.redis_port,
  host: config.redis_host,
  db: config.redis_db,
  password: config.redis_password,
  prefix:'eryi'
  // prefix:config.redis.prefix,
});
client.on("connect",()=>{
	app.logger.info("connect to redis successfull");
})
client.on("error",function(err){
	if(err){
		app.logger.error('connect to redis error, check your redis config',err);
		process.exit(1);
	}
})
client.select(1,()=>{
	console.log('默认：选择1号');
})
// client.set("string key", "string val", redis.print);
bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);
module.exports=client;