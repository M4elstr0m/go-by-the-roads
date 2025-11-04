import { useNavigate } from "react-router-dom";
import { navigateAndLog } from "@/utils/logNavigate";
import "@/styles/NavigationWidget.css"

type NavigationWidgetProps = {
    route: string;
    text: string;
};

const NavigationWidget: React.FC<NavigationWidgetProps> = ({ route, text }) => {
    const navigate = useNavigate();

    return (
        <div className="navigation-widget">
            <button onClick={() => { navigateAndLog(navigate, route) }}>{text}</button>
        </div>
    );
};

export default NavigationWidget