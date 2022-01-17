const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config() // store all pwd & keys in .env

const app = express()
const port = process.env.PORT || 5000
const mongoDBUri = process.env.ATLAS_URI


// connect to Mongo DB
mongoose.connect(mongoDBUri, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connected successfully")
})

// Start backend server listening
app.listen(port,() => {
    console.log(`Server is running on port: ${port}`)
})
