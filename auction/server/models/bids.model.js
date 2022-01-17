const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bidSchema = new Schema({
    auctionid: { type: String, required: true, default: 0 },
    bidder: { type: String, trim: true },
    bidamount: { type: Number, default: 0 },
    id: { type: Number, default: 0 },
    transactionhash: { type: String },
    bidtime: { type: Date },
    refunded: { type: Boolean },
    refundtxhash: { type: String },
    refundtime: { type: Date }
}, {
    timestamps: true,
})

const Bid = mongoose.model('bids', bidSchema)
module.exports = Bid