const express = require('express')
const app = express() 
const mustacheExpresss = require('mustache-express')
const session = require('express-session')
const tripsRouter = require('./routes/trips')

global.trips = [] 
global.users = []
global.usertrips = {}

 

app.use(express.urlencoded()) 
app.use(express.static('views'))
app.use(session({
    secret: 'USEASECUREKEYHERE',
    resave: false,
    saveUninitialized: true
}))


app.engine('mustache', mustacheExpresss())
app.set('views','./views')
app.set('view engine', 'mustache')

app.use('/trips',authenticate,tripsRouter)


app.get('/login',(req,res) => {
    res.render('login')
})

app.get('/register', (req,res) => {
    res.render('register')
})


app.post('/login',(req, res) => {
    const username = req.body.username 
    const password = req.body.password 
  
   const persistedUser = users.find(user => {
        return user.username == username && user.password == password
    })
    if(persistedUser) {
        if(req.session) {
            req.session.username = username 
            if (usertrips[username]){
            trips = usertrips[username]
            }
            else{
                trips = []
            }
            res.redirect('/trips')
        }
    } else {
        res.render('login',{message: 'Username or password is incorrect'})
    }
})

app.post('/register', (req,res) => {
    const username = req.body.username
    const password = req.body.password 

    let user = {username: username, password: password}
    const dupeUser = users.find(user => {
        return user.username == username
    })
    if(dupeUser) {
        res.render('register', {message: 'Username is already taken'})
    } else {
        users.push(user)
        res.redirect('/login')
    }
})

app.post('/logout', (req,res) => {
    name = req.session.username
    usertrips[name] = trips
    req.session.username = false
    res.redirect('/login')
})

app.listen(3000, () => {
    console.log('Server is running...')
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
