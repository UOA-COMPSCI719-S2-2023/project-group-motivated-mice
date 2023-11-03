
window.addEventListener("load", function () {
addeventlisteners();
   
    function addeventlisteners(){
      document.querySelectorAll('.locationlistitems').forEach(item => {
        console.log('.locationlistitems')
          item.addEventListener('click', event => {
            fetchAndDisplaySelectedLocation(item.id)

          })
        })
  }

  async function fetchAndDisplaySelectedLocation(LocationID,res) {
    const response = await fetch(`/api/location/${LocationID}`); // needs yo use an api route
    const LocationSelected = await response.json();
    displaySelectedLocation(LocationSelected);
  }
  
  async function displaySelectedLocation(LocationSelected,res){
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${LocationSelected.Latitude}&lon=${LocationSelected.Longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=04a1f24d5b23131ed6fcb89c0e53be9a`);
    const weather = await response.json();
    const response2 =  await fetch(`/api/location/articles/${LocationSelected.LocationID}`);
    console.log(weather);
    const articles = await response2.json();
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
    likes.innerHTML = "Likes count: "+LocationSelected.Likes;
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
  //async function fetchWeather(LocationSelected, res){
  // const lat = LocationSelected.Latitude;
   //const long = LocationSelected.Longitude;
  // const weather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily,alerts&units=metric&appid=04a1f24d5b23131ed6fcb89c0e53be9a`);
  // const response = await weather.json();
 // }

  //async function fetchArticles(LocationID, res){
     // needs to use an api route
 // }

});