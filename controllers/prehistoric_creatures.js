const express = require('express')
const router = express.Router()
const fs = require('fs')

// CREATURES Index Route
router.get('/',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json') // read the json file, turn into string
    let creatureData = JSON.parse(creatures) // convert the string to an array
    
    // handle a query string if there is one
    // console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter
    if (nameFilter) { // reassign dinoData to only be an array of dinos whose name matches the query string name (and ignore case)
        creatureData = creatureData.filter(creature => {
            return creature.type.toLowerCase() === nameFilter.toLowerCase() // exact match // maybe "contains" or something similar would work for a wildcard, starts with, etc
        })
    }
    
    res.render('prehistoric_creatures/index.ejs', {creatures: creatureData})
})

// CREATURE NEW Route
router.get('/new',(req,res)=>{
    res.render('prehistoric_creatures/new')
})


// CREATURES SHOW ROUTE
router.get('/:idx',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)

    // get array index from url parameter
    let creatureIndex = parseInt(req.params.idx)

    // console.log(dinoData[dinoIndex])

    res.render('prehistoric_creatures/show', {creature: creatureData[creatureIndex], creatureId: creatureIndex})
})


// CREATURES POST Route
router.post('/',(req,res)=>{
    // console.log(req.body)
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    creatureData.push(req.body) // push the new dino to the array
    // save the new dinoData to the dinosaurs.json file
    // JSON.stringify does the opposite of JSON.parse
    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    // redirect to the GET /dinosaurs route (index)
    res.redirect('/prehistoric-creatures')
})

// CREATURES GET EDIT Route

router.get('/edit/:idx',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/edit',{creature: creatureData[req.params.idx], creatureId: req.params.idx})
})

router.put('/:idx', (req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)

    creatureData[req.params.idx].name = req.body.name
    creatureData[req.params.idx].type = req.body.type
    creatureData[req.params.idx].img_url = req.body.img_url

    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    
    res.redirect(`/prehistoric-creatures/${req.params.idx}`)
})

// CREATURES DELETE Route
router.delete('/:idx', (req, res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json')
    let creatureData = JSON.parse(creatures)

    creatureData.splice(req.params.idx,1)

    fs.writeFileSync('./prehistoric-creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric-creatures')
})

module.exports = router