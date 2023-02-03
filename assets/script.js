
var inputval = document.getElementById('cityinput').value
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')

//API key


//Convert Celsius to Fahrenheit
function convertCtoF(celsiusValue) {
    return ((celsiusValue * 9) / 5) + 32;
}
$(document).ready(function(){
    btn.addEventListener('click', function(){
    var apiKey = "796a84f7f2e1c3e2323199abc3a866b6";
    var city = $("#cityinput").val()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial"
    fetch(fiveDayURL)
.then(response => response.json())
.then(data => {
    var firstCity = data[0];

console.log(data);
});

    fetch(queryURL)
    .then(response => response.json())
    .then(data => {
    var firstCity = data[0];
    console.log(data);

        var nameval = data.name
        var descrip = data.weather[0].description
        var tempature = data.main.temp
        var wndspd = data.wind.speed

        city.innerHTML=`Weather of <span>${nameval}<span>`
        temp.innerHTML = `Temperature: <span>${ convertion(tempature)} C</span>`
        description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
        wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`
    })
    .catch(err => alert('You entered Wrong city name'))
});
});



//geo coding  api.openweathermap.org/geo/1.0/direct?q={city name}&appid={6eef10960e7e69d9cf4cbeecaf9a3580}

