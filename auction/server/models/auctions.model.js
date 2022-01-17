const mongoose = require('mongoose')
const Schema = mongoose.Schema

const auctionSchema = new Schema({
    seller: { type: String, trim: true },
    title: { type: String },
    description: { type: String },
    status: { type: Number, default: 0 },
    starttime: { type: Date },
    duration: { type: Number, default: 0 },
    image: { type: String },
    startbid: { type: Number, default: 0 },
    reservebid: { type: Number, default: 0 },
    currentbid: { type: Number, default: 0 },
    numberbid: { type: Number, default: 0 },
    winningbid: { type: Number, default: 0 },
    winner: { type: String, trim: true },
    bcid: { type: Number, default: 0 },
    transactionhash: { type: String }
}, {
    timestamps: true,
})

const Auction = mongoose.model('auctions', auctionSchema)
module.exports = Auction