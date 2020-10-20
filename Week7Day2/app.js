const express = require('express')
const app = express() 
const mustacheExpresss = require('mustache-express')
const { v4: uuidv4 } = require('uuid');

let trips = [] 

 
app.use(express.urlencoded()) 
app.use(express.static('views'))

app.engine('mustache', mustacheExpresss())

app.set('views','./views')

app.set('view engine', 'mustache')


app.get('/',(req,res) => {
    res.render('index')
})

app.get('/trips', (req,res) => {
    res.render('trips', {allTrips: trips})
})

app.post('/delete-trip',(req,res) => {
    const tripID = req.body.tripID
    trips = trips.filter(trip =>{
        return trip.tripID != tripID
    })
    res.redirect('/trips')
})

app.post('/create-task',(req,res) => {
    const title = req.body.title
    const imageURL = req.body.imageURL 
    const dateDepart = req.body.dateDepart 
    const dateReturn = req.body.dateReturn

    let trip = {title: title, imageURL: imageURL, dateDepart: dateDepart, dateReturn:dateReturn, tripID: uuidv4() }
    trips.push(trip)

    res.redirect('/trips')

})
app.listen(3000, () => {
    console.log('Server is running...')
})


