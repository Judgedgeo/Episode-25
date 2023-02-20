function GetInfo(btnCity) {

    var newName = btnCity || document.getElementById("cityInput").value;
    var cityName = document.getElementById("cityName");

    cityName.innerHTML = "--" + newName + "--";
    var apiEndpoint = 'https://api.openweathermap.org/data/2.5/forecast'
    apiEndpoint += '?q=' + encodeURIComponent(newName);
    apiEndpoint += '&units=imperial';
    apiEndpoint += '&appid=6eef10960e7e69d9cf4cbeecaf9a3580';
    apiEndpoint += '&humidity';
    apiEndpoint += '&wind';

    fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < 6; i++) {
                var weatherItem = data.list[i].main;
                var windItem = data.list[i].wind;
                // temp_min, temp_max,humidity and wind
                document.getElementById("day" + (i + 1) + "Min").innerHTML = " Min: " + weatherItem.temp_min + "°";
                document.getElementById("day" + (i + 1) + "Max").innerHTML = " Max: " + weatherItem.temp_max + "°";
                document.getElementById("day" + (i + 1) + "Humidity").innerHTML = " Humidity: " + weatherItem.humidity + "%";
                document.getElementById("day" + (i + 1) + "Speed").innerHTML = " Wind: " + windItem.speed + " mph";

                let history = JSON.parse(localStorage.getItem("history")) || []
                if (!history.includes(newName.toLowerCase())) {
                    history.push(newName.toLowerCase())
                    showHistory(newName);
                    window.localStorage.setItem("history", JSON.stringify(history));
                }


            }
            for (i = 0; i < 6; i++) {
                document.getElementById("img" + (i + 1)).src = "https://openweathermap.org/img/wn/" +
                    data.list[i].weather[0].icon
                    + ".png";
            }
        })

        .catch(err => alert("OOPS: YOU BROKE IT AGAIN"))
}

function DefaultScreen() {
    document.getElementById("cityInput").defaultValue = "Round Rock";
    GetInfo();
}

//Displaying the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    }
    else {
        return day + d.getDay();
    }
}

for (i = 0; i < 6; i++) {
    document.getElementById("day" + (i + 1)).innerHTML = weekday[CheckDay(i)];
}

// setting local storage - tied to submit button
$("#search").on("click", function () {
    let userInput = document.getElementById("cityInput").value;
    let history = JSON.parse(localStorage.getItem("history")) || []
    if (!history.includes(userInput.toLowerCase())) {
        history.push(userInput.toLowerCase())
        showHistory(userInput);
        window.localStorage.setItem("history", JSON.stringify(history));
    }

});

//displays local storage onto page
function showHistory(city) {
    let historyEL = document.getElementById("history")
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let button = document.createElement("button")
    button.textContent = city
    button.value = city
    button.addEventListener("click", function (event) {
        GetInfo(event.target.value)
    })
    historyEL.appendChild(button)
}
