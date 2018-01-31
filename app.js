const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather.js');
const argv = yargs
  .options({
    a: {
      demand: true,
      describe: 'Address to fetch the weather for',
      string: true,
      alias: 'address'
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage){
    console.log(errorMessage);
  }
  else{
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (error, weatherResults) => {
      if(error){
        console.log(error);
      }else{
        console.log(`It is currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });

  }
});


var logo = document.getElementById('hplogo');
setInterval(() => {logo.width += 5;}, 100);
