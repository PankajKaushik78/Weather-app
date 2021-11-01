const request = require("postman-request");
const chalk = require("chalk")

function geocode(location, callback) {
  const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1Ijoib21nLXBrIiwiYSI6ImNrdmVzcGh1ejEzaTkycW1wa3BsenVjem8ifQ.v3kc7zaEhoPHCPv1cqwH0Q&limit=1`;

  request({ url: locationUrl, json: true }, function geocodeHandler(error, res) {
    if (error) {
      callback("Unable to connect to the geocode service");
    } else if (res.body.features.length == 0) {
      callback("There is no location with these coordinates. Please try other coordinates");
    } else {
      const data = res.body;
      const lat = data.features[0].center[1];
      const long = data.features[0].center[0];
      const place_name = data.features[0].place_name;
      callback(undefined, {
        latitude: lat,
        longitude: long,
        location: place_name
      });
    }
  });
}

module.exports = geocode;
