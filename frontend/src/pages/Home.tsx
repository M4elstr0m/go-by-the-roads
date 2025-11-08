import logo from '@/assets/images/logo-universal.png';
import '@/styles/pages/Home.css';
import LoadingScreen from '@/components/LoadingScreen';
import { fetchAvailableRoadmaps } from '@/hooks/fetchAvailableRoadmaps';
import RoadmapCard from '@/components/RoadmapCard';
import { OpenRepoLink } from '@/../wailsjs/go/app/App';
import { useState } from 'react';
import RoadmapEditPanel from '@/components/RoadmapEditPanel';

function Home() {
    const { AvailableRoadmaps, loading, refresh } = fetchAvailableRoadmaps();
    const [editPanelVisible, setEditPanelVisible] = useState(false);
    const [editPanelSubject, setEditPanelSubject] = useState("");

    if (loading) {
        return <LoadingScreen />;
    } else {
        let editpanelpopup;

        if (editPanelVisible) {
            editpanelpopup = <RoadmapEditPanel setVisibility={setEditPanelVisible} roadmap={editPanelSubject} refreshCall={refresh} />
        }

        return (
            <div id="home">
                {editpanelpopup}

                <img className='hover:scale-105 transition-all' src={logo} id="logo" alt="logo" title='Link to repository' onClick={() => { OpenRepoLink() }} />

                <div className="grid justify-center overflow-y-auto overflow-x-hidden" style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 35vh))",
                    columnGap: "15px",
                    rowGap: "15px",
                    maxHeight: "65vh",
                }}>
                    <RoadmapCard roadmap="\x00" refreshCall={refresh} setEditPanelVisibility={setEditPanelVisible} setEditPanelRoadmap={setEditPanelSubject}></RoadmapCard>
                    {AvailableRoadmaps.map((roadmap) => (
                        <RoadmapCard roadmap={roadmap} refreshCall={refresh} setEditPanelVisibility={setEditPanelVisible} setEditPanelRoadmap={setEditPanelSubject}></RoadmapCard>
                    ))}
                </div>
            </div >
        )
    }
}

export default Home