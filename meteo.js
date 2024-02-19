const city = "hendaye"
apiKey = "7655ab2ff523bf4763a0aeb576e20237"
url = `https://api.openweathermap.org/data/2.5/weather?q=${city},fr&APPID=${apiKey}&units=metric&lang=fr`

// WeatherCard creation + class for CSS
const weatherCard = document.createElement("div");
const body = document.body;
body.append(weatherCard);
weatherCard.classList.add("weatherCard");

const h1 = document.createElement('h1');
weatherCard.append(h1)

const weatherIcon = document.createElement('img')
weatherCard.append(weatherIcon)

const weatherDescription = document.createElement('p')
weatherDescription.id = "weatherDescription"
weatherCard.append(weatherDescription)

// Creation of this container to be able to align the temp + the win on the same level
const align = document.createElement('div')
align.id = "align"
weatherCard.append(align)

// Creation of this container to be able to align the svg
const temperatureContainer = document.createElement('div')
temperatureContainer.classList.add("tempAndWindContainer")
align.append(temperatureContainer)

const thermometer = document.createElement('img')
thermometer.src = "../img/thermometer.svg"
thermometer.classList.add("svg")
temperatureContainer.append(thermometer)

const temperature = document.createElement('p')
temperatureContainer.append(temperature)

// Creation of this container to be able to align the svg
const windContainer = document.createElement('div')
windContainer.classList.add("tempAndWindContainer")
align.append(windContainer)

const windSvg = document.createElement('img')
windSvg.src = "../img/wind.svg"
windSvg.classList.add("svg")
windContainer.append(windSvg)
const wind = document.createElement('p')
windContainer.append(wind)

// To collect the currate weather
const weatherInfo = async () => {
    try {
        const data = await fetch(url)
        const response = await data.json()
        h1.textContent = response.name
        console.log(response)
        weatherIcon.src = `https://openweathermap.org/img/w/${response.weather[0].icon}.png`
        temperature.textContent = `${Math.round(response.main.temp)}°C`
        weatherDescription.textContent = response.weather[0].description
        wind.textContent = ` ${Math.round(response.wind.speed)} km/h`
        return response

    } catch (error) {
        console.log(error.message)
    }
}

weatherInfo()

// To call the function every hour
setInterval(() => {
    weatherInfo()
}, 3600000)
