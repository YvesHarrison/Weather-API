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

function check_extreme(forecast){
    let extreme = false;
    let show = "";
    for(let i=0;i<forecast.length;++i){
        let temp = Number(forecast[i].main.temp);
        if(temp<32){
            show="The temperature will be below 32℉ at " + forecast[i].dt_txt;
            extreme = true;
            break; 
        }
        if(temp>86){
            show="The temperature will be above 86℉ at " + forecast[i].dt_txt;
            extreme = true;
            break; 
        }
    }
    if(extreme){
        document.getElementById("extreme").innerHTML=show;
    }
}

$(document).ready(function () {
    $("#card-1").hide();
    $("#day_table").hide();
    $("#hour_table").hide();

	$("#Search").click(function(){
		let value = document.getElementById("form").value;
		let type = document.getElementById("select").value;
        $("#day_table tbody").html("");
        $("#hour_table tbody").html("");
        $("#show_table").attr("checked", true);
        $("#warning").hide();
		if(type==="cityname"){
			$.ajax({
        		url: '/city_name',
        		type: 'POST',
        		data:{city_name:value},
        		success: function (data) {
                    
                    if(data.weather&&data.forecast){
                        show(data.weather,data.forecast);
                        check_extreme(data.forecast.list);
                        drawhourtable(data.forecast.list);
                        drawdaytable(data.forecast.list);
                    }
                    else if(data.error.message){
                        document.getElementById("warning").innerHTML=data.error.message;
                        $("#warning").show();
                        $("#card-1").hide();
                    }
                    
        		}
    		});
		}
		else if(type==="cityid"){
			$.ajax({
        		url: 'city_id',
        		type: 'POST',
        		data:{city_id:value},
        		success: function (data) {

            		if(data.weather&&data.forecast){
                        show(data.weather,data.forecast);
                        check_extreme(data.forecast.list);
                        drawhourtable(data.forecast.list);
                        drawdaytable(data.forecast.list);
                    }
                    else if(data.error.message){
                        document.getElementById("warning").innerHTML=data.error.message;
                        $("#warning").show();
                        $("#card-1").hide();
                    }
        		}
    		});
		}
		return false;
	});

    if($("#show_table").is(":checked")){
            $("#day_table").hide();
            $("#hour_table").show();
    }else{
            $("#day_table").show();
            $("#hour_table").hide();
    }

    $("#show_table").click(function(){
        if($(this).is(":checked")){
            $("#day_table").hide();
            $("#hour_table").show();
        }else{
            $("#day_table").show();
            $("#hour_table").hide();
        }
    });

});
