import LoadingScreen from "@/components/LoadingScreen";
import { fetchRoadmapTitle } from "@/hooks/fetchRoadmapTitle";
import { navigateAndLog } from "@/utils/logNavigate";
import { useNavigate } from "react-router-dom";

function Roadmap() {
    const navigate = useNavigate();
    const { RoadmapTitle, loading } = fetchRoadmapTitle();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div>
                <h1>{RoadmapTitle}</h1>
                <button onClick={() => { navigateAndLog(navigate, "/") }}>HOME</button>
            </div>
        )
    }
}

export default Roadmap