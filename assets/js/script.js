const weatherAPIKey = "be0b7830ffc0880741abe868b09e6400";
const googlePlacesAPIKey = "AIzaSyBvyumRmK4e7wI9QoM13TGkn9OA2Ibm51w";

let latitude;
let longitude;


const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", apiGroup());

const searchInputBox = document.getElementsByName("city-search-input");
let cityInputText;


function getCity(){

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=` + cityInputText +`&limit=1&appid=` + weatherAPIKey)

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

function apiGroup(){
    cityInputText = searchInputBox.value;
    console.log("Button Clicked")
    getCity()
    console.log(latitude + "::" + longitude)

    // get5Day()
    // getCityInfo()
    // getTeleportImage()
}


// getCityInfo(lat, lon)
// getCityInfo(51.5073219, -0.1276474);
