exports.list = async (req,res,next)=>{
	console.log("333");
	var cates = await app.mysql.select("eryi_products_cate",{
		where:{
			type_id:1
		}
	});
	var serviceItems = await app.models.service.getAll();
	for(var i=0;i<cates.length;i++){
		cates[i].services=[];
		for(var j=0;j<serviceItems.length;j++){
			if(serviceItems[j].cate_id==cates[i].cate_id){
				cates[i].services.push(serviceItems[j]);
			}
		}
	}
	res.json({
		error:0,
		data:cates,
		message:"ok"
	});	
}

exports.getDoing=async (req,res,next)=>{
	var employee_id = req.session.employee.employee_id;
	var one  = await app.models.serviceTask.getDoding(employee_id);
		res.json({
			error:0,
			data:one,
			message:'ok'
		})
}

exports.getById=async (req,res,next)=>{
	var one = await app.mysql.get("eryi_products",{products_id:id});
	if(one){
		// console.log(one);
		// one.image_url = qiniu_config.domain+'/'+one.image_name;
		var pics = await app.mysql.select("eryi_products_pic",{
			where:{
				products_id:one.products_id
			}
		});
		one.service_time = one.service_time //转为分钟
		one.pics=[];
		for(var i=0;i<pics.length;i++){
			one.pics.push({
				url:pics[i].original,
				pic_id:pics[i].pic_id
			});
		}
		res.json({
			error:0,
			message:'ok',
			data:one
		});
	}else{
		res.json({
			error:401,
			message:'不存在该项目',
		})
	}	
}

exports.overtime= async (req,res,next)=>{

}




