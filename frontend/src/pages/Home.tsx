import logo from '@/assets/images/logo-universal.png';
import '@/styles/Home.css';
import LoadingScreen from '@/components/LoadingScreen';
import { fetchAvailableRoadmaps } from '@/hooks/fetchAvailableRoadmaps';
import { useNavigate } from 'react-router-dom';
import { navigateAndLog } from "@/utils/logNavigate";
import RoadmapCard from '@/components/RoadmapCard';

function Home() {
    const navigate = useNavigate();
    const { AvailableRoadmaps, loading } = fetchAvailableRoadmaps();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div id="app">
                <img src={logo} id="logo" alt="logo" />

                <div className=''>
                    {AvailableRoadmaps.map((roadmap) => (
                        <RoadmapCard roadmap={roadmap}></RoadmapCard>
                    ))}
                </div>

                <br></br>
                <button onClick={() => { navigateAndLog(navigate, "/about") }}>About
                </button>
            </div >
        )
    }
}

export default Home