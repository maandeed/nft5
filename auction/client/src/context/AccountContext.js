import { createContext, useState } from 'react'

export const AccountContext = createContext()

const AccountContextProvider = (props) => {
    const [account, setAccount] = useState()
    const [balance, setBalance] = useState()

    return ( 
        <AccountContext.Provider value={{ account, setAccount, balance, setBalance }}>
            {props.children}
        </AccountContext.Provider>
     );
}
 
export default AccountContextProvider;