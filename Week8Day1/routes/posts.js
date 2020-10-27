const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')()
const connectionString = 'postgres://localhost:5432/mydatabase'
const db = pgp(connectionString) 

router.get('/',(req,res) => {
    db.any('SELECT * FROM blogs;')
    .then(blogs => {
        res.render('index',{blogs: blogs})
    })
})

router.post('/create-post',(req,res) => {

    const title = req.body.title 
    const body = req.body.body 

    db.none('INSERT INTO blogs(title, body) VALUES($1,$2)',[title, body])
    .then(() => {
        res.redirect('/posts')
    })

})  

router.post('/delete-post',(req,res) => {

    const postID = req.body.postID
    db.none('DELETE FROM blogs WHERE post_id = $1;',[postID])
        .then(() => {
            res.redirect('/posts')
        })

})

router.post('/update-post',(req,res) => {
    const postID = req.body.postID
        res.render('update',{postID: postID})
})

router.post('/update-post/confirm',(req,res) => {

    const body = req.body.body 
    const postID = req.body.postID
    db.none('UPDATE blogs SET body=$1, date_updated=current_timestamp WHERE post_id=$2',[body, postID])
    .then(() => {
        res.redirect('/posts')
    })

})  

module.exports = router