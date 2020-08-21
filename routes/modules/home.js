// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant') // 載入 restaurant model


// index
router.get('/', (req, res) => {
  const userId = req.user._id
  // 取出 Restaurant model 裡的所有資料
  Restaurant.find({ userId: userId })
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(restaurants => res.render('index', { restaurants })) // 將資料傳給 index 樣板 restaurants 是拿到的資料
    .catch(error => console.error(error)) // 錯誤處理
})



module.exports = router