const express = require('express')
const app = express() 
const mustacheExpresss = require('mustache-express')
const { v4: uuidv4 } = require('uuid');

global.movies = [] 
global.movie = []
global.genreList = []


const moviesRouter = require('./routes/movies')
app.use(express.urlencoded()) 
app.use(express.static('views'))
app.use('/movies',moviesRouter)

app.engine('mustache', mustacheExpresss())

app.set('views','./views')
app.set('view engine', 'mustache')





app.listen(3000, () => {
    console.log('Server is running...')
})