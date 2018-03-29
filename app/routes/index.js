// namespace : /vendor

const express= require("express");
const router = express.Router();

var controllers = app.controllers;
console.log(controllers);
// router.get('/test',controllers.vendor.test.index);
router.get("/",controllers.home.index.index);

//comon

module.exports=router;



