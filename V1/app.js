const path = require('path')
const express = require('express') //express exports a function therefore is executed as a function
const bodyParser = require('body-parser') //want to be able to parse req.body

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({ extended: false })) // need to parse files use a differnt bodyparser
app.use(express.static(path.join(__dirname, 'public')))
app.use('/admin', adminRoutes) //filtering
app.use(shopRoutes)

app.use((req, res, next) => {
  //res.status(404).render(path.join(__dirname, 'views', 'not-found.html'))
  console.log('here')
  res.render('404', { pageTitle: 'Page Nothbj Found' })
})
app.listen(3000)
