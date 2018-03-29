'use strict';

const moment = require('moment');

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();

exports.domain = url => url && url.split('/')[2];

exports.sanyuan = (val,trueval,falseval)=>{
	// console.log(trueval);
		if(val){
			return trueval;
		}else{
			return falseval;
		}
}
exports.console=function(obj){
	console.log(obj);
	return obj;
}
exports.inArrReturnChecked = function(arr,id){
	// console.log(arr,'------',id,arguments);
	if(!arr.push){
		arr=arr.split(",");
	}
	if(arr && arr.indexOf(String(id))>-1){
		return 'checked=""';
	}else{
		return '';
	}
}

exports.formatYYYYMMDD=function(time){
	if(time){
		return moment(time*1000).format("YYYY年MM月DD日");
	}else{
		return "";
	}
}
exports.filterFile=function(files,inid,trueval,falseval){
	// console.log(files)
	for(var i=0;i<files.length;i++){
		if(files[i].doc_type_id==inid){
			return files[i].doc_id
			break;
		}
	}
	return falseval;
}
exports.getNextItem=function(arr,i){
	if(arr[i+1]){
		return arr[i+1];
	}else{
		return '';
	}
}


exports.getObjLength =  function(obj){
	return Object.keys(obj).length;
}