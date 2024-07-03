const express = require('express');
const https = require('https')

const app = express();
app.use(express.json());
app.set('trust proxy', true);

const apiKey = "38c3094491af463d02763f0e5c714782";

const locationData = {
    country: "Nigeria",
    city: "Lagos",
    name: "George"
}

const api = "https://api.openweathermap.org/data/2.5/weather?q=" + locationData.city +" &mode=json&units=metric&appid=" + apiKey;
 
app.get("/api/hello",  (req, res) => {
   let { visitor_name } = req.query;
    const ip = req.ip;
     https.get(api, function(response) {
        response.on ("data", function(data) {
          const weatherData = JSON.parse(data)
          const temperature = weatherData.main.temp
      // message =  
      //    res.write(`{ip:${ip} 
      //   "Location": ${locationData.city} 
      //   "greeting": Hello, ${locationData.name}!, the temperature  is ${temperature} degree celcius in ${locationData.city}}`)
          res.send({
            ip: ip,
            "Location": locationData.city,
            "greeting": `Hello, ${locationData.name}!, the temperature is ${temperature} degrees celcius in ${locationData.city}`,
          })
        })
     })
     
});

app.listen(4000, () => {
   console.log( 'listening on https://localhost: 4000')
})