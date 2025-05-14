const apiKey = "36f37eda7b8b69dc955a34da0cd08a17"; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherDiv = document.getElementById("weatherInfo");

  if (!city) {
    weatherDiv.innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const { name } = data;
      const { temp } = data.main;
      const { description, icon } = data.weather[0];

      weatherDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" />
        <p><strong>${temp}°C</strong></p>
        <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
      `;
    })
    .catch(error => {
      weatherDiv.innerHTML = `<p>${error.message}</p>`;
    });
}
