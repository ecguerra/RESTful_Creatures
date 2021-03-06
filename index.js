const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.set('view engine','ejs')
app.use(ejsLayouts)

//body-parser middleware
app.use(express.urlencoded({extended: false}))

// HOME Route
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

const prehistoricCreatures = require('./controllers/prehistoric_creatures')
app.use('/prehistoric-creatures',prehistoricCreatures)

const dinosaurs = require('./controllers/dinosaurs')
app.use('/dinosaurs',dinosaurs)

app.use(express.static('public'))

app.listen(8000, ()=>{
    console.log('Port 8000')
})