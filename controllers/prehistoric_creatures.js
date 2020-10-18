const express = require('express')
const router = express.Router()
const fs = require('fs')

// CREATURES Index Route
router.get('/prehistoric-creatures',(req,res)=>{
    let creatures = fs.readFileSync('./prehistoric-creatures.json') // read the json file, turn into string
    let creatureData = JSON.parse(creatures) // convert the string to an array
    
    // handle a query string if there is one
    // console.log(req.query.nameFilter)
    // let nameFilter = req.query.nameFilter
    // if (nameFilter) { // reassign dinoData to only be an array of dinos whose name matches the query string name (and ignore case)
    //     dinoData = dinoData.filter(dino => {
    //         return dino.name.toLowerCase() === nameFilter.toLowerCase() // exact match // maybe "contains" or something similar would work for a wildcard, starts with, etc
    //     })
    // }
    
    res.render('prehistoric_creatures/index.ejs', {creatures: creatureData})
})


module.exports = router