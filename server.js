const express = require('express')
const routes = require('./routes/index.js')
const bodyParser = require('body-parser')
const app = express()

const cors = require('cors')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/exercise-track' )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('public'));
app.use(express.static('views'));

// json layout
app.set("json spaces", 2);

routes(app);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})