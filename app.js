const request = require('postman-request');
const chalk = require('chalk');

const locationUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/new%20delhi.json?access_token=pk.eyJ1Ijoib21nLXBrIiwiYSI6ImNrdmVzcGh1ejEzaTkycW1wa3BsenVjem8ifQ.v3kc7zaEhoPHCPv1cqwH0Q&limit=1";

request({ url: locationUrl, json: true }, function getCoordinates(erro, res) {
  const data = res.body;
  console.log(chalk.inverse(data.features[0].place_name));
  const lat = data.features[0].center[0];
  const long = data.features[0].center[1]
  console.log("Latitude: ", lat);
  console.log("Longitude: ", long);
  getWeather(lat, long);
});

function getWeather(lat, long) {
  const weatherLocationUrl = `http://api.weatherstack.com/current?access_key=04540a5d25aab05aa0701b18ae074ee3&query=${lat},${long}`;
  request({ url: weatherLocationUrl, json: true }, function weatherHandler(error, res) {
    const data = res.body;
    console.log(chalk.inverse("Weather report"));
    console.log(`Temperature is ${data.current.temperature} but it feels like ${data.current.feelslike}`);
  });
}