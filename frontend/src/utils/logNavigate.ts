import { NavigateFunction } from "react-router-dom";
import { LogNavigation } from "../../wailsjs/go/app/App";

export const navigateAndLog = (navigate: NavigateFunction, path: string) => {
    navigate(path);
    LogNavigation(path);
};
