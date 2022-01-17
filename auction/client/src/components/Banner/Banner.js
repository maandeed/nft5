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
                      Beautiful Paintings by the needy
                    </BannerHeading>
                    <BannerPara>
                      Let's Play the game to support them!
                    </BannerPara>
                    <Link to='/auctions'>
                    <Button fontBig big>
                      Click HERE to choose Art Piece
                    </Button>
                  </Link>
                </BannerWrapper>
            </BannerContainer>
        </BannerSection>
        </>
     );
}
 
export default Banner;