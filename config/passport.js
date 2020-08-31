const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')


module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // 設定本地登入策略
  passport.use(new LocalStrategy

    // 這是 verify callback
    ({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('error_messages', 'This email has not registerd!'))
          }
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash('error_messages', '密碼與email不符'))
            }
            return done(null, user) //沒有錯誤 附上使用者資訊
          })
        })
        .catch(err => done(err, false)) //錯誤處理
    }))



  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile)
      const { name, email } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => User.create({
              name,
              email,
              password: hash
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }))

  // 設定序列化與反序列化
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))

  })

}


// passport.use(
//   new LocalStrategy(
//     // customize user field，預設使用 username 和 password 作為驗證的欄位
//     {
//       usernameField: 'email',
//       passReqToCallback: true, // 如果需要在 verify callback 中取得 req
//     },
//     // customize verify callback
//     // 因為上面有註明 passReqToCallback: true，所以第一個參數會是 req
//     async (req, email, password, done) => {
//       try {
//         const user = await User.findOne({ email: username });
//         if (!user) {
//           return done(null, false,
//             // { message: 'Incorrect username.' }
//             req.flash('error_messages', '不存在此email'),
//           );
//         }
//         if (!bcrypt.compareSync(password, user.password)) {
//           return done(null, false,
//             // { message: 'Incorrect password.' }
//             req.flash('error_messages', '帳號或密碼輸入錯誤'),
//           );
//         }
//         return done(null, user, req.flash('success_messages', '登入成功'));
//       } catch (error) {
//         return done(error);
//       }
//     },
//   ),
// );