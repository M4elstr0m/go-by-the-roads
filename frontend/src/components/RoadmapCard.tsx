import '@/styles/components/RoadmapCard.css';
import { useNavigate } from "react-router-dom";
import { NewRoadmap, SelectRoadmap } from "@/../wailsjs/go/app/App";
import { navigateAndLog } from "@/utils/logNavigate";
import { fetchAvailableRoadmaps } from '@/hooks/fetchAvailableRoadmaps';

type RoadmapCardProps = {
    roadmap: string;
    refreshCall: () => Promise<void>;
};

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, refreshCall }) => {
    const navigate = useNavigate();

    if (roadmap == "\\x00") {
        return (
            <div className="roadmap-card" onClick={async () => {
                await NewRoadmap();  // create new roadmap
                await refreshCall();
            }}>
                <h1>+</h1>
            </div>
        )
    } else {
        return (
            <div className="roadmap-card" onClick={() => {
                SelectRoadmap(roadmap);
                navigateAndLog(navigate, "/roadmap");
            }}>
                <h1>{roadmap}</h1>
            </div>
        );
    }
};

export default RoadmapCard