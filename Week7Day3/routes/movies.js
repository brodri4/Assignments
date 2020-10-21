const express = require('express')
const router = express.Router() 
const { v4: uuidv4 } = require('uuid');


router.get('/', (req,res) => {
    console.log(genreList)
    res.render('movies', {allMovies: movies, movie: movie, genreList: genreList})
})


router.post('/create-movie',(req,res) => {
    const title = req.body.title
    const imageURL = req.body.imageURL 
    const description = req.body.description 
    const genre = req.body.genre
    genreList.push({genre: genre})
    /* need to remove duplicates */


    let movieDetail = {title: title, imageURL: imageURL, description: description, genre:genre, movieID: uuidv4() }
    movies.push(movieDetail)

    res.redirect('/movies')

})

router.post('/delete-movie',(req,res) => {
    let movieID = req.body.movieID
    movies = movies.filter(movie =>{
        return movie.movieID != movieID
    })
    res.redirect('/movies')
})

router.post('/:movieid',(req,res) => {
    let movieDetailID = req.params.movieid
    let movieDetails = movies.filter(movie =>{
        return movie.movieID == movieDetailID
    })
    movie = movieDetails 
    res.redirect('/movies')
})

/* Need to add a filter route */



module.exports = router 