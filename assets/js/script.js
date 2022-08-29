const weatherAPIKey = "be0b7830ffc0880741abe868b09e6400";
const googlePlacesAPIKey = "AIzaSyBvyumRmK4e7wI9QoM13TGkn9OA2Ibm51w";

let latitude;
let longitude;

let today = moment().format('L');

const searchInputBox = document.getElementsByName("city-search-input");
let cityInputText = undefined



function currentCondition(city) {

    let apiCall = `http://api.openweathermap.org/geo/1.0/direct?q=` + cityInputText +`&limit=1&appid=` + weatherAPIKey;

    $.ajax({
        url: apiCall,
        method: "GET"
    }).then(function(cityWeatherResponse) {
        console.log(cityWeatherResponse);
    })};


    const handleErrors = (response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    const currentDate = moment.unix(cityInfo.date).format("MM/DD/YYYY");

function getCity(){

    fetch()

    .then(function(response) {
        return response.json()
    })

    .then(function(data) {
    console.log(data)
    })

    // .then(fetch(`https://api.openweathermap.org/data/2.5/weather?lat=` + latitude + `&lon=` + longitude + `&appid=` + weatherAPIKey))

    // .then(function(response) {
    //     return response.json()
    // })

    // .then(function(data) {
    //     console.log(data)
    // })
};

function apiGroup(){
    let cityInputText = searchInputBox.value;
    console.log("Button Clicked")
    .then(searchInputBox.empty())
    getCity()
    console.log(latitude + "::" + longitude)

    // get5Day()
    // getCityInfo()
    // getTeleportImage()
};

function submitted(event) {
    event.preventDefault()
    apiGroup
};

const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", submitted);

// function getCityInfo(lat, lon){

        

//         .then(function(response) {
//             return response.json()
//         })

//         .then(function(data) {
//             console.log(data)
//         })
// };

// const cityInputText = "london"

// function getTeleportImage(){

//     fetch(`https://api.teleport.org/api/urban_areas/slug:` + searchedCity)

//     .then(function(response) {
//         return response.json()
//     })
// };

// function get5Day(){

//     fetch(`api.openweathermap.org/data/2.5/forecast?lat=` + latitude + `&lon=` + longitude + `&appid=` + weatherAPIKey)
// };

// getCityInfo(lat, lon)
// getCityInfo(51.5073219, -0.1276474);
