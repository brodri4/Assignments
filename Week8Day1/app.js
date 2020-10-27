const express = require('express')
const app = express()
const session = require('express-session')
const pgp = require('pg-promise')()
const postsRouter = require('./routes/posts')
var bcrypt = require('bcryptjs');
const mustacheExpress = require('mustache-express')

const connectionString = 'postgres://localhost:5432/mydatabase'
const db = pgp(connectionString)


app.use(express.urlencoded())
app.use(session({
    secret: 'SPONGEBOB',
    resave: false,
    saveUninitialized: true
}))
app.use('/posts',authenticate,postsRouter)
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')



app.get('/register', (req,res) => {
    res.render('register')
})

app.get('/login', (req,res) => {
    res.render('login')
})








app.post('/login', (req,res) => {
    const username = req.body.username
    const password = req.body.password
    db.any('SELECT username, password FROM users')
    .then((users)=>{
        console.log(users)
        const persistedUser = users.find(user => {
            return user.username == username
        })
        console.log(persistedUser)
        if (persistedUser) {
            bcrypt.compare(password, persistedUser.password, function (err, result) {
                if (result) {
                    req.session.username = username
                    res.redirect('/posts')
                }
                else{
                    res.render('login',{message: 'Password do not match'})
                }
            })
        }
        else{
            res.render('login',{message: 'Username does not exist'})
        }
    })
})

app.post('/register',(req,res) => {

    const username = req.body.username 
    const password = req.body.password 
    db.any('SELECT username FROM users')
    .then((users)=>{
        const dupeUser = users.find(user => {
            return user.username == username
        })
        if(dupeUser) {
            res.render('register', {message: 'Username is already taken'})
        }
        else{
            bcrypt.genSalt(10, function(err, salt){ 
                bcrypt.hash(password, salt, function(err, hash){ 
                    db.none('INSERT INTO users(username, password) VALUES($1,$2)',[username, hash])
                    .then(() => {
                        res.redirect('/login')
                    
                    })
                })
            })
        }    
    })
})


function authenticate(req,res,next) {
    if(req.session) {
        if(req.session.username) {
            next()                                     
        } else {
            res.redirect('/login')
        }
    } else {
        res.redirect('/login')
    }
}

app.listen(3000, () => {
    console.log('Server is running...')
})