import logo from '@/assets/images/logo-universal.png';
import '@/styles/pages/Home.css';
import LoadingScreen from '@/components/LoadingScreen';
import { fetchAvailableRoadmaps } from '@/hooks/fetchAvailableRoadmaps';
import RoadmapCard from '@/components/RoadmapCard';
import { OpenRepoLink } from '@/../wailsjs/go/app/App';

function Home() {
    const { AvailableRoadmaps, loading, refresh } = fetchAvailableRoadmaps();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div id="home">
                <img className='hover:scale-105 transition-all' src={logo} id="logo" alt="logo" title='Link to repository' onClick={() => { OpenRepoLink() }} />

                <div className="grid justify-center overflow-y-auto overflow-x-hidden" style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 35vh))",
                    columnGap: "15px",
                    rowGap: "15px",
                    maxHeight: "65vh",
                }}>
                    <RoadmapCard roadmap="\x00" refreshCall={refresh}></RoadmapCard>
                    {AvailableRoadmaps.map((roadmap) => (
                        <RoadmapCard roadmap={roadmap} refreshCall={refresh}></RoadmapCard>
                    ))}
                </div>
            </div >
        )
    }
}

export default Home