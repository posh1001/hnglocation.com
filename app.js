const axios = require('axios');
 require('dotenv').config();
const express = require('express');



const app = express();
app.set('trust proxy', true);
app.use(express.json());


const port = 4000 || process.env.port

app.get("/api/hello",  async(req, res) => {
 try {
   const visitor_name = req.query.visitor_name;

 
   const ipResponse = await axios.get("https://api.ipify.org?format=json")
  
   const ipAddress = ipResponse.data.ip

 
   const API_KEY = process.env.API_KEY;
 
   const wResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?q=${ipAddress}&key=${API_KEY}`)

   res.json({
    Client_ip: ipAddress,
    location: wResponse.data.location.region ,
    greeting: `Hello, ${visitor_name}!, the temperature is ${wResponse.data.current.temp_c} degree in ${wResponse.data.location.region}`
   })
  
 
 } catch (error) {
   console.error('Error fetching ip info:', error.message)

 }
});

app.listen(port, () => {
   console.log("connected on port 4000")
  } )