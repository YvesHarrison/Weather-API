const express = require("express");
const router = express.Router();
const xss = require("xss");
const request = require("request");
const axios = require("axios");
const weather_api = "http://api.openweathermap.org/data/2.5/weather?q=";
const forecast_api = "http://api.openweathermap.org/data/2.5/forecast?q=";
const key = "c2601e48ea6e3a6a3191c70e80baee33";
//http://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&APPID=c2601e48ea6e3a6a3191c70e80baee33
router.get("/",async(req,res)=>{
	try{
		res.render("../public/page.html");
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.post("/city_name",async(req,res,next)=>{
	try{
		//xss
		let city_name = xss(req.body.city_name);
		console.log(city_name);
		let weather = await axios.get(weather_api+city_name+"&units=imperial&APPID="+key);
		let forecast = await axios.get(forecast_api+city_name+"&units=imperial&APPID="+key);
		
		res.json({weather:weather.data,forecast:forecast.data});
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

router.post("/city_id",async(req,res)=>{
	try{
		//xss
		let city_id = xss(req.body.city_id);
		console.log(city_id);
	}
	catch(e){
		res.status(500).json({ error: e });
	}
});

module.exports = router;