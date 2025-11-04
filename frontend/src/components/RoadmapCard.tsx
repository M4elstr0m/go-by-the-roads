import '@/styles/RoadmapCard.css';
import { useNavigate } from "react-router-dom";
import { SelectRoadmap } from "@/../wailsjs/go/app/App";
import { navigateAndLog } from "@/utils/logNavigate";

type RoadmapCardProps = {
    roadmap: string;
};

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap }) => {
    const navigate = useNavigate();

    return (
        <div className="roadmap-card p-4 rounded-full shadow-md bg-blue-400" onClick={() => {
            SelectRoadmap(roadmap);
            navigateAndLog(navigate, "/roadmap");
        }}>
            <h1 className="text-lg font-semibold">{roadmap}</h1>
        </div>
    );
};

export default RoadmapCard