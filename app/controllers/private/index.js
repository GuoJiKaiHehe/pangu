exports.login=function(req,res,next){
	res.render("private/login");
}
exports.submitLogin=async (req,res,next)=>{
	var body = req.body;
	if(!body.login_name){
		return res.json({
			error:401,
			message:"登录名不得为空"
		})
	}
	if(!body.password){
		return res.json({
			error:401,
			message:"登录名不得为空"
		})
	}
	var admin = await app.mysql.get("pangu_admin",{
			login_name:body.login_name,
			password:body.password
	});
	if(admin){
		req.session.admin=admin;
		res.json({
			error:0,
			message:"ok",
			redirect:"/private"
		});
	}else{
		return res.json({
			error:401,
			message:"帐号或者密码不正确"
		})
	}

}
exports.index=function(req,res,next){
	res.render("private/index");
}
