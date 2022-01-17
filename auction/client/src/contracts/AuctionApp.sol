//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.5.3;
pragma experimental ABIEncoderV2;

contract AuctionApp {
    // TEST @ 0x1D11FDB484661e86d2eC4C257110073c5252CE61
    // LIVE 0x24b52fffd3A7217053C042fB4B2F26B290Fed2DD

    // data structure in BC
    struct Bid {
        uint256 id;
        uint256 bidAmount;
        address payable bidder;
        uint256 timestamp;
        bool refunded;
        string refundTxHash;
        string transactionHash;
    }

    struct Auction {
        string id; // id of auction record in db
        string title; // auction title
        address payable seller;
        string imgFile; // item image file
        // Bid[] bids;
        mapping (uint256 => Bid) bids;
        uint256 timestamp;
        uint256 duration;
        uint256 startPrice; // In SMT
        uint256 reservePrice;
        uint256 currentBid;
        uint256 numBid;
        int8 status;
    }
    Auction[] public auctions; // auction array - all auctions
    string public contractName;
    address admin;

    event AuctionCreated(
        uint256 bcid,
        string id,
        string title,
        address seller,
        string imgFile,
        uint256 timstamp,
        uint256 duration,
        uint256 startPrice,
        uint256 reservePrice
    );
    event BidPlaced(
        uint256 auctionId,
        uint256 bidId,
        address payable bidder,
        uint256 bidAmount,
        uint256 numBids,
        uint256 timstamp
    );
    event BidRefunded(
        uint256 auctionId,
        uint256 bidId,
        address payable bidder,
        uint256 refundAmount,
        uint256 timstamp
    );
    event PaySeller(
        uint256 auctionId,
        address payable seller,
        int8 status,
        address winner,
        uint256 releaseAmount
    );

    constructor() public {
        contractName = "My Auction App";
        admin = msg.sender;
    }

    // Create an auction
    function createAuction(
        string memory _id,
        string memory _title,
        string memory _imgFile,
        uint256 _timestamp,
        uint256 _duration,
        uint256 _startPrice,
        uint256 _reservePrice
    ) public returns (uint256) {
        uint256 _bcAuctionId = auctions.length;
        auctions.push(Auction({
            id : _id, // id in DB
            title : _title,
            seller : msg.sender,
            imgFile : _imgFile,
            timestamp : _timestamp,
            duration : _duration,
            startPrice : _startPrice,
            reservePrice : _reservePrice,
            currentBid : _startPrice,
            numBid : 0,
            status : 1
        }));

        emit AuctionCreated(
            _bcAuctionId,
            _id,
            _title,
            msg.sender,
            _imgFile,
            _timestamp,
            _duration,
            _startPrice,
            _reservePrice
        );
        return _bcAuctionId;
    }

    modifier notSeller(uint256 _id) {
        require(msg.sender != auctions[_id].seller, "Seller is not allow to bid");
        _;
    }

    // Place a bid with modifier
    function placeBid(uint256 _bcAuctionId)
        public
        payable
        notSeller(_bcAuctionId)
        returns (bool)
    {
        uint256 _bidId = auctions[_bcAuctionId].numBid;
        auctions[_bcAuctionId].bids[_bidId] = Bid({
            id : _bidId,
            bidder : msg.sender,
            bidAmount : msg.value,
            timestamp : block.timestamp,
            refunded : false,
            refundTxHash : "",
            transactionHash : ""
        });
        auctions[_bcAuctionId].currentBid = msg.value;
        auctions[_bcAuctionId].numBid++;

        emit BidPlaced(
            _bcAuctionId, 
            _bidId, 
            msg.sender, 
            msg.value, 
            block.timestamp);

        // Call RefundBid function to refund the previous bidder
        if (_bidId > 0) refundBid(_bcAuctionId, _bidId);
        return true;
    }

    // Refund bid to the previous bidder
    function refundBid(
        uint256 _bcAuctionId,
        uint256 _bidId
    ) internal {
        // address.transfer(value)
        auctions[_bcAuctionId].bids[_bidId - 1].bidder.transfer(
            auctions[_bcAuctionId].bids[_bidId - 1].bidAmount
        );
        auctions[_bcAuctionId].bids[_bidId - 1].refunded = true;
        emit BidRefunded(
            _bcAuctionId,
            _bidId - 1,
            auctions[_bcAuctionId].bids[_bidId - 1].bidder,
            auctions[_bcAuctionId].bids[_bidId - 1].bidAmount,
            block.timestamp
        );
    }

    modifier isWinner(uint256 _id) {
        require(msg.sender == auctions[_id].bids[auctions[_id].numBid-1].bidder, "Only winner can release fund");
        _;
    }

    // Pay seller of the auction
    function paySeller(uint256 _bcAuctionId)
        public payable isWinner(_bcAuctionId) returns (bool) {
        uint256 _lastBid = auctions[_bcAuctionId].bids[auctions[_bcAuctionId].numBid-1].bidAmount;
        // address.transfer(value)
        auctions[_bcAuctionId].seller.transfer(_lastBid);
        auctions[_bcAuctionId].status = -1;
        emit PaySeller(
            _bcAuctionId,
            auctions[_bcAuctionId].seller,
            auctions[_bcAuctionId].status,
            auctions[_bcAuctionId].bids[auctions[_bcAuctionId].numBid-1].bidder,
            _lastBid
        );
        return true;
    }

    // GET all bids of an auction
    function getBids(uint256 _bcAuctionId) public view returns (Bid[] memory) {
        uint256 _len = auctions[_bcAuctionId].numBid;
        Bid[] memory _list = new Bid[](_len);
        for(uint256 i = 0; i < _len; i++){
            _list[i] = auctions[_bcAuctionId].bids[i];
        }
        return _list;
    }

    function contractBalance() external view returns(uint) {
        return address(this).balance;
    }

    // fallback to receive fund
    // fallback () {}
    function() external payable {
        // Receiving ether
    }
}
