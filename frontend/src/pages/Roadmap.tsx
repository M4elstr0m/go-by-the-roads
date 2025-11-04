import LoadingScreen from "@/components/LoadingScreen";
import SiteCard from "@/components/SiteCard";
import { fetchRoadmapAttributes } from "@/hooks/fetchRoadmapAttributes";
import { navigateAndLog } from "@/utils/logNavigate";
import { useNavigate } from "react-router-dom";

function Roadmap() {
    const navigate = useNavigate();
    const { RoadmapTitle, RoadmapSites, loading } = fetchRoadmapAttributes();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div>
                <h1>{RoadmapTitle}</h1>
                {
                    RoadmapSites.map((site) => (
                        <div>
                            <br></br>
                            <SiteCard site={site}></SiteCard>
                        </div>
                    ))
                }
                <button onClick={() => { navigateAndLog(navigate, "/") }}>HOME</button>
            </div>
        )
    }
}

export default Roadmap