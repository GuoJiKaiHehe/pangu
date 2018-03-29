const logger={};

logger.info=function(){
	var str=[].join.call(arguments,'\n');
	console.log('------------\n'+str.green,'error');
}
logger.error=function(){
	var str=[].join.call(arguments,'\n');
	console.log('------------\n'+str.red,'error');	
}
module.exports=logger;