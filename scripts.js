
main();

function main() {
	getWeather()
}

function getWeather() {
    if(navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function (position) {
		    weatherAPI(position);
	    });
    }
}

function weatherAPI(usrLocation) {
    const weatherAPI = "https://fcc-weather-api.glitch.me/api/current?";
    const lat = "lat=" + usrLocation.coords.latitude;
    const long = "lon=" + usrLocation.coords.longitude;
    const request = weatherAPI + lat + "&" + long;
    
    $.get(request, function (json) {
	    const weather_icons = {
		    "Drizzle":"resources/drizzle_white.png",
		    "Clouds":"resources/cloudy_white.png",
		    "Rain":"resources/rain_white.png",
		    "Snow":"resources/snow_white.png",
		    "Clear":"resources/sun_white.png",
		    "Thunderstorm":"resources/thunderstorm_white.png",
		    "Mist":"resources/mist_white.png",
		    "Default":"resources/sample_icon.ico"
	    };
    	const Weather_Data = {
		    mainDescription:json.weather[0]["main"],
		    iconURL:function(){
			    if(this.mainDescription in weather_icons)
				    return weather_icons[this.mainDescription];
			    else
				    return weather_icons["Default"];
		    },
		    temp:json.main.temp,
		    Farenheit: function(){
			    if(this.temp != null)
				    return Math.round((9 * this.temp / 5) + 32);
			    else
				    return 0;
		    },
		    description:json.weather[0]["description"],
		    windSpeed:json.wind.speed,
		    windDegree:json.wind.deg,
		    humidity:json.main.humidity,
		    sunrise:json.sys.sunrise,
		    getSunriseTime:function(){
		    	if(this.sunrise != null){
		    		let ts = new Date(this.sunrise * 1000);
		    		return ts.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
			    }
		    },
		    getSunriseDay:function() {
			    if (this.sunrise != null)
				    return new Date(this.sunrise * 1000).toLocaleDateString();
		    },
		    sunset:json.sys.sunset,
		    getSunsetTime:function(){
		        if(this.sunset != null)
		        	return new Date(this.sunset * 1000).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
		    },
		    getSunsetDate:function(){
		        if(this.sunset != null)
		        	return new Date(this.sunset * 1000).toLocaleDateString();
		    },
		    WindDirection: function () {
		    	let deg = this.windDegree;
		    	let direction = "";
			    if(deg != null){
				    switch (deg) {
					    case 0:
						    direction = "N";
						    break;
					    case 90:
						    direction = "E";
						    break;
					    case 180:
						    direction = "S";
						    break;
					    case 270:
						    direction = "W";
						    break;
					    default:
						    if(deg < 360)
							    direction = "NE";
						    if(deg < 270)
						    direction = "NW";
						    if (deg < 180)
							    direction = "SW";
						    if (deg < 90)
							    direction = "NE";
						    break;
				    }
			    }
			    return direction;
		    }
	    };
    	$('#city').html("<p>" + Weather_Data.mainDescription + "</p>");
    	$('#temp').html("<a>" + Weather_Data.Farenheit() + " F " + String.fromCharCode(176) + "</a>");
    	$('#description').html(Weather_Data.description);
    	$('#icon').html("<img src=\"" + Weather_Data.iconURL() + "\">");
    	$('#winds_des').html(Weather_Data.windSpeed + " mph " + Weather_Data.WindDirection());
    	$('#h_des').html(Weather_Data.humidity + "%");
    	$('#rise_des').html(Weather_Data.getSunriseTime() + " " + Weather_Data.getSunriseDay());
    	$('#set_des').html(Weather_Data.getSunsetTime() + " " + Weather_Data.getSunsetDate());
    	//outputResults(Weather_Data);
    });
}
/*
function outputResults(weather_object) {
	console.log(weather_object.windDegree);
	console.log("Main Description: " + weather_object.mainDescription);
	console.log("Icon URL: " + weather_object.iconURL());
	console.log("Far Temp: " + weather_object.Farenheit());
	console.log("description: " + weather_object.description);
	console.log("Wind: " + weather_object.windSpeed + " mph " + weather_object.WindDirection());
	console.log("Humidity: " + weather_object.humidity);
	console.log("Sunrise: " + weather_object.getSunriseTime() + "\t" + weather_object.getSunriseDay());
	console.log("Sunset: " + weather_object.getSunsetTime() + "\t" + weather_object.getSunsetDate());
}
*/
/* function updateCity(json) {
	let request = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
	request += json.coord.lat;
	request += "," + json.coord.lon + "&key=" + KEY;
	$.get(request, function (json) {
		console.log(json.results[0][0]["formatted_address"].short_name);
		let city = json.formatted_address;
		$('#city').html(city);
	});
	
}
*/



