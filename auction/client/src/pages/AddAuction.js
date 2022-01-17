import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import AddAuctionForm from '../components/AddAuctionForm/AddAuctionForm'
import { AccountContext } from '../context/AccountContext';
import axios from 'axios';

const AddAuction = () => {
    const { account } = useContext(AccountContext);
    const navigate = useNavigate()

    const addAuctionDB = async (data) => {
        console.log(`data = ${JSON.stringify(data)} ${account}`)

        // write to Mongodb
        axios.post(
           `/auctions/add`, 
           {
                seller: account,
                title: data.title,
                description: data.description,
                status: 0,
                starttime: 0,
                duration: Number(data.duration),
                image: 'images/' + data.image.substr(data.image.lastIndexOf("\\")+1),
                startbid: Number(data.startbid),
                reservebid: Number(data.startbid),
                currentbid: 0,
                numberbid: 0,
                winningbid: 0,
                winner: '',
                bcid: 0,
                transactionhash: '',
           } 
        )
        navigate ('/auctions', { replace: true })

    }

    return ( 
        <>
        <AddAuctionForm 
            seller={account}
            addAuction={addAuctionDB}                
        />
        </>
     );
}
 
export default AddAuction;