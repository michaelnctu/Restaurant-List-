
const Restaurant = require('../restaurant')  //resutaurant.js
const db = require('../../config/mongoose')

const restaurantList = require('../../restaurant.json')  //existing restaurant list


db.once('open', () => {
  console.log('mongodb connected')

  restaurantList.results.forEach(element => {
    Restaurant.create(element)
  });

  console.log('done')
})