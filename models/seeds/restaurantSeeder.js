
const Restaurant = require('../restaurant')  //resutaurant.js
const User = require('../user')
const db = require('../../config/mongoose')
const restaurantList = require('../../restaurant.json')  //existing restaurant list
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]





db.once('open', () => {

  SEED_USER.forEach(element => {

    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(element.password, salt))
      .then(hash => {
        console.log('成功', hash)

        return Promise.all(Array.from(
          { length: 1 },
          (value, i) => {
            User.create({
              name: element.name,
              email: element.email,
              password: hash
            })
          }
        )
        )
      })

      .then(user => {
        const userId = user._id

        if (user.username === 'user1') {
          const data1 = restaurantList.results.slice(0, 3)
          return Promise.all(Array.from(
            { length: 3 },
            (value, i) => {
              let data = data1[i] //data 為當前的object
              data.userId = userId
              console.log(data)
              Restaurant.create(data) //key-value pair
            }
          ))

        }
        if ((user.username === 'user2')) {
          const data2 = restaurantList.results.slice(4, 7)
          return Promise.all(Array.from(
            { length: 3 },
            (value, i) => {
              let data = data2[i] //data 為當前的object
              data.userId = userId
              console.log(data)
              Restaurant.create(data) //key-value pair
            }
          ))
        }
      })

  })

  console.log('done')

})




// restaurantList.results.forEach(element => {
//   Restaurant.create(element)
// });




// const SEED_USER = [{
//   name: 'user1',
//   email: 'user1@example.com',
//   password: '12345678'

// },
// {
//   name: 'user2',
//   email: 'user2@example.com',
//   password: '12345678'
// }]

// db.once('open', () => {
//   bcrypt
//     .genSalt(10)
//     .then(salt => bcrypt.hash(SEED_USER.password, salt))
//     .then(hash => User.create({
//       name: SEED_USER.name,
//       email: SEED_USER.email,
//       password: hash
//     }))

//     .then(user => {
//       console.log(restaurantList.results[0])
//       const userId = user._id
//       return Promise.all(Array.from(
//         { length: 5 },
//         (value, i) => {
//           const data = restaurantList.results[i] //data 為當前的object
//           data.userId = userId
//           console.log(data)
//           Restaurant.create(data)
//         }
//       ))


//     })
//     .then(() => {
//       console.log('done')
//       process.exit()
//     })
// })



