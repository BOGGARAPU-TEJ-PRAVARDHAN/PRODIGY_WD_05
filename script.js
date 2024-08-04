const input = document.querySelector('input');
const button = document.querySelector('#btn');
const temperatureSpan = document.querySelector('#temperature');
const windSpan = document.querySelector('#wind');
const humiditySpan = document.querySelector('#humidity');
const rainSpan = document.querySelector('#rain');
const snowSpan = document.querySelector('#snow');
const cloudSpan = document.querySelector('#cloud');
const loadingSpinner = document.querySelector('#loading-spinner');

const fetchData = async () => {
    let loc = input.value;

    if (loc === '') {
        alert('Enter location first');
        input.style.border = '2px solid red';
        return; 
    } else {
        input.style.border = '';
    }

    loadingSpinner.style.display = 'inline-block'; 

    const customUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${loc}&apikey=BikZ8ocSwCMLDgyA4YwrUjfAowjEV5MM`;

    try {
        let response = await fetch(customUrl);
        let jsonData = await response.json(); 
        console.log(jsonData); 

        const { humidity, temperature, windSpeed, rainIntensity, snowIntensity, cloudCover } = jsonData.data.values;

        temperatureSpan.innerText = `${temperature}°C`;
        windSpan.innerText = `${windSpeed} km/h`;
        humiditySpan.innerText = `${humidity}%`;
        rainSpan.innerText = rainIntensity > 0 ? `${rainIntensity} mm` : '0 mm';
        snowSpan.innerText = snowIntensity > 0 ? `${snowIntensity} inch` : '0 inch';
        cloudSpan.innerText = cloudCover > 0 ? `${cloudCover}%` : '0%';

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again later.');
    } finally {
        loadingSpinner.style.display = 'none'; 
    }
}

button.addEventListener('click', fetchData);
