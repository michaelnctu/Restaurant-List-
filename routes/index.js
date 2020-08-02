// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 todos 模組程式碼
const restaurants = require('./modules/restaurants')

// 引入 home 模組程式碼
const home = require('./modules/home')

// 引入 search 模組程式碼
const search = require('./modules/search.js')

// 引入 sort 模組程式碼
const sort = require('./modules/sort.js')


// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/', sort)

// 匯出路由器
module.exports = router