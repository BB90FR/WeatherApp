var express = require('express');
var router = express.Router();
const request = require('sync-request');
const cityModel = require('../models/cities'); 


// Home page
router.get('/', function(req, res, next) {
  res.render('login', { });
});



// Weather page
router.get('/weather', async function(req, res, next) {

  if(req.session.user != null) {
    const raw = await request('GET', `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.API_KEY}&units=metric`);
    const data = JSON.parse(raw.body);

    let cityList = await cityModel.find();
    
    res.render('weather', { cityList, data, user: req.session.user });
  } else {
    res.redirect('/');
  };
});



// Add city
router.post('/add-city', async (req, res) => {
  const raw = await request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&appid=${process.env.API_KEY}&units=metric`);
  const data = JSON.parse(raw.body);
  
  let cityList = await cityModel.find();
  let cityAlreadyExist = false;
  
  for(let i = 0; i < cityList.length; i++) {
    if(cityList[i].city.toLowerCase() == req.body.city.toLowerCase()) {
      cityAlreadyExist = true;
    }
  }

  if (data.cod != 404 && !cityAlreadyExist && req.body.city.length > 0) {
           
    let newCity = new cityModel ({
      city : req.body.city,
      img: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      weather: data.weather[0].description,
      minTemp: data.main.temp_min,
      maxTemp: data.main.temp_max,
      lat: data.coord.lat,
      lon: data.coord.lon,
      country: data.sys.country
    });
    await newCity.save();
  }
  
  cityList = await cityModel.find();

  res.render('weather', { cityList, data, user: req.session.user });
});



// Delete city
router.get('/delete-city', async (req, res, next) => {
  const raw = await request('GET', `http://api.openweathermap.org/data/2.5/weather?q=${req.body.id}&appid=${process.env.API_KEY}&units=metric`);
  const data = JSON.parse(raw.body);
  
  await cityModel.deleteOne({_id: req.query.id});

  let cityList = await cityModel.find();

  res.render('weather', { cityList, data, user: req.session.user });
});



// Update data
router.get('/update-data', async (req, res) => {
  let raw;
  let data;
  let cityList = await cityModel.find();

    for(let i = 0; i < cityList.length; i++) {

      raw = await request('GET', `http://api.openweathermap.org/data/2.5/weather?q=${cityList[i].city}&appid=${process.env.API_KEY}&units=metric`);
      data = JSON.parse(raw.body);
          
      await cityModel.updateOne(
      { _id: cityList[i].id},
      { 
        img: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
        weather: data.weather[0].description,
        minTemp: data.main.temp_min,
        maxTemp: data.main.temp_max });
    };

  cityList = await cityModel.find();

  res.render('weather', { cityList, data, user: req.session.user });
});

module.exports = router;