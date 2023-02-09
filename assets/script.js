function GetInfo() {

    var newName = document.getElementById("cityInput");
    var cityName = document.getElementById("cityName");
    cityName.innerHTML = "--"+newName.value+"--";
    var apiEndpoint = 'http://api.openweathermap.org/data/2.5/forecast'
    apiEndpoint += '?q=' + encodeURIComponent(newName.value);
    apiEndpoint += '&units=imperial';
    apiEndpoint += '&appid=6eef10960e7e69d9cf4cbeecaf9a3580';

    fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      for (var i = 0; i<6; i++) {
        var weatherItem = data.list[i].main;
        // temp_min, temp_max covert to F
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + weatherItem.temp_min + "°";
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + weatherItem.temp_max + "°";
      }
      for(i = 0; i<6; i++){
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
})

.catch(err => alert("OOPS: YOU BROKE IT AGAIN"))
}

function DefaultScreen(){
    document.getElementById("cityInput").defaultValue = "Austin";
    GetInfo();
}

//Displaying the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<6; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }

// setting local storage - tied to submit button
$("#search").on("click", function() {
let userInput = document.getElementById("cityInput").value;
showHistory();
window.localStorage.setItem("Last Searched", userInput);
});

//displays local storage onto page
function showHistory() {
let history = document.getElementById("history")
history.innerHTML = localStorage.getItem("Last Searched");
}
