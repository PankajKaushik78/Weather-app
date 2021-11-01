const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");


geocode("new delhi", (error, res) => {
  console.log("Error", error);
  console.log("Res", res);

  forecast(28.7041, 77.1025, (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
  })

});

