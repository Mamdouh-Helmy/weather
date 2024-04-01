let section = document.querySelector('.section')
let btn = document.querySelector('.box-1 button');
let ont_found = document.querySelector('.ont-found');
let weather_box = document.querySelector('.weather-box');
let wather_details = document.querySelector('.wather-details');
let all_wather_details = document.querySelector('.all-wather-details')


btn.addEventListener('click' , getWather)


async function getWather(){
    let input = document.querySelector('.box-1 .input input').value;

    if(input == ''){

        document.querySelector('.location').style.display = 'block'
        document.querySelector('.location button').addEventListener('click' , () => location.reload());

    }else{
        const apiKey = 'f28f8f354768f6f8e6b9c11fab620bfb';
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${input}&appid=${apiKey}`;

        const res1 = await fetch(currentWeatherUrl);
        const data1 = await res1.json()

        const res2 = await fetch(forecastUrl);
        const data2 = await res2.json()

        if(data1.cod === '404'){
            ont_found.style.display = 'block';
            section.style.display = 'none';
            weather_box.style.display = 'none';
            wather_details.style.display = 'none';
            document.querySelector('.box-1').style.display = 'none';
            ont_found.classList.add('fade-in');
            document.querySelector('.ont-found button').addEventListener('click' , () => location.reload());
            return;
        }

        data_1(data1)
        data_2(data2)

            
    }
    
}

function data_1(data1){

        ont_found.style.display = 'none';
        section.style.display = 'block';
        weather_box.style.display = 'block';
        wather_details.style.display = 'flex';

        weather_box.classList.add("fade-in")
        wather_details.classList.add("fade-in")
        
        let img = document.querySelector('.weather-box img')
        let temp = document.querySelector('.weather-box .temp')
        let name = document.querySelector('.weather-box .name')
        let desc = document.querySelector('.weather-box .desc')
        let humidity = document.querySelector('.wather-details .humidity .text span')
        let wind = document.querySelector('.wather-details .wind .text span')


            if(data1.weather[0].main === 'Clear'){
                img.src = 'images/clear.png'

            }else if(data1.weather[0].main === 'Rain'){
                img.src = 'images/rain.png';

            }else if(data1.weather[0].main === 'Snow'){
                img.src = 'images/snowing.png';

            }else if(data1.weather[0].main === 'Clouds'){
                img.src = 'images/cloudy.png';

            }else if(data1.weather[0].main === 'Haze'){
                img.src = 'images/foggy.png';

            }else{
                img.src = ''
            }

            temp.innerHTML = `${parseInt(data1.main.temp)}<span>°C</span>`
            name.innerHTML = `${data1.name}`
            desc.innerHTML = `${data1.weather[0].description}`
            humidity.innerHTML = `${data1.main.humidity}%`
            wind.innerHTML = `${parseInt(data1.wind.speed)}Km/h`
}

function data_2(data2){
        ont_found.style.display = 'none';
        all_wather_details.style.display = 'flex';
        all_wather_details.classList.add("fade-in")

    data2.list.slice(0, 10).forEach(ele => {
        let div = document.createElement('div');
        div.className = 'text';

        let data = document.createElement('p');
        data.className = 'data';
        const dateTime = new Date(ele.dt_txt);
        const hour = dateTime.getHours();
        data.textContent = `${hour}:00`;

        let img = document.createElement('img');
        const iconCode = ele.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        img.src = iconUrl;

        let temp = document.createElement('p');
        temp.className = 'temp';
        temp.textContent = `${Math.round(ele.main.temp - 273.15)}°C`

        div.appendChild(data)
        div.appendChild(img)
        div.appendChild(temp)
        all_wather_details.appendChild(div)
        console.log(ele)
    })

}

// function getWeather() {
//     const apiKey = 'f28f8f354768f6f8e6b9c11fab620bfb';
//     const city = document.getElementById('city').value;

//     if (!city) {
//         alert('Please enter a city');
//         return;
//     }

//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

//     fetch(currentWeatherUrl)
//         .then(response => response.json())
//         .then(data => {
//             displayWeather(data);
//         })
//         .catch(error => {
//             console.error('Error fetching current weather data:', error);
//             alert('Error fetching current weather data. Please try again.');
//         });

//     fetch(forecastUrl)
//         .then(response => response.json())
//         .then(data => {
//             displayHourlyForecast(data.list);
//         })
//         .catch(error => {
//             console.error('Error fetching hourly forecast data:', error);
//             alert('Error fetching hourly forecast data. Please try again.');
//         });
// }

// function displayWeather(data) {
//     const tempDivInfo = document.getElementById('temp-div');
//     const weatherInfoDiv = document.getElementById('weather-info');
//     const weatherIcon = document.getElementById('weather-icon');
//     const hourlyForecastDiv = document.getElementById('hourly-forecast');

//     // Clear previous content
//     weatherInfoDiv.innerHTML = '';
//     hourlyForecastDiv.innerHTML = '';
//     tempDivInfo.innerHTML = '';

//     if (data.cod === '404') {
//         weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
//     } else {
//         const cityName = data.name;
//         const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
//         const description = data.weather[0].description;
//         const iconCode = data.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

//         const temperatureHTML = `
//             <p>${temperature}°C</p>
//         `;

//         const weatherHtml = `
//             <p>${cityName}</p>
//             <p>${description}</p>
//         `;

//         tempDivInfo.innerHTML = temperatureHTML;
//         weatherInfoDiv.innerHTML = weatherHtml;
//         weatherIcon.src = iconUrl;
//         weatherIcon.alt = description;

//         showImage();
//     }
// }

// function displayHourlyForecast(hourlyData) {
//     const hourlyForecastDiv = document.getElementById('hourly-forecast');

//     const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

//     next24Hours.forEach(item => {
//         const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
//         const hour = dateTime.getHours();
//         const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
//         const iconCode = item.weather[0].icon;
//         const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

//         const hourlyItemHtml = `
//             <div class="hourly-item">
//                 <span>${hour}:00</span>
//                 <img src="${iconUrl}" alt="Hourly Weather Icon">
//                 <span>${temperature}°C</span>
//             </div>
//         `;

//         hourlyForecastDiv.innerHTML += hourlyItemHtml;
//     });
// }

// function showImage() {
//     const weatherIcon = document.getElementById('weather-icon');
//     weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
// }