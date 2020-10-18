const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')

app.set('view engine','ejs')
app.use(ejsLayouts)

//body-parser middleware
app.use(express.urlencoded({extended: false}))

// HOME Route
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

const prehistoricCreatures = require('./controllers/prehistoric_creatures')
app.use('/',prehistoricCreatures)

const dinosaurs = require('./controllers/dinosaurs')
app.use('/',dinosaurs)

app.listen(8000, ()=>{
    console.log('Port 8000')
})