const express = require('express')
const app = express()
const pgp = require('pg-promise')()
const mustacheExpress = require('mustache-express')

const connectionString = 'postgres://localhost:5432/mydatabase'
const db = pgp(connectionString)


app.use(express.urlencoded())
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.get('/',(req,res) => {
    db.any('SELECT * FROM blogs;')
    .then(blogs => {
        res.render('index',{blogs: blogs})
    })
})

app.post('/delete-post',(req,res) => {

    const postID = req.body.postID
    console.log(postID)
    db.none('DELETE FROM blogs WHERE post_id = $1;',[postID])
        .then(() => {
            res.redirect('/')
        })

})

app.post('/create-post',(req,res) => {

    const title = req.body.title 
    const body = req.body.body 

    db.none('INSERT INTO blogs(title, body) VALUES($1,$2)',[title, body])
    .then(() => {
        res.redirect('/')
    })

})  

app.post('/update-post',(req,res) => {
    const postID = req.body.postID
        res.render('update',{postID: postID})
})

app.post('/update-post/confirm',(req,res) => {

    const title = req.body.title 
    const body = req.body.body 
    const postID = req.body.postID
    const current_time = new Date()
    //Don't know update formatting
    db.none(`UPDATE blogs SET title=${title}, body=${body}, date_updated=${current_time} WHERE post_id=${postID};`)
    .then(() => {
        res.redirect('/')
    })

})  

app.listen(3000, () => {
    console.log('Server is running...')
})