const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});

app.post('/', (req, res) => {

    const query = req.body.cityName;
    const apiKey = '99fb989cab0f43969d1190447230401'
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`
    https.get(url, (response) => {
        console.log(response.statusCode)

        response.on('data', (data) => {
            const weatherData = JSON.parse(data);
            const location = weatherData.location.name;
            const temp = weatherData.current.temp_c;
            const condition = weatherData.current.condition.text
            const conditionPic = weatherData.current.condition.icon

            console.log(location, temp, condition);
            res.send(`<h1>The temperature in ${location} is 
    ${temp}°C and the weather is currently ${condition.toLowerCase()} <img src='${`https:${conditionPic}'>`}</h1>`)
        })
    })
})





app.listen(8080, () => {
    console.log('Server is working!');
})