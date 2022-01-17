import { FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Button } from '../../globalStyles';
import { AccountContext } from '../../context/AccountContext';
import { useState, useEffect, useContext } from 'react';
import {
  Nav,
  NavbarContainer,
  NavLogo,
  NavIcon,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink,
  NavText,
} from './Navbar.style';

const Navbar = () => {
    const { account, setAccount } = useContext(AccountContext);
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
  
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
  
    const showButton = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
    
  useEffect(() => {
      showButton();
    }, []);

    useEffect (() => {
      let provider = window.ethereum
      let selectedAccount;
      if (provider) {
        provider
        .request({ method: 'eth_requestAccounts' })
        .then((accounts) => {
          selectedAccount = accounts[0]
          setAccount(accounts[0])
//            console.log(`sel accounts ${selectedAccount}`)
        })
        .catch((err) => console.log(err))
  
        window.ethereum.on('accountsChanged', function (accounts) {
          selectedAccount = accounts[0]
          setAccount(accounts[0])
//            console.log(`acct change to ${selectedAccount}`)
        })
       }
       
  }, [])


    return ( 
        <>
        <IconContext.Provider value={{ color: '#4b4d63' }}>
          <Nav>
            <NavbarContainer>
              <NavLogo to='/' onClick={closeMobileMenu}>
                <NavIcon />
                WINme
              </NavLogo>
              <NavText>
              {account ? account
                : `You are not connected to wallet`}
              </NavText>
              <MobileIcon onClick={handleClick}>
                {click ? <FaTimes /> : <FaBars />}
              </MobileIcon>
              <NavMenu onClick={handleClick} click={click}>
                <NavItem>
                  <NavLinks to='/' onClick={closeMobileMenu}>
                    Home
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks to='/addauction' onClick={closeMobileMenu}>
                    Add PAINTING
                  </NavLinks>
                </NavItem>
                <NavItemBtn>
                  {button ? (
                    <NavBtnLink to='/auctions'>
                      <Button primary>SELECT PAINTING</Button>
                    </NavBtnLink>
                  ) : (
                    <NavBtnLink to='/auctions'>
                      <Button onClick={closeMobileMenu} fontBig primary>
                        SELECT PAINTING
                      </Button>
                    </NavBtnLink>
                  )}
                </NavItemBtn>
              </NavMenu>
            </NavbarContainer>
          </Nav>
        </IconContext.Provider>
        </>
     );
}
 
export default Navbar;