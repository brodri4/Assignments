const express = require('express')
const app  = express()
const models = require('./models')
const mustacheExpress = require('mustache-express')
const postsRouter = require('./routes/posts')

app.use(express.urlencoded())
app.use('/posts',postsRouter)
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

app.post('/update-confirm',(req,res) => {

    const body = req.body.body
    const title = req.body.title
    const category = req.body.category 
    const postID = req.body.postID
    models.blogs.update({
        title: title, 
        body: body, 
        category: category
    },{
        where: {
            id: postID 
        }
    }).then(updatedblog => {
        res.redirect('/posts')
    })
})  

app.listen(3000, () => {
    console.log('Server is running...')
})

