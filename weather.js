var loc = document.querySelector(".location");


//geolocation
function getLocation() {
        navigator.geolocation.getCurrentPosition(showPosition);
    }

function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

var locReq = new XMLHttpRequest();
    locReq.open('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + long + '&key=AIzaSyAErl2Y9MD-u1q27zVXM2yWoocgyehN-ZU');
    locReq.onload = function(){
    var locData = JSON.parse(locReq.responseText);
    var cityName = locData.results[0].address_components[1].long_name;
    var countyName = locData.results[0].address_components[3].long_name;
    loc.innerHTML = cityName + ", " + countyName;


var weatherReq = new XMLHttpRequest();
    weatherReq.open('GET', "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=6f4fe0fb1959811162e60dcd1b5a9ee7");
    weatherReq.onload = function(){
    var weatherData = JSON.parse(weatherReq.responseText);
        var summary = document.querySelector(".summary")
        summary = summary.innerHTML = weatherData.weather[0].main;

        document.querySelector(".wind-speed").innerHTML = "Wind: " + weatherData.wind.speed + "mph";

        document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp);

        var changeF = document.querySelector(".changeF")
        var changeC = document.querySelector(".changeC")
        var unit = document.querySelector(".unit")
        changeF.addEventListener("click",function(){
            changeF.classList.add("button-active")
            changeC.classList.remove("button-active")
            unit.innerHTML = "&degF"
            document.querySelector(".temp").innerHTML = Math.floor(weatherData.main.temp * 9/5 + 32);
        })
        changeC.addEventListener("click",function(){
            changeC.classList.add("button-active")
            changeF.classList.remove("button-active")
            unit.innerHTML = "&degC"
            document.querySelector(".temp").innerHTML = Math.round(weatherData.main.temp);
        })


        document.querySelector(".cloud-cover").innerHTML = "Cloud Cover: " + weatherData.clouds.all + "%";
        document.querySelector(".test").innerHTML = ('<img src="http://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png">');


};


weatherReq.send();
}
locReq.send();
}


getLocation();


    function changeUnit(){
        var changeF = document.querySelector(".changeF")
        var changeC = document.querySelector(".changeC")
        var unit = document.querySelector(".unit")
            changeF.classList.toggle("button-active")
            changeC.classList.toggle("button-active")
            unit.innerHTML = "&degF"
    }




//CODE FOR CHANGING BACKGROUND IMAGE***
    //     if(summary === "Clouds"){
    // console.log("yes")
    // document.body.style.background = "url('https://pixabay.com/get/eb30b2072cf6083ed1534705fb094391e477e7d718ac104494f4c77ca6e9b3b1/rain-2538429_1920.jpg')"
    // }