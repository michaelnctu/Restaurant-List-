const express = require('express')
const router = express.Router()
const User = require('../../models/user.js')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {  //authenticate為passport提通的方法


  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true


}),
)

router.post('/register', (req, res) => {

  const { email, name, password, confirmPassword } = req.body  //client端傳入

  const errors = []

  if (!email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不符' })
  }
  if (errors.length) {     //表示前面有出現錯誤
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email }).then(user => {

    if (user) {
      errors.push({ message: '這個email已經註冊過了' })
      return res.render('register', {
        errors, name, email, password, confirmPassword
      })
    }

    return bcrypt
      .genSalt(10) //加鹽
      .then(salt =>
        bcrypt.hash(password, salt)
      )
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))

  })
})

router.get('/logout', (req, res) => {
  req.logout()  //Passport.js 提供的函式 清除session
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})


router.get('/register', (req, res) => {
  res.render('register')
})


module.exports = router
