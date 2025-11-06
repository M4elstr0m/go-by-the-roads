import logo from '@/assets/images/logo-universal.png';
import '@/styles/pages/Home.css';
import LoadingScreen from '@/components/LoadingScreen';
import { fetchAvailableRoadmaps } from '@/hooks/fetchAvailableRoadmaps';
import NavigationWidget from '@/components/NavigationWidget';
import RoadmapCard from '@/components/RoadmapCard';
import { OpenRepoLink } from '@/../wailsjs/go/app/App';

function Home() {
    const { AvailableRoadmaps, loading } = fetchAvailableRoadmaps();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div id="home">
                <img className='hover:scale-105 transition-all' src={logo} id="logo" alt="logo" title='Link to repository' onClick={() => { OpenRepoLink() }} />

                <div className="grid justify-center overflow-y-auto overflow-x-hidden" style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, max-content))",
                    columnGap: "15px", // horizontal gap
                    rowGap: "15px",    // vertical gap
                    maxHeight: "60vh",
                }}>
                    {AvailableRoadmaps.map((roadmap) => (
                        <RoadmapCard roadmap={roadmap}></RoadmapCard>
                    ))}
                </div>

                <br></br>
                <NavigationWidget route="/about" text="About"></NavigationWidget>
            </div >
        )
    }
}

export default Home