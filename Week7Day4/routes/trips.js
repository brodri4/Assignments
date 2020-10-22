const express = require('express')
const router = express.Router() 
const { v4: uuidv4 } = require('uuid');


router.get('/',(req,res) => {
    console.log(trips)
    res.render('trips', {allTrips: trips})
})

router.post('/create-trip',(req,res) => {
    const title = req.body.title
    const imageURL = req.body.imageURL 
    const dateDepart = req.body.dateDepart 
    const dateReturn = req.body.dateReturn

    let trip = {title: title, imageURL: imageURL, dateDepart: dateDepart, dateReturn:dateReturn, tripID: uuidv4() }
    trips.push(trip)

    res.redirect('/trips')

})

router.post('/delete-trip',(req,res) => {
    const tripID = req.body.tripID
    trips = trips.filter(trip =>{
        return trip.tripID != tripID
    })
    res.redirect('/trips')
})

module.exports = router 