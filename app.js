const express = require('express');
const https = require('https')

const app = express();
app.use(express.json());
app.set('trust proxy', true);

const apiKey = "38c3094491af463d02763f0e5c714782";
const location = {
    location: "France ",
    city: "Paris"
}
const api = "https://api.openweathermap.org/data/2.5/weather?q=" + location.city +" &mode=json&units=metric&appid=" + apiKey;
 
app.get("/api",  (req, res) => {
   let message = req.query.message 
    const ip = req.ip;
     https.get(api, function(response) {
        response.on ("data", function(data) {
          const weatherData = JSON.parse(data)
          const temperature = weatherData.main.temp
      message =  
        res.write(`{ip:${ip} 
        "Location": ${location.city} 
        "greeting": Hello, Nathan!, the temperature  is ${temperature} degree celcius in ${location.city}}`)
          res.send()
        })
     })
    
});

app.listen(4000, () => {
   console.log( 'listening on https://localhost: 4000')
})