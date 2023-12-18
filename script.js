const inputlbl = document.querySelector(".city-input");
const searchbtn = document.querySelector(".search-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");
const obCardDiv = document.querySelector(".obv-cards");
const extraDiv = document.querySelector(".weather-extra");

async function fetchData(options) {
    try {
        const response = await axios.request(options);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const createWeatherCard = (cityName, result, index) => {
    if(index == 0) {
        // Fahrenheit (°F) = (Temperature in degrees Celsius (°C) * 9/5) + 32.
        return `<div class="details">
            <h2>${cityName} (${result.day})</h2>
            <div class="dh6">
                <h6>Highest Temperature: <strong>${result.high}°F / ${((parseInt(result.high) - 32) *5/9).toFixed(1)} °C</strong></h6>
                <h6>Lowest Temperature:  <strong>${result.low}°F / ${((parseInt(result.low) - 32) *5/9).toFixed(1)} °C</strong></h6>
                <h6>Estimate Weather:  <strong>${result.text} M/S</strong></h6>
            </div>
         </div>`;
    } else {
        return `<li class="card">
                        <h2>${result.day}</h2>
                        <h6>Highest Temperature: ${result.high}°F / ${((parseInt(result.high) - 32) *5/9).toFixed(1)} °C</h6>
                        <h6>Lowest Temperature: ${result.low}°F / ${((parseInt(result.low) - 32) *5/9).toFixed(1)} °C</h6>
                        <h6>Estimate Weather: ${result.text} M/S</h6>
                </li>`;
    }
}


const getWeatherDetails = (result) => {
        const allForecasts = Array.from(result.forecasts).slice(4);
        const obVal = result.current_observation;
        const extraInfo = result.location;
        inputlbl.value = "";
        currentWeatherDiv.innerHTML = "";
        weatherCardsDiv.innerHTML = "";
        obCardDiv.innerHTML = "";
        extraDiv.innerHTML = "";
        const obhtml = `<div class="obv-details">
        <h6>Wind Speed: ${obVal.wind.speed}</h6>
        <h6>Hunmidity: ${obVal.atmosphere.humidity} </h6>
        <h6>Visibility: ${obVal.atmosphere.visibility}</h6>
        <h6>Sunset time: ${obVal.astronomy.sunset}</h6>
    </div>`
        const extraHtml = `
        <h2 class="city-name-h2">City Info</h2>
        <div class="city-info">
        <h2>${extraInfo.city} - ${extraInfo.country}</h2>
        <h6>Latitude: ${extraInfo.lat}</h6>
        <h6>Longtitude: ${extraInfo.long}</h6>
        <h6>Time Zone: ${extraInfo.timezone_id}</h6>
    </div>`
        let index = 0;
        allForecasts.forEach((data) => {
            const html = createWeatherCard(result.location.city, data, index);
            if (index == 0) {
                extraDiv.insertAdjacentHTML("beforeend", extraHtml);
                currentWeatherDiv.insertAdjacentHTML("beforeend", html);
                obCardDiv.insertAdjacentHTML("beforeend",  obhtml)
            } else {
                weatherCardsDiv.insertAdjacentHTML("beforeend", html);
            }
            index++;
        });
}

const  getCityCoordinates = async () => {
    const cityName = inputlbl.value.trim();
    if (cityName === "") return;
    const options = {
        method: 'GET',
        url: 'https://yahoo-weather5.p.rapidapi.com/weather',
        params: {
            location: cityName,
            format: 'json',
            u: 'f'
        },
        headers: {
            'X-RapidAPI-Key': '81804428ffmsh380a5361443c3d7p1c6cd5jsnf295b49baef8',
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
  }
      };
    const result = await fetchData(options);
    if(result) {
        getWeatherDetails(result);
    } else {
        alert("The city does not exist!")
    }

}



searchbtn.addEventListener("click", getCityCoordinates);
inputlbl.addEventListener("keyup", e => e.key === "Enter" && getCityCoordinates());
