console.log("js file called");//to delete once working
const locationDAO = require("../modules/location-dao.js");
window.addEventListener("load", function () {
console.log("js loaded"); //to delete once working


addeventlisteners();
   
    function addeventlisteners(){
      console.log("function called"); //to delete once working
      document.querySelectorAll('.locationlistitems').forEach(item => {
        console.log('.locationlistitems')
          item.addEventListener('click', event => {
            console.log("event listener added"); //to delete once working
            fetchAndDisplaySelectedLocation(item.id)

          })
        })
  }

  async function fetchAndDisplaySelectedLocation(LocationID,res) {
    const response = await locationDAO.retrieveLocationById(LocationID);
    const LocationSelected = await response.json();
    displaySelectedLocation(LocationSelected);
  }
  
  function displaySelectedLocation(LocationSelected,res){
    const weather = fetchWeather(LocationSelected);
    const articles = fetchArticles(LocationSelected.LocationID);
    const selectedName = document.getElementById("selectedName");
    const selectedDescription = document.getElementById("selectedDescription");
    const likes = document.getElementById("likes")
    const weathername = document.getElementById("weathername")
    const temperature = document.getElementById("temperature")
    const humidity = document.getElementById("humidity")
    const uvindex = document.getElementById("uvindex")
    const windspeed = document.getElementById("windspeed")
    const cloudcover = document.getElementById("cloudcover")
    const articlesbylocationlist = document.getElementById("articlesbylocationlist")

    selectedName.innerHTML = "About "+LocationSelected.Name;
    selectedDescription.innerHTML = LocationSelected.Description;
    likes.innerHTML = LocationSelected.Likes;
    weathername.innerHTML = "Current weather in "+LocationSelected.Name+" right now";
    temperature.innerHTML = "Temperature: "+weather.current.temp+" celsius";
    humidity.innerHTML = "Humidity: "+weather.current.humidity+" %";
    windspeed.innerHTML = "Wind Speed: "+weather.current.wind_speed+" KM/PH";
    uvindex.innerHTML = "UV Index: "+weather.current.uvi;
    cloudcover.innerHTML = "Cloud Cover: "+weather.current.clouds+" %";
    
    articles.forEach(function(arrayItem){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(arrayItem.Title));
    li.setAttribute("id", arrayItem.ArticleID);
    articlesbylocationlist.appendChild(li);
    });

  }
  async function fetchWeather(LocationSelected, res){
   const lat = LocationSelected.Latitude;
   const long = LocationSelected.Longitude;
   const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily,alerts&units=metric&appid=04a1f24d5b23131ed6fcb89c0e53be9a`);
   const weatherDatajson = await response.json();
  }

  async function fetchArticles(LocationID, res){
    const response = await locationDAO.retrieveArticlesByLocationId(LocationID);
  }

});