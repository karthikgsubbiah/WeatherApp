const request = require('request');

var getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/93b75aecfa9597c0e4aff52fb3e5d976/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if(error){
      callback('Unable to connect to forecast.io servers');
    }else if(!error && response.statusCode === 200){
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }else{
      callback('Unable to fetch the weather');
    }
  });
}

module.exports.getWeather = getWeather;
