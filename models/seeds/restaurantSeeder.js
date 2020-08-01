
const Restaurant = require('../restaurant')
const db = require('../../config/mongoose')

const restaurantList = require('./restaurant.json')


db.once('open', () => {
  console.log('mongodb connected')

  restaurantList.results.forEach(element => {
    Restaurant.create(element)
  });

  console.log('done')
})