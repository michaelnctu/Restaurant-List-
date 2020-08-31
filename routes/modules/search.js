const express = require('express')
const router = express.Router()

const restaurantSeed = require('../../models/restaurant.js')


router.get('/', (req, res) => {
  const keyword = req.query.keyword.toLowerCase()
  const userId = req.user._id
  restaurantSeed.find({ userId }).lean()
    .then(restaurants => {
      const searchValue = restaurants.filter(restaurant => {
        return restaurant.name.includes(keyword) || restaurant.category.includes(keyword) ||
          restaurant.name_en.toLowerCase().includes(keyword)
      })
      res.render('index', { restaurants: searchValue, keyword: keyword })
    })
    .catch(error => console.log(error))
})

module.exports = router