const express = require("express");
const router = express.Router();
const Auction = require("../models/auctions.model");

const app = express();
app.use(express.json());

router.route("/").get((req, res) => {
    console.log(`get all auctions`)
     Auction.find()
       .then((auctions) => res.json(auctions))
       .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

  console.log(`add route ${JSON.stringify(req.body)}`)

    const newAuction = new Auction({
      seller: req.body.seller,
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      starttime: req.body.starttime,
      duration: req.body.duration,
      image: req.body.image,
      startbid: req.body.startbid,
      reservebid: req.body.reservebid,
      currentbid: req.body.currentbid,
      numberbid: req.body.numberbid,
      winningbid: req.body.winningbid,
      winner: req.body.winner,
      bcid: req.body.bcid,
      transactionhash: req.body.transactionhash,
    });
    newAuction.save()
      .then((auction) => {
        console.log("Auction added! " + auction)
        res.json(auction)
      })
      .catch((err) => res.status(400).json("Error: " + err));
      
  });

  router.route("/:id").get((req, res) => {
    Auction.findById(req.params.id)
      .then((auction) => res.json(auction))
      .catch((err) => res.status(400).json("FindById Error: " + err));
  });
  
  router.route("/update/:id").put((req, res) => {
    console.log(`update ${req.params.id} ${JSON.stringify(req.body)}`)
    Auction.findOneAndUpdate(
      { _id: req.params.id }, 
      req.body ,
      { new: true })
      .then((auction) => {
        console.log(`Auction updated! ${JSON.stringify(auction)}`)
        res.json(auction)
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
  
  
module.exports = router;
   