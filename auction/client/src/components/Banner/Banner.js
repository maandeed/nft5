import { Link } from 'react-router-dom';
import Background from '../../images/banner.jpg';
import { Button } from '../../globalStyles';

import {
    BannerSection,
    BannerContainer,
    BannerWrapper,
    BannerHeading,
    BannerPara
  } from './Banner.style';
  
  const bgStyle = {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };
  
  const Banner = () => {
    return ( 
        <>
        <BannerSection>
            <BannerContainer style={bgStyle}>
                <BannerWrapper>
                    <BannerHeading>
                      COLLECTABLE ITEMS AWAITING
                    </BannerHeading>
                    <BannerPara>
                      What are you waiting for?
                    </BannerPara>
                    <Link to='/auctions'>
                    <Button fontBig big>
                      Explore Auction HERE
                    </Button>
                  </Link>
                </BannerWrapper>
            </BannerContainer>
        </BannerSection>
        </>
     );
}
 
export default Banner;