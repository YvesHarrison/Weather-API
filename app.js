const express=require("express");
const app=express();
const configRoutes=require("./routes");
const bodyParser = require("body-parser");
const static = express.static(__dirname + "/public");
const ejs = require('ejs');

app.use(static);//app.use("/public", static); unable to load pictures on web page
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.use(bodyParser.json());
configRoutes(app);

app.listen(3000,()=>{
	console.log("We've got a server!");
	console.log("Your routes will be running on http://localhost:3000");
});