// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant') // 載入 restaurant model


// show add restaurant page
router.get('/create', (req, res) => {
  return res.render('create')  //進入create頁面
})


// create / update restaurant
router.post('/', (req, res) => {
  const userId = req.user._id
  const { google_map, name, name_en, category, image, location, phone, rating, description } = req.body
  return Restaurant.create({ google_map, name, name_en, category, image, location, phone, rating, description, userId })
    .then(() => res.redirect('/')) //回到u根目錄
    .catch(error => console.log(error))

})


//detail
router.get('/:id/detail', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findById({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit
router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findById({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//edit update restaurant info
router.put('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  return Restaurant.findById({ _id, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//delete
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findById({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



//點擊圖片
router.get('/:id', (req, res) => {
  // console.log(req.params.restaurant_id)
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findById({ _id, userId })
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})



module.exports = router