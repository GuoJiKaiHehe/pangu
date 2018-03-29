const utility = require('utility');
const path = require('path');

exports.submitLogin=async (req,res,next)=>{
	var body = req.body;
	if(!body.account) return res.json({error:401,message:"账号不得为空"});
	if(!body.password) return res.json( {error:401,message:"密码不得为空"});	
		let ip = app.tools.getIp(req);
		var ip_data = await app.mysql.get("eryi_sys_ip",{
			ip:ip
		});
		if(ip_data){
			return res.json({
				error:403,
				message:'ip受限制了'
			});
		}		
		try{
			var obj = {
				account:body.account.trim(),
				password:body.password.trim()
			}
			var employee  = await app.models.employee.login(obj,req)
			res.json({
				error:0,
				message:'欢迎你回来！',
				data:employee,
				// redirect:'/vendor'
			});			
		}catch(err){
			res.json({
				error:401,
				message:err.message
			});			
		}		
}

exports.getAchievement = async (req,res,next)=>{
	try{
		var employee_id = req.session.employee.employee_id;
		var money = await app.models.employee.getAchievementMoney(req.body.start_time,req.body.end_time,employee_id);
		res.json({
			error:0,
			message:'ok',
			data:money
		});	
	}catch(err){
		console.log(err);
		res.json({
			error:0,
			message:err.message
		})
	}


}
exports.getAchievementList=async (req,res,next)=>{
	var body = req.body;
	body.employee_id = req.session.employee.employee_id;
	var rs = await app.models.employee.getAchievementList(body);
	res.json({
		error:0,
		data:rs
	});	
}

exports.checkLogin = async (req,res,next)=>{
	console.log(req.session.employee)
	if(req.session.employee){
		res.json({
			error:0,
			data:req.session.employee
		})
	}else{
		res.json({
			error:433,
			message:"还没有登录"
		});
	}
} 

exports.logout=async (req,res,next)=>{
		if(req.session.employee){
			delete req.session.employee;
		}
		res.json({
			error:0,
			message:"退出成功",
			redirect:"/vendor/login"
		});		
}


exports.punchclock= async (req,res,next)=>{

	console.log(req.body);
	// return;
	var employee = req.session.employee;
	var store_id = req.body.store_id;
	
	var date = new Date();
		date.setHours(0);
		date.setSeconds(0);
		date.setMinutes(0);	
		var date2 = new Date(date);
		date2.setDate(date2.getDate()+1);
		var today_timestamp = Math.round(date.getTime()/1000);
		var tomorrow_timstamp = Math.round(date2.getTime()/1000);
	 try{
		var sql = `
				select
					*
				from 
					eryi_attendance
				where
					(created_at > ${today_timestamp}
				and 
					created_at < ${tomorrow_timstamp}
					)
				and 
					employee_id=${employee.employee_id}
			`;	 
		var rss = await app.mysql.query(sql);
		var row = rss[0];
		const conn = await  app.mysql.beginTransaction();
		if(rss && rss.length>=2){
			throw new Error("今天已经无需打卡");
		}	
		var obj = req.body;
		var address = await app.plugins.gaode.getAddrByLongLat(obj.long+","+obj.lat);
		var insertObj = {
					type:2,
					store_id:obj.store_id,
					employee_id:req.session.employee.employee_id,
					created_at:utility.timestamp(),
					updated_at:utility.timestamp(),
					user_agent:req.headers['user-agent'],
					lat:obj.lat,
					long:obj.long,
					address:address,
					ip:app.tools.getIp(req),
		};
		if(row && row.type==1){
			insertObj.type=2;		

		}else{
			insertObj.type=1;
		}		
		await conn.insert("eryi_attendance",insertObj);

		await conn.update("eryi_employee_login",{
			work_status:insertObj.type
		},{
			where:{
				employee_id:employee.employee_id
			}
		});
		await conn.commit();
		if(insertObj.type==1){//如果上班的时候；就执行； 
			req.session.employee.store_id = store_id;
			if(employee.cate_id){
				var key= store_id+":"+employee.cate_id;
				var a= await app.models.sequential.add(key,employee.employee_id);
				console.log(a,'---');
			}
		}


		res.json({
			error:0,
			message:"打卡成功"
		});
	 }catch(err){
		res.json({
			error:401,
			message:err.message
		})	 	
	 }

}

