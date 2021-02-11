// SEARCH LOCATION AND GET WEATHER INFORMATION...
const searchLocation = () => {
    const findLocation = document.getElementById("findLocation").value;
    getAPI(findLocation);
}

// GETTING WEATHER API...
const getAPI = async (location) => {
    const key = "ed691c29d55e70e5e769884eaef4a832"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`
    try {
        const res = await fetch(url)
        const data = await res.json()
        // ALL DATA PATH...
        const locationNamePath = data.name;
        const locationTempPath = data.main.temp;
        const weatherDescriptionPath = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;
        const humidityPath = data.main.humidity;
        const windSpeedPath = data.wind.speed;
        const pressurePath = data.main.pressure;

        displayAllData(locationNamePath, locationTempPath, weatherDescriptionPath, weatherIcon, humidityPath, windSpeedPath, pressurePath);
    }
    catch {
        displayError("Sorry, I can't load your data !!! Please, check your spell & try again later...");
    }
}

// TO DISPLAY ALL INFORMATION ABOUT WEATHER...
const displayAllData = (city, temp, weatherName, icon, humidity, windSpeed, pressure) => {
    document.getElementById("errorText").innerText = '';
    const weatherInformationDiv = document.getElementById("weatherInformation");
    const weatherInfo = `
    <div> <img src="https://openweathermap.org/img/wn/${icon}.png"></div>
    <h1>${city}</h1>
    <h3><span>Temp : ${temp}\u00B0C</span></h3>
    <h4>${weatherName}</h4>
    
    <h4>Humidity : ${humidity} %</h4>
    <h4>Air pressure : ${pressure} mb</h4>
    <h4>Wind speed : ${windSpeed} km/h</h4>
    `
    weatherInformationDiv.innerHTML = weatherInfo;
}

// TO DISPLAY THE ERROR MESSAGE...
const displayError = error => {

    document.getElementById("weatherInformation").innerText = '';
    const errorMessage = document.getElementById("errorText");
    errorMessage.innerText = error;
}

// GET USER IP AND SHOW USER CURRENT WEATHER...
const getIp = async () => {
    const res = await fetch(`https://extreme-ip-lookup.com/json/`)
    const data = await res.json()
    const currentCity = data.city;
    getAPI(currentCity)
}

getIp();