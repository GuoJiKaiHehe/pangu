exports.getById= async (req,res,next)=>{
	var store_id = req.body.store_id;
	var store = await app.models.store.getById(store_id);
	res.json({
		error:0,
		data:store,
		message:"ok"
	})
}
exports.list = async (req,res,next)=>{
	const stores =  await app.mysql.select("eryi_store",{
		where:{
			status:1
		}
	});
	res.json({
		error:0,
		data:stores,
		message:"ok"
	})
}












