import { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router'
import  AuctionDetail  from '../components/AuctionDetail/AuctionDetail'
import { AccountContext } from '../context/AccountContext';
import { AuctionContext } from '../context/AuctionContext';
import { BidContext } from '../context/BidContext';
import axios from "axios";
import Web3 from 'web3'
import { ethers } from 'ethers';
import AuctionAbi from '../abis/AuctionApp.json'

const Auction = () => {
    
    const { account, balance, setBalance } = useContext(AccountContext);
    const { bids, setBids } = useContext(BidContext);
    const { auctions, setAuctions } = useContext(AuctionContext);
    const [auction, setAuction] = useState([])  // array stores all bids of the auction
    const [bidInput, setBidInput] = useState(0)
    const location = useLocation()

    // every render or change in location
    useEffect(() => {
      // setAuction from location data
      const selectedAuction = {
          id: location.state.id,
          _id: location.state._id,
          title: location.state.title,
          description: location.state.description,
          seller: location.state.seller,
          image: location.state.image,
          startbid: Number(location.state.startbid),
          reservebid: Number(location.state.startbid),
          duration: Number(location.state.duration),
          currentbid: Number(location.state.currentbid),
          numberbid: Number(location.state.numberbid),
          starttime: location.state.starttime,
          status: location.state.status,
          bcid: location.state.bcid, 
          transactionhash: location.state.transactionhash,
          account: location.state.account
        }
        // set auction State
        console.log(`selected auctions ${JSON.stringify(selectedAuction)}`)
        setAuction(selectedAuction)

    }, [location.state.id]);

    // Get balance of account    
    useEffect(() => {
        let provider = window.ethereum
        if (provider) {
            provider
            .request({ method: 'eth_getBalance', params: [account, "latest"] })
            .then((_balance) => {
                const web3 = new Web3(provider);
                const _bal = web3.utils.fromWei(_balance, 'ether')
//              console.log(`bal = ${_bal} acct ${account} `)
                setBalance(_bal)
            })
            .catch((err) => console.log(err))
        }
    }, []);

    // placebid to smart contract & update mongo
    const placeBid = async () => {

        if (bidInput <= auction.currentbid) {
            alert(`Submitted bid ${bidInput} must to higher than current bid of ${auction.currentbid}eth. Please increase your bid`)
        } else if (bidInput <= auction.startbid) {
            alert(`Submitted bid ${bidInput} must to higher than starting bid of ${auction.startbid}eth. Please increase your bid`)
        } else {
            const _bidInput = bidInput   // web3.utils.toWei(bidInput, 'ether')
            console.log(`submit ${_bidInput} ${bidInput} ${JSON.stringify(auction, null, 2)}`)
            const result = 0

            // Place a bid into smart contract
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                const signer = provider.getSigner()
                const contract = new ethers.Contract(
                    '0x48a84428d399F0aD5e6f95225ae1304dC466590a', 
                    AuctionAbi, 
                    signer)

                contract.once("BidRefunded", (...args) => {
                    console.log(`refund Event ${JSON.stringify(args)}`)
                })

                contract.once("BidPlaced", (...args) => {
                    console.log(`BidPlace Event ${JSON.stringify(args)}`)
                
                    // update new bid state & db
                    axios
                    .post(`/bids/add`, {
                        auctionid: auction._id,
                        bidamount: Number(bidInput),
                        id: args[1].toString(),
                        bidder: args[2].toString(),
                        bidtime: (args[4]*1000).toString(),
                        transactionhash: args[5].transactionHash
                    })
                    .then((res) => {
                        res.data.id = bids.length
                        const newBids = [...bids, res.data];
        //                console.log(`new bid ${JSON.stringify(newBids)}`);
                        setBids(newBids);
                    })
                    .catch((err) => {
                        console.log(`Error retrieving data ${err}`);
                    });

                    // update auction db
                    axios
                    .put(`/auctions/update/${auction._id}`, {
                        id: auction._id,
                        numberbid: auction.numberbid ? auction.numberbid + 1 : 1,
                        currentbid: Number(bidInput)
                    })
                    .then((res) => {
                        console.log(`Auction Updated ${JSON.stringify(res.data)}`);
        
                        // update auctions state
                        const newAuctions = [res.data, auctions.filter(_auction => _auction.id !== res.data._id)]
        //                  console.log(`newAuctions ${JSON.stringify(newAuctions)}`);
                        setAuctions(newAuctions)
                    })
                    .catch((err) => {
                        console.log(`Error retrieving data ${err}`);
                    });

                    provider.getBalance(account)
                    .then((balance) => {
                        setBalance(ethers.utils.formatEther(balance))
                    })
                    .catch((err) => {
                        console.log(`Error retrieving data ${err}`);
                    });               
                })
            
                console.log(`placebid ${_bidInput}  ${account} ${auction.bcid}`)
                const result = await contract.placeBid(
                    auction.bcid,
                    { from: account,
                      value: ethers.utils.parseEther(_bidInput) 
                    })
                await result.wait()
    
            }
        }
    }

    // set bidInput state from user input field
    const updateBidInput = (_bidInput) => {
        setBidInput(_bidInput)
    }
    
    return ( 
        <>
            <AuctionDetail
                account={account}
                balance={balance}
                id={auction.id}
                _id={auction._id}
                image={auction.image}
                title={auction.title}
                description={auction.description}
                seller={auction.seller}
                startbid={auction.startbid}
                currentbid={auction.currentbid}
                starttime={auction.starttime}
                duration={auction.duration}
                status={auction.status}
                winner={auction.winner}
                bidInput={bidInput}
                numberbid={auction.numberbid}
                updateBidInput={updateBidInput}
                placeBid={placeBid}
            />
        </>
     );
}
 
export default Auction;