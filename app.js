const express = require('express');
const https = require('https')

const app = express();
app.set('trust proxy', true);
app.use(express.json());

const apiKey = "38c3094491af463d02763f0e5c714782";

const locationData = {
    country: "Nigeria",
    city: "Lagos",
    name: "Mark"
}

const api = "https://api.openweathermap.org/data/2.5/weather?q=" + locationData.city +" &mode=json&units=metric&appid=" + apiKey;
 
app.get("/api/hello",  (req, res) => {
   let { visitor_name } = req.query;
    const ip = req.ip;
     https.get(api, function(response) {
        response.on ("data", function(data) {
          const weatherData = JSON.parse(data)
          const temperature = weatherData.main.temp
            res.json({
            "Client_ip": ip,
            "Location": locationData.city,
            "greeting": `Hello, ${locationData.name}!, the temperature is ${temperature} degree celcius in ${locationData.city}`,
          })
        })
     })
     
});

app.listen(4000, () => {
   console.log( 'listening on https://localhost: 4000')
})