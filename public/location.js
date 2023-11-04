
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
    const articlesforlocationtitle = document.getElementById("articlesforlocationtitle")

    selectedName.innerHTML = "About "+LocationSelected.Name;
    selectedDescription.innerHTML = LocationSelected.Description;
    likes.innerHTML = "Likes count: "+LocationSelected.Likes;
    weathername.innerHTML = "Current weather in "+LocationSelected.Name+" right now";
    temperature.innerHTML = "Temperature: "+weather.current.temp+" celsius";
    humidity.innerHTML = "Humidity: "+weather.current.humidity+" %";
    windspeed.innerHTML = "Wind Speed: "+weather.current.wind_speed+" KM/PH";
    uvindex.innerHTML = "UV Index: "+weather.current.uvi;
    cloudcover.innerHTML = "Cloud Cover: "+weather.current.clouds+" %";
    
    articlesforlocationtitle.innerHTML = "Articles about "+ LocationSelected.Name;

    articles.forEach(function(arrayItem){
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(arrayItem.Title));
    li.setAttribute("id", arrayItem.ArticleID);
    articlesbylocationlist.appendChild(li);
    });

  }


});