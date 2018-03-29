exports.list=async (req,res,next)=>{
		var store_id = req.body.store_id|0;
		
		var chairs = await app.mysql.select("eryi_chair",{
			where:{
				store_id:store_id,
				is_delete:0				
			}
		});	
		for(var i=0;i<chairs.length;i++){
			if(chairs[i].task_id){
				chairs[i].task = await app.mysql.get("eryi_service_task",{
					task_id:chairs[i].task_id
				});
			}
		}	
		res.json({
			error:0,
			data:chairs,
			message:"ok"
		})			
		
}
exports.getById = async (req,res,next)=>{
	var chair_id = req.body.chair_id;
	var one = await app.mysql.get("eryi_chair",{chair_id:chair_id});
	if(one.status!=0 && one.task_id!=0){
		//表示有
		// one.task_id
		one.task = await app.models.serviceTask.getById(one.task_id);
		one.product =  await app.mysql.get("eryi_products",{
			products_id:one.task.products_id
		});
		one.employee =  await app.mysql.get("eryi_employee_login",{
			employee_id:one.task.employee_id
		});
		one.store = await app.mysql.get("eryi_store",{
			store_id:one.store_id
		});
		one.overtime = await app.mysql.select("eryi_employee_overtime",{
			where:{
				task_id:one.task_id
			}
		});
	}
	return res.json({
		error:0,
		data:one,
		message:"ok"
	});
		
}


