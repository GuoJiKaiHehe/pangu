const utility = require('utility');
const axios = require('axios');
const path = require("path");
const fs = require('fs');

exports.getAddrByLongLat = async (location)=>{
	return new Promise(async (resolve,reject)=>{
				var gaode_config = await this.getConfig();
				console.log(gaode_config);
				if(!gaode_config.key || !gaode_config.private_key ){
					return reject(new Error("高德配置不存在，请联系管理员"));
				}			
				var params={
					location:location,
					key:gaode_config.key,
				};		
			var paramsarr=[];
			Object.keys(params).forEach((key)=>{
				paramsarr.push( key+'='+params[key]);
			});
			var sig = utility.md5(paramsarr.sort().join("&")+gaode_config.private_key);
			// console.log(sig,paramsarr.sort().join("&")+gaode_config.private_key,'----');
			params.sig=sig;				
			var base_url= 'http://restapi.amap.com/v3/geocode/regeo';
			axios({
				method:'GET',
				url:base_url,
				params:params
			}).then((res)=>{
				var result = res.data;
				console.log(result)
				if(result.status==1){
					resolve(result.regeocode.formatted_address);
				}else{
					reject(result);
					console.log(result)
				}
			}).catch((err)=>{
				reject(err);
			})		

		})	
}
exports.getLongLatByAddr = async (addr)=>{
		return new Promise(async (resolve,reject)=>{
			var gaode_config = await this.getConfig();
			console.log(gaode_config);
			if(!gaode_config.key || !gaode_config.private_key ){
				return reject(new Error("高德配置不存在，请联系管理员"));
			}
			var params={
				address:addr,
				key:gaode_config.key,
			};
			// {"private_key":"b7eb73e6a7960891eb0274fad5c9bebf","key":"c31bef2549f1afd97459191f68645fc0"}	
			var paramsarr=[];
			Object.keys(params).forEach((key)=>{
				paramsarr.push( key+'='+params[key]);
			});
			var sig = utility.md5(paramsarr.sort().join("&")+gaode_config.private_key);
			// console.log(sig,paramsarr.sort().join("&")+gaode_config.private_key,'----');
			params.sig=sig;
			var base_url= 'http://restapi.amap.com/v3/geocode/geo';					
			axios({
				method:'GET',
				url:base_url,
				params:params
			}).then((res)=>{
				var result = res.data;
				console.log(result,'get gaode');
					// citycode  城市编码；
				if(result.status==1){
					var geocode = result.geocodes[0];
					resolve({location:geocode.location,adcode:geocode.adcode});
				}else{
					reject(new Error("获取地址失败"));
				}
			}).catch((err)=>{
				reject(err);
			})			

		})
	}
exports.getConfig=async ()=>{
	var qiniu_config = await app.mysql.get('eryi_config',{
			key:'gaode_config'
		});
		var obj;
		try{
			obj =JSON.parse(qiniu_config.value);
		}catch(err){
			obj={};
		}
		// console.log(obj);
		return Promise.resolve(obj);	

}

exports.uniqueName = ()=>{
	var extname = path.extname(filePath);
	return utility.md5((String(Date.now())+Math.random()).replace(/\./g,''))+extname;

}






