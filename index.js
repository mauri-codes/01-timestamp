var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var url = require("url");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/cool', function(request, response){
	response.send(cool());
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/random/:min/:max", function(req, res){
	var min = parseInt(req.params.min);
	var max = parseInt(req.params.max);
	if(isNaN(min) || isNaN(max)){
		res.status(400);
		res.json({error: "Bad Request."});
		return;
	}
	var result = Math.round((Math.random() * (max - min)) + min);
	res.json({result: result});
});

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get("/:url_q", function(request, response){
	//var uri = decodeURIComponent(var1);
	//var queryObject = url.parse(request.params.var1,true).query;
	//var uri_enc = encodeURIComponent(uri);
	var url = request.params.url_q;
	var StringDate;
	var NumberDate;
	if(isNaN(url)){
		var x = Date.parse(url);
		if(isNaN(x)){
			StringDate = null;
			NumberDate = null;
		}else{
			NumberDate = x/1000;
			StringDate = url;
		}
	}
	else{
		NumberDate = url;
		var x = new Date(url * 1000);
		var months = ['January','February',
			'March','April','May','June',
			'July','August','September',
			'October','November','December'];
		var month = months[x.getMonth()];
		var year = x.getFullYear();
		var date = x.getDate();
		StringDate = month + " " + date + ", " + year;
	}
	response.json({"unix": NumberDate, "natural": StringDate});
	/*
	if(url){

	}
	var x = Date.parse(request.params.url_q);
	var months = ['January','February',
		'March','April','May','June',
		'July','August','September',
		'October','November','December'];
	var year = x.getFullYear
	var month = months[a.getMonth()];
	console.log(x);
	*/
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


