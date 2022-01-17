import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyle from './globalStyles'
import Home from './pages/Home/Home'
import AddAuction from './pages/AddAuction'
import Auctions from './pages/Auctions'
import Auction from './pages/Auction'
import Navbar from './components/Navbar/Navbar'
import AccountContextProvider from './context/AccountContext'
import AuctionContextProvider from './context/AuctionContext'
import BidContextProvider from './context/BidContext'

function App() {
  return (
      <Router>
        <GlobalStyle />
        <AccountContextProvider>
          <AuctionContextProvider>
            <BidContextProvider>
              <Navbar />
              <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/addauction' element={<AddAuction />} />
                <Route path='/auctions' element={<Auctions />} />
                <Route path='/auctions/:id' element={<Auction />} />
              </Routes>
            </BidContextProvider>
          </AuctionContextProvider>
        </AccountContextProvider>          
      </Router>
  );
}

export default App;
