const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = `https://api.openweathermap.org/data/2.5/weather?q=`
const API_KEY = `&appid=76273bcf031e1929ba00c98e984fe724`
const API_UNITS = `&units=metric`

const getWeather = () => {
	const city = input.value
	const URL = API_LINK + city + API_KEY + API_UNITS

	axios
		.get(URL)
		.then(res => {
			const temp = Math.floor(res.data.main.temp)
			const humi = res.data.main.humidity
			const status = Object.assign({}, ...res.data.weather)

			cityName.textContent = res.data.name
			temperature.textContent = `${temp} °C`
			humidity.textContent = `${humi}%`
			weather.textContent = status.main
			console.log(status.main)
			warning.textContent = ``

			if (status.id == 800) {
				photo.setAttribute(`src`, `./img/sun.png`)
			} else if (status.id > 800) {
				photo.setAttribute(`src`, `./img/cloud.png`)
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute(`src`, `./img/ice.png`)
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute(`src`, `./img/rain.png`)
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute(`src`, `./img/drizzle.png`)
			} else if (status.id >= 200 && status.id < 300) {
				photo.setAttribute(`src`, `./img/thunderstorm.png`)
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute(`src`, `./img/unknown.png`)
			} else {
				photo.setAttribute(`src`, `./img/unknown.png`)
			}
		})
		.catch((warning.textContent = `Please input correct city name`))

	input.value = ``
}

const enter = e => {
	if (e.key === `Enter`) {
		getWeather()
	}
}

input.addEventListener(`keyup`, enter)
button.addEventListener('click', getWeather)
