import { createContext, useState } from 'react'

export const AuctionContext = createContext()

const AuctionContextProvider = (props) => {
    const [auctions, setAuctions] = useState([])
    return ( 
        <AuctionContext.Provider value={{ auctions, setAuctions }}>
            {props.children}
        </AuctionContext.Provider>
     );
}
 
export default AuctionContextProvider;