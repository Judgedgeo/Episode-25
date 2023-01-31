
var inputval = document.getElementById('cityinput').value
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')

//API key
 apik = "6eef10960e7e69d9cf4cbeecaf9a3580"

//Convert Celsius to Fahrenheit
function convertCtoF(celsiusValue) {
    return ((celsiusValue * 9) / 5) + 32;
}

//geo coding  api.openweathermap.org/geo/1.0/direct?q={city name}&appid={6eef10960e7e69d9cf4cbeecaf9a3580}

    btn.addEventListener('click', function(){
        var apiurl ="https://api.openweathermap.org/data/2.5/forecast";
    apiurl += "?lat="+lat;
    apiurl += "&lon="+long;
    apiurl += "&appid="+apik;
    fetch(apiurl)

    const apiurl1 = "https://api.openweathermap.org/geo/1.0/direct?q="+inputval+"&limit=1&appid={6eef10960e7e69d9cf4cbeecaf9a3580"

    fetch(apiurl1)
        .then(res => res.json())
        .then(data => {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspd = data['wind']['speed']

            city.innerHTML=`Weather of <span>${nameval}<span>`
            temp.innerHTML = `Temperature: <span>${ convertion(tempature)} C</span>`
            description.innerHTML = `Sky Conditions: <span>${descrip}<span>`
            wind.innerHTML = `Wind Speed: <span>${wndspd} km/h<span>`
        })


        .catch(err => alert('You entered Wrong city name'))
    })

