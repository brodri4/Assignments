const express = require('express')
const app = express()
const cors = require('cors')
const models = require('./models')

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    models.Game.findAll().then((games) => {
        res.json(games)
    })
})

app.post('/game-create', (req,res) => {
    const title = req.body.title
    const description = req.body.description
    const year = req.body.year
    const imageUrl = req.body.imageUrl

    let newGame = models.Game.build({
        title: title,
        description: description,
        year: year,
        imageUrl: imageUrl
    })

    newGame.save().then(() => {
        res.json({success: true})
    })

})

app.listen(8080, () => {
    console.log('Server is running...')
})


