import Banner from "../../components/Banner/Banner";
import InfoSection from "../../components/InfoSection/InfoSection";
import { homeObjOne, homeObjTwo, homeObjThree } from './Data';

const Home = () => {
    return ( 
        <>
            <Banner />
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
            <InfoSection {...homeObjThree} />
        </>
     );
}
 
export default Home;