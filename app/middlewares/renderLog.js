var logger =app.logger;

module.exports=function(req,res,next){
	 res._render = res.render;
	 res.render=function(view,options,fn){
	 	let t = Date.now();
	 	res._render(view,options,fn);
	 	let duration= Date.now()-t;
	 	logger.info('render view duration: ',+duration+' ms');
	 }
	 next();
}