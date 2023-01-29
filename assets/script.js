
var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')


 apik = "6eef10960e7e69d9cf4cbeecaf9a3580"

//kelvin to celcious. 1 Kelvin is equal to -272.15 Celsius.

function convertion(val){
    return (val - 273).toFixed(2)
}


    btn.addEventListener('click', function(){



        fetch('api.openweathermap.org/data/2.5/forecast?q='+inputval.value+'&appid='+apik)
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

