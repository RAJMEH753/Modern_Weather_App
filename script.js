
var icon_data;
const apiKey = "8ae26401eee7ae42992c0285e2aef447"
  
    function fetchWeather(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey
        )
        .then((response) => {
            if (!response.ok) {
                alert("No weather found.");
                throw new Error("No weather found.");
            }
        return response.json();
        })
        .then((data) => displayWeather(data));
    }
  
    function displayWeather(data) {
        
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = name;
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".wind").innerText = speed + " km/h";
        
        icon_data = icon;
        weather_card(icon_data);

        //----------------------------------------------------------------------------------------------------------

        var apiUrl ="https://pixabay.com/api/?key=45450559-21280a32042e78d1eabd94a26&q="+name+"&image_type=photo";
   
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                const imageUrl = data.hits[0].largeImageURL; 
                document.body.style.backgroundImage = "url("+imageUrl+")";
            })
    }
  
function search() {
    fetchWeather(document.querySelector(".search-bar").value);
}

  
document.querySelector(".search button")?.addEventListener("click", function () {
    search();
});
  
document.querySelector(".search-bar")?.addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        search();
    }
});
  
fetchWeather("Delhi");