// exports.wechat={
// 	token: 'guojikai',
// 	appid: 'wx5f3a6ecfcffcb2fa',
// 	encodingAESKey: '',
// 	checkSignature: true,
// 	appsecret:"12a675d1e26badfc14bf8c64247ade5d",
// };


exports.AppName="耳艺";
exports.env="dev";

exports.port=3000; //监听端口；
exports.protocol='http://';
exports.hostname=exports.protocol+"192.168.2.105"+':'+exports.port+'/';

exports.qiniuDomain = 'http://owei2m274.bkt.clouddn.com';

const path = require("path");
exports.avatar={
	width:178,
	height:178
};
exports.logo={
	width:100,
	height:100
};
exports.staticRequestPrefix = "http://localhost:3000"
exports.staticDir=path.join(__dirname,'..','public');//静态文件；

exports.uploadDir=path.join(__dirname,'..','uploads'); //上传文件
exports.wx_qrcode_upload=path.join(__dirname,'..','public/uploads/wx/qrcode');

exports.cookie_secret="guojikai";
exports.ey_auth_cookie_name="eryi_taolin";
exports.AppName="耳艺";
// exports.session=
exports.session_secret="guojikai";
exports.redis_port=6379;
exports.redis_db=0;
exports.redis_password="";
exports.redis_host="127.0.0.1";
exports.debug=true;
exports.redis={
	// prefix:"eryi"
};

exports.mail_opts={
	service:"qq",
	auth:{
		user:'970228812@qq.com',
		pass:"slkusqgkioxabbie"
	}
};

exports.rootPath=path.join(__dirname,'..');

exports.mysql={
	host:"localhost",
	user:'root',
	password:"root",
	database:'pangu',
	// uri:"mysql://root:978352@103.74.192.198/eryi",
	// uri:'mysql://root:root@localhost/eryi',
	// DB_NAME:'eryi',
	// USERNAME:'root',
	// PASSWORD:'root'
};


