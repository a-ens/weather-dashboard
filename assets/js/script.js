const weatherAPIKey = "be0b7830ffc0880741abe868b09e6400";
const googlePlacesAPIKey = "AIzaSyBvyumRmK4e7wI9QoM13TGkn9OA2Ibm51w";

let today = moment().format('L');
let searchHistory = [];

const searchInputBox = document.getElementsByName("city-search-input");
let cityInputText = undefined


function callWeather(city) {

    let apiCall = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=` + weatherAPIKey;

    $.ajax({
        url: apiCall,
        method: "GET"
    }).then(function(firstWeatherResponse) {
        console.log(firstWeatherResponse);
    

    $("").css("display", "block");
    $("#today-box").empty();


    let latitude = firstWeatherResponse.lat;
    let longitude = firstWeatherResponse.lon;

    let iconCode = firstWeatherResponse.weather[0].icon;
    let iconURL = `https://openweathermap.org/img/w/` + iconCode + `.png`;

    let cityName = cityWeatherResponse.name
    let cityDescription = cityWeatherResponse.weather[0].description
    let cityTemp = cityWeatherResponse.main.temp
    let cityHumidity = cityWeatherResponse.main.humidity
    let cityWindSpeed = cityWeatherResponse.wind.speed

    let currentWeather = $(
        `<h2 id="currentCity">${cityName} ${today} <img src="${iconURL}" alt="${cityDescription}"/></h2>
        <p>Temperature: ${cityTemp} °F</p>
        <p>Humidity: ${cityHumidity}\%</p>
        <p>Wind Speed: ${cityWindSpeed} MPH</p>`
    );

    $('#today-box').append(currentWeather);

    let uviCall = `https://api.openweathermap.org/data/2.5/uvi?lat=` + latitude + `&lon=` + longitude + `&appid=` + weatherAPIKey;

        $.ajax({
            url: uviCall,
            method: "GET"
        }).then(function(uviResponse) {
            console.log(uviResponse);

            let uvIndex = uviResponse.value;
            let uvIndexObject = $(`
                <p>UV Index: 
                    <span id="uvIndexColor" class="px-2 py-2 rounded">${uvIndex}</span>
                </p>
            `);

            $('#today-box').append(uvIndexObject);

            if (uvIndex >= 0 && uvIndex <= 2) {
                $("#uvIndexColor").css("background-color", "#3EA72D").css("color", "white");
            } else if (uvIndex >= 3 && uvIndex <= 5) {
                $("#uvIndexColor").css("background-color", "#FFF300");
            } else if (uvIndex >= 6 && uvIndex <= 7) {
                $("#uvIndexColor").css("background-color", "#F18B00");
            } else if (uvIndex >= 8 && uvIndex <= 10) {
                $("#uvIndexColor").css("background-color", "#E53210").css("color", "white");
            } else {
                $("#uvIndexColor").css("background-color", "#B567A4").css("color", "white"); 
            };  

            fiveDayForecast (latitude, longitude)

        });
    });
}

function fiveDayForecast (latitude, longitude){

    let fiveDayCall = `api.openweathermap.org/data/2.5/forecast?lat=` + latitude + `&lon=` + longitude + `&appid=` + weatherAPIKey

    $.ajax({
        url: fiveDayCall,
        method: "GET"
    }).then(function(fiveDayResponse) {
        console.log(fiveDayResponse);
        $("#fiveDay").empty();
        
        for (let i = 1; i < 6; i++) {
            let cityInfo = {
                date: fiveDayResponse.daily[i].dt,
                icon: fiveDayResponse.daily[i].weather[0].icon,
                temp: fiveDayResponse.daily[i].temp.day,
                humidity: fiveDayResponse.daily[i].humidity
            };

            let thisDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");
            let iconURL = `<img src="https://openweathermap.org/img/w/${cityInfo.icon}.png" alt="${fiveDayResponse.daily[i].weather[0].main}" />`;

            // displays the date
            // an icon representation of weather conditions
            // the temperature
            // the humidity
            let fiveDayCard = $(
            `<div class="col s6 m2 l2 forecast-card">
                <div class="card cyan darken-4">
                    <div class="card-content white-text">
                        <span class="card-title">${thisDate}</span>
                        <p>${iconURL}</p>
                        <p>Temp: ${cityInfo.temp} °F</p>
                        <p>Humidity: ${cityInfo.humidity}\%</p>
                    </div>
                </div>
            </div>`
            );
            
            $("#five-day-box").append(fiveDayCard);
        }
    }); 

}

// const searchBtn = document.getElementById("search-btn");
$("#search-btn").on("click", function(event) {
    event.preventDefault();

    let city = $("#city-search-input").val().trim();
    callWeather(city);
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        let searchedCity = $(`
            <li class="search-history-item">${city}</li>
            `);
        $("#search-history").append(searchedCity);
    };
    
    localStorage.setItem("city", JSON.stringify(searchHistory));
    console.log(searchHistory);
});

$(document).on("click", ".search-history-item", function() {
    let pastCity = $(this).text();
    callWeather(pastCity);
});

$(document).ready(function() {
    let searchHistoryArr = JSON.parse(localStorage.getItem("city"));

    if (searchHistoryArr !== null) {
        let lastSearchedIndex = searchHistoryArr.length - 1;
        let lastSearchedCity = searchHistoryArr[lastSearchedIndex];
        callWeather(lastSearchedCity);
        console.log(`Last searched city: ${lastSearchedCity}`);
    }
});





// const handleErrors = (response) => {
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     return response;
// }


// function getTeleportImage() {

//     fetch(`https://api.teleport.org/api/urban_areas/slug:` + searchedCity)

//     .then(function(response) {
//         return response.json()
//     })
// };