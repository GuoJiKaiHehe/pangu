
module.exports=function(req,res,next){
		
		// res.locals._layoutFile='layouts/private/private.html';
		// res.locals.csrfToken=req.csrfToken();
		res.locals.req=req;
		var method = req.method.toLowerCase();
		var isGet = method=='get';
		var isPost = method=='post';

		var isAjax = (req.headers['x-requested-with']=='XMLHttpRequest') || (req.headers['x-eryi-ajax'] == 'taolineryi');
		var userAgent =  req.headers['user-agent'].toLowerCase();
		if(!isAjax && isGet && !req.session.employee) return res.json({error:403,msg:"没权限"});
		if(isAjax && !req.session.employee) return res.json({error:433,msg:"没有权限，请登录"}); 
		
		if(isGet && !isAjax){ //GET 请求并且不是ajax；
			// console.log('X-Requested-With',req.headers['X-Requested-With'])
		}
		next();
	
}