exports.getInfo = async (req,res,next)=>{
	var employee_id = req.session.employee.employee_id;
	var info = await app.mysql.get("eryi_employee_info",{
		employee_id:employee_id
	});
	res.json({
		error:0,
		data:info,
		message:"ok"
	});	
}

exports.setInfo = async (req,res,next)=>{
	var body =  req.body;
	// console.log(body);
	var graduate_time,
		start_work_time,
		birth_day;
	if(!body.graduate_time){
		graduate_time = body.graduate_time|0;
	}else{
		graduate_time = Math.round(new Date(body.graduate_time).getTime()/1000);	
	}
	if(!body.start_work_time){
		start_work_time = body.start_work_time|0;
	}else{
		start_work_time = Math.round(new Date(body.start_work_time).getTime()/1000);
	}
	if(!body.birth_day){
		birth_day = body.birth_day|0;
	}else{
		birth_day = Math.round(new Date(body.birth_day).getTime()/1000);
	}		

	var a= await app.mysql.update('eryi_employee_info',{
			name:body.name,
			sex:body.sex|0,
			nation:body.nation,
			birth_day:birth_day,
			id_code:body.id_code,
			political_outlook:body.political_outlook,
			is_marry:body.is_marry|0,
			graduate_school:body.graduate_school,
			education:body.education,
			graduate_time:graduate_time,
			start_work_time:start_work_time,
			major:body.major,
			reg_residence:body.reg_residence,
			native_place:body.native_place,
			zip_code:body.zip_code,
			address:body.address,
			mobile_phone:body.mobile_phone,
			contact_phone:body.mobile_phone,
			email:body.email,
	},{
		where:{
			id:body.id
		}
	});
	if(a.affectedRows){
		res.json({
			error:0,
			message:"修改成功"
		});
	}else{
		res.json({
			error:401,
			message:'修改失败'
		});
	}	

}

exports.modifyPass= async (req,res,next)=>{
	try{
		var employee_id = req.session.employee.employee_id;
		var a = await ctx.service.employee.modifyPass(req.body,employee_id);		
		res.json({
			error:0,
			message:'ok'
		});		
	}catch(err){
		res.json({
			error:401,
			message:err.message
		});
	}	
}



//获取轮牌列表；
exports.getSequential=async (req,res,next)=>{
	// var store_id 
	// app.redis.
	try{
	var cates = await app.mysql.select("eryi_employee_cate");
	var store_id = req.session.employee.store_id;
	var emp_ids =[];
	var key="";
	for(var i=0;i<cates.length;i++){
		key=store_id+':'+cates[i].cate_id;
		var is_exists = await app.redis.existsAsync(key);
		if(is_exists){
			var ids = await app.redis.getAsync(key)
			 	ids = JSON.parse(ids);
				console.log(ids,'----');
			var obj={
				cate_name:cates[i].cate_name,
				ids:ids
			}
			emp_ids.push(obj);
		}
	}
	// console.log(emp_ids);
	// var 

	var count = 0;
	// emp_ids.forEach((item)=>{
	// 	count+=item.ids.length;
	// });
	
		for(var i=0;i<emp_ids.length;i++){
			var item = emp_ids[i];
			count+=item.ids.length;
			if(item.ids.length){
				item.emps = await app.mysql.select('eryi_employee_login',{
						where:{
							employee_id:item.ids
						}
				});
			}else{
				item.emps=[];
			}
		}
		
	}catch(err){
		console.log(err);
	}
	res.json({
		error:0,
		message:'ok',
		data:{
			rows:emp_ids,
			count:count
		}
	})
}





