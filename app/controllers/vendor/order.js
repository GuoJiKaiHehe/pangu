exports.getPaysSales = async (req,res)=>{
	var payments = await app.mysql.select("eryi_payment",{
			where:{
				status:1
			}			
		});
	var body = req.body;
		body.store_id = req.session.employee.store_id;
	for(var i=0;i<payments.length;i++){
		body.payment_id = payments[i].pay_id;
		payments[i].money = await app.models.order.getSale(body);
	}
	res.json({
		error:0,
		data:payments
	});
}

exports.getSale=async (req,res)=>{
	var body = req.body;
		body.employee_id = req.session.employee.employee_id;
		body.store_id = req.session.employee.store_id;
	var rs = await app.models.order.getSale(body);
		res.json({
			error:0,
			message:"ok",
			data:rs
		});
}