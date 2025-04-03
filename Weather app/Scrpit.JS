async function  getweather (){
    let city = document.getElementById("search").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=21748da4538efee881a375689a010f01`;
    let data = await fetch(url);
    let change = await data.json();
   
    let weather = document.getElementById("weather");
    weather.innerText = "Weather of the " + city;
    let temp = document.getElementById("temp");
    tempCelsius = change.main.temp - 273.15 ;
    temp.innerText = `Temperature: ${tempCelsius.toFixed(0)}°C`
    let humadity = document.getElementById("humadity");
    humadity.innerText = "Humidity: " +  change.main.humidity;
    // Wind speed

    let wind = document.getElementById("windspeed");
    wind.innerText =  "wind " + change.wind.speed + " Km/h";
    // Message 
    let  condition = document.getElementById("condition");
    condition.innerText = change.weather[0].description;
    if (change.weather[0].main === "Clear") {
  document.body.style.backgroundColor = "#87CEFA"; // Light Blue
} else if (change.weather[0].main === "Rain") {
  document.body.style.backgroundColor = "#5F9EA0"; // Cadet Blue
} else if (change.weather[0].main === "Snow") {
  document.body.style.backgroundColor = "#E0FFFF"; // Light Cyan
} else if (change.weather[0].main === "Clouds") {
  document.body.style.backgroundColor = "#B0C4DE"; // Light Steel Blue
} else {
  document.body.style.backgroundColor = "#D3D3D3"; // Default Gray
}

       }