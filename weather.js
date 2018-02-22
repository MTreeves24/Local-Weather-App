var loc = document.querySelector(".location");


//geolocation
function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

var locReq = new XMLHttpRequest();
    locReq.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAErl2Y9MD-u1q27zVXM2yWoocgyehN-ZU");
    locReq.onload = () => {
    var locData = JSON.parse(locReq.responseText);
    var cityName = locData.results[0].address_components[1].long_name;
    var countyName = locData.results[0].address_components[3].long_name;
    loc.innerHTML = cityName + ", " + countyName;


var weatherReq = new XMLHttpRequest();
    weatherReq.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=6f4fe0fb1959811162e60dcd1b5a9ee7");
    weatherReq.onload = function(){
    var weatherData = JSON.parse(weatherReq.responseText);
        var summary = document.querySelector(".summary")
        summary = summary.innerHTML = weatherData.weather[0].main;
        document.querySelector(".wind-speed").innerHTML = "Wind: " + weatherData.wind.speed + "mph";
        document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp);
        var unit = document.querySelector(".unit")
        unit.innerHTML = "&degC"

        document.querySelector(".cloud-cover").innerHTML = "Cloud Cover: " + weatherData.clouds.all + "%";

        //OWM icons*****
        // document.querySelector(".icon").innerHTML = ('<img src="http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png">');

        //NEW icons********************************************************
        document.querySelector(".icon").innerHTML =  "<i class='wi wi-owm-" + weatherData.weather[0].id + "'></i>";
        //*****************************************************************


        //CHANGE-UNIT BUTTONS**********************************************
        var changeF = document.querySelector(".changeF")
        var changeC = document.querySelector(".changeC")

        changeF.addEventListener("click",() => {
            changeF.classList.add("button-active")
            changeC.classList.remove("button-active")
            unit.innerHTML = "&degF"
            document.querySelector(".temp").innerHTML = Math.floor(weatherData.main.temp * 9/5 + 32);
        })
        changeC.addEventListener("click",() => {
            changeC.classList.add("button-active")
            changeF.classList.remove("button-active")
            unit.innerHTML = "&degC"
            document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp);
        })
        //****************************************************************

};


weatherReq.send();
}
locReq.send();
}


getLocation();

setTimeout(() => {
    const notLoaded = document.querySelector(".icon p");
    notLoaded.style.display="block";
},6000);


