const path = require("path");
const fs = require("fs");
const rootPath = path.join(__dirname,'../');
const _ = require("lodash");
const async = require("async");

exports.autoload=function(){
	app. _ = _ ;
	global._ = _;
	global.async=async;
	app.config={};
	let config_dir = path.join(rootPath,'config');
	readFiles(config_dir,app.config);	

	app.config= _.extend(...Object.values(app.config));
	app.plugins = {};
	let plugins_dir = path.join(rootPath,'app/plugins');
	readFiles(plugins_dir,app.plugins)	
	
	//引入schema
	app.common = {};
	let common_dir = path.join(rootPath,'common');
	readFiles(common_dir,app.common);	
	
	//挂载个别到app上；
	app.logger=app.common.logger;
	app.tools = app.common.tools;
	app.cache=app.common.cache;	
	app.redis = app.common.redis;

	app.models = {}; //模型
	let models_dir = path.join(rootPath,'app/models');
	readFiles(models_dir,app.models);	

	app.controllers = {}; //控制器
	let controllers_dir = path.join(rootPath,'app/controllers');
	readFiles(controllers_dir,app.controllers);		

	
	app.middlewares = {};
	let middlewares_dir = path.join(rootPath,'app/middlewares');
	readFiles(middlewares_dir,app.middlewares)

	app.io={};
	app.io.middlewares={};
	let io_middlewares_dir = path.join(rootPath,'app/io/middlewares');
	readFiles(io_middlewares_dir,app.io.middlewares);
	app.io.controllers={};
	let io_controllers_dir = path.join(rootPath,'app/io/controllers');
	readFiles(io_controllers_dir,app.io.controllers);	
	

}
function  readFiles(dir,obj){
	if(!fs.existsSync(dir)){
		return;
	}
	var files=fs.readdirSync(dir).filter((file)=>{

		if(file.indexOf(".")==0){
			 return false; 
		}else if(isFile(path.join(dir,file)) && path.extname(file) == '.js'){
			return true;
		}else if(isDir(path.join(dir,file))){
			return true;
		}
	});
	files.forEach((file)=>{
		var stat = fs.statSync(path.join(dir,file));
		if(stat.isDirectory()){
			var ndir = path.join(dir,file);
			obj[file]={};
			readFiles(path.join(dir,file),obj[file]);
		}else{
			var index=file.lastIndexOf('.');
			obj[file.slice(0,index)] =  require(path.join(dir,file));
		}
	})
	
}

function isFile(dir){
	var stat = fs.statSync(dir);
	return stat.isFile();
}
function isDir(dir){
	var stat = fs.statSync(dir);
	return stat.isDirectory();
}









