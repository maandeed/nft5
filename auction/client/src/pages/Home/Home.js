import Banner from "../../components/Banner/Banner";
import InfoSection from "../../components/InfoSection/InfoSection";
import { homeObjOne, homeObjTwo } from './Data';

const Home = () => {
    return ( 
        <>
            <Banner />
            <InfoSection {...homeObjOne} />
            <InfoSection {...homeObjTwo} />
        </>
     );
}
 
export default Home;