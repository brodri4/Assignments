const express = require('express')
const router = express.Router()
const models = require('../models')

router.get('/',(req,res) => {
    models.blogs.findAll().then(posts => {
        res.render('posts',{posts: posts})
    })
})

router.post('/create-post',(req,res) => {

    const title = req.body.title 
    const body = req.body.body 
    const category = req.body.category 


    let post = models.blogs.build({
        title: title, 
        body:body, 
        category:category
    })

    post.save().then((savedPosts) => {
        res.redirect('/posts')
    }).catch((error) => {
        res.render('error')
    })
        
})

router.post('/delete-post',(req,res) => {

    const postID = req.body.postID 

    models.blogs.destroy({
        where: {
            id: postID
        }
    }).then(deletedPost => {
        console.log(deletedPost)
        res.redirect('/posts') 
    })
})

router.post('/update-post',(req,res) => {
    const title = req.body.title
    const body = req.body.body
    const category = req.body.category
    
    const postID = req.body.postID
        res.render('update',{title:title, body:body, category:category, postID: postID})
})




router.post('/filter', (req,res) => {
    const category = req.body.category
    models.blogs.findAll({
        where: {
            category: category
        }
    }).then(posts => {
        res.render('filter',{posts: posts})
    })
})

module.exports = router