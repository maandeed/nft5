const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const auctionsUrl = require('./routes/auctions')
const bidsUrl = require('./routes/bids')

dotenv.config()  // store all pwd & keys in .env

// get keys & pwd from .env
const app = express()
const port = process.env.PORT || 8000
const mongoDBUri = process.env.ATLAS_URI

// connect to Mongo DB
mongoose.connect(mongoDBUri, { useNewUrlParser: true }) 
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connected successfully")
})

// Middleware
app.use(express.json())         // receive data from frontend in JSON format
app.use(express.urlencoded({ extended: false }))
app.use('/auctions', auctionsUrl)  // auctions collection API
app.use('/bids', bidsUrl)  // bids collections API

// Start backend server listening
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
