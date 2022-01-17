import { createContext, useState } from 'react'

export const BidContext = createContext()

const BidContextProvider = (props) => {
    const [bids, setBids] = useState([])
    return ( 
        <BidContext.Provider value={{ bids, setBids }}>
            {props.children}
        </BidContext.Provider>
     );
}
 
export default BidContextProvider;