const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
  a: {
    describe: 'Address of the location',
    demand: true,
    string: true,
    alias: 'address'
  }
}).help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeAddressUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeAddressUrl).then((response) => {
  console.log(response.data.results[0].formatted_address);
  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  var weatherUrl = `https://api.darksky.net/forecast/93b75aecfa9597c0e4aff52fb3e5d976/${latitude},${longitude}`;
  return axios.get(weatherUrl);
}).then((response) => {
  console.log(`It is currently ${response.data.currently.temperature}. It feels like ${response.data.currently.apparentTemperature}.`);
}).catch((e) => {
  console.log(e.message);
});
