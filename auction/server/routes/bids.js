const express = require("express");
const router = express.Router();
const Bid = require("../models/bids.model");

const app = express();
app.use(express.json());

router.route("/").get((req, res) => {
  Bid.find()
    .then((bids) => res.json(bids))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  const newBid = new Bid({
    id: req.body.id,
    auctionid: req.body.auctionid,
    bidder: req.body.bidder,
    bidamount: req.body.bidamount,
    transactionhash: req.body.transactionhash,
    bidtime: req.body.bidtime,
    refunded: req.body.refunded,
    refundtxhash: req.body.refundtxhash,
    refundtime: req.body.refundtime
  });
  newBid.save()
    .then((bid) => {
      console.log(`Bid added! ${JSON.stringify(bid)}`)
      res.json(bid)
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/findByAuction").get((req, res) => {
  Bid.find( req.query )
    .then((bids) => {
      console.log (`findbid result ${JSON.stringify(bids)} ${JSON.stringify(req.body)}`)
      res.json(bids)
    })
    .catch((err) => res.status(400).json("findByAuction Error: " + err));
});

router.route("/:id").get((req, res) => {
  Bid.findById(req.params.id)
    .then((bid) => res.json(bid))
    .catch((err) => res.status(400).json("FindById Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  console.log(`bid update  ${JSON.stringify(req.body)} ${req.params.id}`);
  Bid.findOneAndUpdate(
    { _id: req.body.id }, 
    req.body ,
    { new: true })
    .then((bid) => {
      console.log(`Bid updated! ${JSON.stringify(bid)}`)
      res.json(bid)
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
