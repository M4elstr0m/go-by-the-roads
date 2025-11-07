import '@/styles/components/RoadmapCard.css';
import { useNavigate } from "react-router-dom";
import { NewRoadmap, SelectRoadmap } from "@/../wailsjs/go/app/App";
import { navigateAndLog } from "@/utils/logNavigate";

type RoadmapCardProps = {
    roadmap: string;
    useStateHook: React.Dispatch<React.SetStateAction<string[]>>;
};

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, useStateHook }) => {
    const navigate = useNavigate();

    if (roadmap == "\\x00") {
        return (
            <div className="roadmap-card" onClick={async () => {
                const newRoadmap = await NewRoadmap();
                useStateHook(prev => [...prev, newRoadmap]);
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