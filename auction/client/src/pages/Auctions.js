import { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuctionContext } from '../context/AuctionContext';
import AuctionCard from '../components/AuctionCard/AuctionCard';
import { ethers } from 'ethers';
import AuctionAbi from '../abis/AuctionApp.json'

const Auctions = () => {

  const { auctions, setAuctions } = useContext(AuctionContext)
//  console.log(`getAuctions ${JSON.stringify(auctions)}`);

  useEffect(() => {
  // read auctions from Mongdb
  setAuctions([])
  axios
    .get("/auctions")
    .then((res) => {
      res.data.forEach((data) => {
        setAuctions(_auctions => [..._auctions, data])
      });
    })
    .catch((err) => {
      console.log(`Error retrieving data ${err}`);
    });

    /* 1st test to connect to Smart Contract
    if (window.ethereum) {
      const getContract = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(
          '0x48a84428d399F0aD5e6f95225ae1304dC466590a', 
          AuctionAbi, 
          provider)
        const name = await contract.contractName()
        console.log (`Ether Contract ${name}`)
      }
      getContract()
    }
*/
  }, [])

  const startAuction = async (id) => {
    const auction = auctions[id]
    // register auction in smart contract
   if (!auction.transactionhash) {   // if auction has not been registered in smart contract
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      '0x48a84428d399F0aD5e6f95225ae1304dC466590a', 
      AuctionAbi, 
      signer)

    contract.once("AuctionCreated", (...args) => {
      console.log(`Event ${JSON.stringify(args)}`)

      // update MongoDB
      axios
      .put(`/auctions/update/${auction._id}`, {
          bcid: args[0].toString(),
          transactionhash: args[9].transactionHash,
          starttime: args[5].toString(),
          status: 1
      })
      .then((res) => {
        // update auctions state
        const newAuctions = auctions.map(auction => {
          if (auction._id === res.data._id)
            return res.data;
          return auction;
        })
        setAuctions(newAuctions)        
      })
      .catch((err) => {
        console.log(`Error retrieving data ${err}`);
      })

    })

    const result = await contract.createAuction(
      auction._id,
      auction.title,
      auction.image,
      Date.now().toString(),
      auction.duration,
      auction.startbid.toString(),
      auction.reservebid.toString())
    await result.wait()
   }
  }

  return ( 
        <>
        {auctions.map( (_auction,index) => (
          <div className="auction" key={index}>
            <AuctionCard
              id={index}
              _id={_auction._id}
               image={_auction.image}
               title={_auction.title}
               description={_auction.description}
               seller={_auction.seller}
               startbid={_auction.startbid}
               currentbid={_auction.currentbid}
               starttime={_auction.starttime}
               duration={_auction.duration}
               status={_auction.status}
               numberbid={_auction.numberbid}
               transactionhash={_auction.transactionhash}
               bcid={_auction.bcid}
               startAuction={startAuction} />
          </div>
        ))}
        </>
     );
}
 
export default Auctions;