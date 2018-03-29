exports.index= async (req,res,next)=>{
	// console.log("test",app.tools.getIp(req));
	// console.log(this.ttt());
	res.send('test');
	// try{
	// 	var conn = await app.mysql.beginTransaction();
	// 	console.log(conn.query);
	// 	const rs = await conn.update("eryi_test",{
	// 			name:"333"
	// 		},{
	// 			where:{
	// 				id:1
	// 			}
	// 		});	
	// 		res.send(rs);	
	// 		await conn.commit();
	// }catch(err){
	// 	await app.mysql.rollback();
	// 	throw err;
	// }

	// const rs = await app.mysql.update("eryi_test",{
	// 	name:"2222"
	// },{
	// 	where:{
	// 		id:33
	// 	}
	// });
	// console.log(rs);
	
}

exports.ttt=function(){
	console.log('tttt',this.index);
}
