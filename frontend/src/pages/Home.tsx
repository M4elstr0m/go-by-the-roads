import logo from '@/assets/images/logo-universal.png';
import '@/styles/App.css';
import { SelectRoadmap } from "../../wailsjs/go/app/App";
import LoadingScreen from '@/components/LoadingScreen';
import { fetchAvailableRoadmaps } from '@/hooks/fetchAvailableRoadmaps';
import { useNavigate } from 'react-router-dom';
import { navigateAndLog } from "@/utils/logNavigate";

function Home() {
    const navigate = useNavigate();
    const { AvailableRoadmaps, loading } = fetchAvailableRoadmaps();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div id="App">
                <img src={logo} id="logo" alt="logo" />

                {AvailableRoadmaps.map((roadmap) => (
                    <button onClick={() => {
                        SelectRoadmap(roadmap);
                        navigateAndLog(navigate, "/roadmap");
                    }}>
                        {roadmap}
                    </button>
                ))}

                <br></br>
                <button onClick={() => { navigateAndLog(navigate, "/about") }}>About
                </button>
            </div >
        )
    }
}

export default Home