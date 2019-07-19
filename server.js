const express = require('express')
const bodyParser = require('body-parser');
const request = require('request')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.render('index')
})
app.post('/', function (req, res) {
  let city = req.body.city;
  let apiKey = `ec86d806d03ce226c6d1db99c257c1ac`
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, respons, body) {
    if (err) {
      res.render('index', {
        weather: null, error: 'ERREUR, la ville n\'a pas été trouvé'
      })
    } else {
      let weather = JSON.parse(body);
      if (weather.main == undefined) {
        res.render('index', {
          weather: null, error: 'ERREUR, la ville n\'a pas été trouvé'
        });
      } else {
        let weatherText = `Il fait ${weather.main.temp} degrés à ${weather.name}!`;
        res.render('index', { weatherText: weatherText, error: null })
      }
    }
  })
})
app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
