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
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-(--palette_Silver) rounded-2xl shadow-lg p-6 w-120 text-center">
                <h1 className="text-(--palette_GunMetal) text-3xl font-extrabold mb-3">New Version Available!</h1>
                <p className="text-(--palette_GunMetal) mb-4">
                    <span className="font-bold">
                        {CurrentTag} - {LatestReleaseTag}
                    </span>
                    <br></br>
                    There are new features and improvements.
                    <br></br>
                    Check them out!
                    <br></br>
                    <a className="github-link font-bold text-lg" style={{ margin: "10px" }} onClick={() => { OpenLink(RepoLink) }}>GitHub Repository</a>
                    <br></br>
                    by {RepoOwner}
                    <br></br>
                </p>
                <button onClick={SubmitAction} className="bg-(--palette_PaynesGray) text-(--palette_White) px-4 py-2 rounded-lg hover:bg-(--palette_GunMetal)">
                    MAYBE LATER
                </button>
            </div>
        </div>
    );
};

export default NewVersion

