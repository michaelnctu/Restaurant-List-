// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant') // 載入 restaurant model


//detail
router.get('/:id/detail', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

//edit
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

//edit
router.put('/:id', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const category = req.body.category;
  const rating = req.body.rating;
  const image = req.body.image;
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      rest.category = category;
      rest.rating = rating;
      rest.image = image;
      return restaurant.save()
    })
    .then(() => res.redirect('/:id'))
    .catch(error => console.log(error))
})

//delete
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(restaurant => res.render('delete'))
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})



//點擊圖片
router.get('/:id', (req, res) => {
  // console.log(req.params.restaurant_id)
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})



module.exports = router