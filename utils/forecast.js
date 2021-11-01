const request = require("postman-request");

function forecast(lat, long, callback) {
  const weatherLocationUrl = `http://api.weatherstack.com/current?access_key=04540a5d25aab05aa0701b18ae074ee3&query=${lat},${long}`;
  request(
    { url: weatherLocationUrl, json: true },
    function weatherHandler(error, res) {
      if (error) {
        callback("Unable to connect to the weather service");
      } else if (res.body.error) {
        callback("Unable to find the location");
      } else {
        const data = res.body;
        callback(
          undefined,
          `Location: ${data.location.name}. Temperature is ${data.current.temperature} and it feels like ${data.current.feelslike}`
        );
      }
    }
  );
}

module.exports = forecast;
