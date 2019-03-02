function show(weather,forecast){
    $("#card-1").show();

    document.getElementById("cityname").innerHTML=forecast.city.name;
    document.getElementById("citynamemodal").innerHTML=forecast.city.name;

    let des="Weather in "+forecast.city.name+" is "+ weather.weather[0].description;
    document.getElementById("weather_description").innerHTML=des;

    let p="Pressure in "+forecast.city.name+" is "+ weather.main.pressure+"hpa";
    let t="Temperature in "+forecast.city.name+" is "+ weather.main.temp+"℉";
    let h="Humidity in "+forecast.city.name+" is "+ weather.main.humidity+"%";
    let t_max="Max temperature in "+forecast.city.name+" is "+ weather.main.temp_max+"℉";
    let t_min="Min temperature in "+forecast.city.name+" is "+ weather.main.temp_min+"℉";

    document.getElementById("p").innerHTML=p;
    document.getElementById("t").innerHTML=t;
    document.getElementById("h").innerHTML=h;
    document.getElementById("t_max").innerHTML=t_max;
    document.getElementById("t_min").innerHTML=t_min;
}

function drawhourtable(forecast){
    for(let i=0;i<forecast.length;++i){
        let info=`<tr><td>${forecast[i].dt_txt}</td><td>${forecast[i].main.temp} ℉</td><td>${forecast[0].weather[0].description}</td></tr>`;
        $("#hour_table").append(info);
    }
}

function drawdaytable(forecast){
    for(let i=0;i<forecast.length;i=i+8){
        let info=`<tr><td>${forecast[i].dt_txt}</td><td>${forecast[i].main.temp} ℉</td><td>${forecast[0].weather[0].description}</td></tr>`;
        $("#day_table").append(info);
    }
}

$(document).ready(function () {
	console.log("hhh");
    $("#card-1").hide();
    $("#day_table").hide();
    $("#hour_table").hide();
    
	$("#Search").click(function(){
		let value = document.getElementById("form").value;
		let type = document.getElementById("select").value;
		if(type==="cityname"){
			$.ajax({
        		url: '/city_name',
        		type: 'POST',
        		data:{city_name:value},
        		success: function (data) {
                    console.log(data.forecast.list);
                    
                    show(data.weather,data.forecast);
                    drawhourtable(data.forecast.list);
                    drawdaytable(data.forecast.list);
        		}
    		});
		}
		else if(type==="cityid"){
			$.ajax({
        		url: 'city_id',
        		type: 'POST',
        		data:{city_id:value},
        		success: function (data) {
            		
        		}
    		});
		}
		return false;
	});
});
