// namespace : /vendor

const express= require("express");
const router = express.Router();

var controllers = app.controllers;
console.log(controllers);
// router.get('/test',controllers.vendor.test.index);
router.get("/login",controllers.private.index.login);
router.post("/login",controllers.private.index.submitLogin);

router.use(function(req,res,next){
	if(req.session.admin){
		next();
	}else{
		res.redirect("/private/login");
	}
});
router.get("/",controllers.private.index.index);

//comon

module.exports=router;



