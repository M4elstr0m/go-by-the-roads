import { useState } from "react";
import { RenameRoadmap } from "@/../wailsjs/go/app/App";

type RoadmapEditPanelProps = {
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    roadmap: string;
    refreshCall: () => Promise<void>;
};

const RoadmapEditPanel: React.FC<RoadmapEditPanelProps> = ({ setVisibility, roadmap, refreshCall }) => {
    const [name, setName] = useState(roadmap);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-49">
            <div className="bg-(--palette_Silver) rounded-2xl shadow-lg p-6 w-120 text-center">
                <h1 className="text-(--palette_GunMetal) text-2xl font-extrabold mb-3">Edit Panel</h1>
                <p className="text-(--palette_GunMetal) mb-4 text-left">
                    <div className="font-bold mb-1 ml-3">
                        Name
                    </div>
                    <input
                        type="text"
                        className="border border-(--palette_GunMetal) rounded-lg p-2 w-full text-(--palette_White) bg-(--palette_PaynesGray)
                        focus:outline-none focus:ring-2 focus:ring-(--palette_GunMetal)
                        hover:ring-1 hover:ring-(--palette_PaynesGray) transition-all"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </p>
                <button className="bg-(--palette_PaynesGray) text-(--palette_White) px-4 py-2 rounded-lg hover:bg-(--palette_GunMetal)"
                    onClick={async () => {
                        setVisibility(false);
                        await RenameRoadmap(roadmap, name);
                        await refreshCall();
                    }}>
                    SAVE
                </button>
            </div>
        </div>
    );
};

export default RoadmapEditPanel