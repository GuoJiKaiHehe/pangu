const express = require("express");
const app = express();
global.app=app;
var proxy = require('http-proxy-middleware');

require("../common/autoload").autoload(); //引入自动加载模块；
const config = app.config;

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const http = require("http");
const path = require("path");
const cors = require("cors");
const csurf = require('csurf');
const fs = require("fs");
// console.log(app.config,'----');
//挂载在全局上；
const logger = app.logger;

//中间件

const compression = require('compression'); //gzip 压缩
const errorhandler = require("errorhandler");
const server = http.createServer(app);
app.use((req,res,next)=>{
  app.req=req;
  app.res=res;
  next();
});
//设置模板引擎
const expressNunjucks = require('express-nunjucks');
app.set("views",path.join(__dirname,'../views'));
app.set("view engine",'html');

const njk = expressNunjucks(app, {
    watch: __DEV__,
    noCache: __DEV__,
    filters:require("./extend/filters")
});


// app.use('/public', proxy({ target: 'http://localhost:3001', changeOrigin: true })); //这句话的意思就是说，凡是你的ajax请求里面带api的 就还会自动帮你向http://www.example.com这里进行数据请求
app.use(express.static("public"))
// app.engine("html",njk);
app.enable('trust proxy');

//设置中间件
// console.log(app.middlewares);
app.use(app.middlewares.requestLog); //请求时间中间件;
app.use(app.middlewares.renderLog); // 渲染时间;
app.use(require('response-time')()); //相应时间;
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser(config.cookie_secret));
app.use(compression());
app.use(app.middlewares.redisSession.redisSession); //redis 存储session 中间件

// app.get("/test",function(req,res){
//   console.log(req);
//   console.log(req.session.kehuduan);
// 	res.send('111');
// });
//初始化控制器；
//初始化模型；
if(!config.debug){ //如果不是debug模式，开启视图缓存；
  app.set('view cache', true);
}

app.use(function (req, res, next) {
  console.log(req.path,req.path.indexOf("/vendor"));
  // if (req.path === '/api' || req.path.indexOf('/api') === -1 || req.path.indexOf('/vendor')===-1) {
    if(req.path.indexOf("/private")>-1){
      next();
    }else{
      csurf()(req, res, next);
    }
    // return;
  // }
});
_.extend(app.locals, {
  config: config,
  console:console,
  ...app.common.render_helper
});

app.use('/private',require("./routes/private"));
// app.use('/index',require("./routes/index"));

// error handler

if(config.debug){
	app.use(errorhandler())//错误处理；
}
app.use(function(err, req, res, next) {

  // res.status(err.status || 500);
  res.serverError(err);
});


server.on("error",function(error){
if (error.syscall !== 'listen') {
    throw error;
  }
  var port = config.port;
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
var errorText;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
    	errorText=bind + ' requires elevated privileges'
      process.exit(1);
      break;
    case 'EADDRINUSE':
      errorText=bind + ' is already in use';

      // console.error();
      process.exit(1);
      break;
    default:
      throw error;
  }
  app.logger.error(errorText);	
});

server.on("listening",function(){
  // console.log(app);
   var addr = server.address();
   // console.log(server);
	 console.log(addr,'workerid:');
   if(addr.port==80){
     // app.config.hostname=addr.address;
   }else{
    // app.config.hostname=addr.address+':'+addr.port;
   }
})

console.log('process.argv:',process.argv)

module.exports=server;


	