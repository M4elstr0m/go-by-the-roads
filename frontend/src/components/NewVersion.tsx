import { OpenLink } from "@/../wailsjs/go/app/App";
import { MouseEventHandler } from "react";
import "@/styles/components/NewVersion.css"

type NewVersionProps = {
    SubmitAction: MouseEventHandler<HTMLButtonElement> | undefined;
    CurrentTag: string;
    LatestReleaseTag: string;
    RepoLink: string;
    RepoOwner: string;
};

const NewVersion: React.FC<NewVersionProps> = ({ SubmitAction, CurrentTag, LatestReleaseTag, RepoLink, RepoOwner }) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
                <h2 className="text-xl font-semibold mb-3">New Version Available!</h2>
                <p className="text-gray-700 mb-4">
                    {CurrentTag} - {LatestReleaseTag}<br></br>
                    There are new features and improvements. Check them out!<br></br>
                    <a className="github-link" onClick={() => { OpenLink(RepoLink) }}>GitHub Repository</a><br></br>
                    By {RepoOwner}<br></br>
                </p>
                <button
                    onClick={SubmitAction}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default NewVersion

