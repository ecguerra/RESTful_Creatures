const express = require('express')
const router = express.Router()
const fs = require('fs')

// DINO Index Route
router.get('/dinosaurs',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json') // read the json file, turn into string
    let dinoData = JSON.parse(dinosaurs) // convert the string to an array
    
    // handle a query string if there is one
    // console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if (nameFilter) { // reassign dinoData to only be an array of dinos whose name matches the query string name (and ignore case)
        dinoData = dinoData.filter(dino => {
            return dino.name.toLowerCase() === nameFilter.toLowerCase() // exact match // maybe "contains" or something similar would work for a wildcard, starts with, etc
        })
    }
    
    res.render('dinosaurs/index.ejs', {dinosaurs: dinoData})
})

// DINO NEW Route
router.get('/dinosaurs/new',(req,res)=>{
    res.render('dinosaurs/new')
})

// DINO SHOW Route
router.get('/dinosaurs/:idx',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = parseInt(req.params.idx)

    // console.log(dinoData[dinoIndex])

    res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
})

// DINO POST Route
router.post('/dinosaurs',(req,res)=>{
    // console.log(req.body)
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) // push the new dino to the array
    // save the new dinoData to the dinosaurs.json file
    // JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to the GET /dinosaurs route (index)
    res.redirect('/dinosaurs')
})




module.exports = router