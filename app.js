const express = require('express')  //使用express

// 引用路由器
const routes = require('./routes')

const app = express()
const exphbs = require('express-handlebars')  //handlebars
const port = 3000


const bodyParser = require('body-parser')

const restaurantList = require('./restaurant.json')



// 載入 method-override
const methodOverride = require('method-override')




require('./config/mongoose') //招喚config mongoose連線

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

//method override
app.use(methodOverride('_method'))


//setting static files
app.use(express.static('public'))

// 將 request 導入路由器
app.use(routes)


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})