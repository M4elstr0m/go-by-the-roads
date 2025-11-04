import { useNavigate } from "react-router-dom"
import { navigateAndLog } from "@/utils/logNavigate";

function About() {
    const navigate = useNavigate();
    return (
        <button onClick={() => { navigateAndLog(navigate, "/") }}>HOME</button>
    )
}

export default About