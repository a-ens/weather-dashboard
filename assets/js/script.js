const weatherAPIKey = "be0b7830ffc0880741abe868b09e6400"
const googlePlacesAPIKey = "AIzaSyBvyumRmK4e7wI9QoM13TGkn9OA2Ibm51w"

let lat;
let lon;

function getCityInfo(lat, lon){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=` + lat + `&lon=` + lon + `&appid=` + weatherAPIKey)

        .then(function(response) {
            return response.json()
        })

        .then(function(data) {
            console.log(data)
        })
}


function getCityCoord(){

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=` + cityInputText +`&limit=1&appid=` + weatherAPIKey)

    .then(function(response) {
        return response.json()
    })

    .then(function (data) {
    lat = data.lat
    lon = data.lon
    console.log(data)
    })

    
}



const cityInputText = "london"

function getTeleportImage(){
    fetch(`https://api.teleport.org/api/urban_areas/slug:` + searchedCity)

    .then(function(response) {
        return response.json()
    })
}

function get5Day(){
    fetch(`api.openweathermap.org/data/2.5/forecast?lat=` + lat + `&lon=` + lon + `&appid=` + weatherAPIKey)
}

getCityCoord()
// getCityInfo(lat, lon)
getCityInfo(51.5073219, -0.1276474)

document.getElementById("search-btn")