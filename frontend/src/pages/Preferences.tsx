import LoadingScreen from "@/components/LoadingScreen";
import { fetchPreferences } from "@/hooks/fetchPreferences";
import "@/styles/pages/Preferences.css"
import { navigateAndLog } from "@/utils/logNavigate";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModifyPreferences, ResetPreference, SaveSettings } from "@/../wailsjs/go/app/App";
import ResetPreferenceButton from "@/components/ResetPreferenceButton";

function Preferences() {
    const { preferences, loading, refresh } = fetchPreferences();

    const [roadmapsPath, setRoadmapsPath] = useState<string>();
    const [windowWidth, setWindowWidth] = useState<number>();
    const [windowHeight, setWindowHeight] = useState<number>();

    useEffect(() => {
        if (preferences) {
            setRoadmapsPath(preferences.roadmapsPath);
            setWindowWidth(preferences.windowWidth);
            setWindowHeight(preferences.windowHeight);
        }
    }, [preferences]);

    const navigate = useNavigate();

    if (loading) {
        return <LoadingScreen />;
    } else {
        if (preferences) {

            return (
                <div className="fixed inset-0 flex items-center justify-center z-0">
                    <div className="bg-(--palette_Silver) rounded-2xl shadow-lg p-6 w-4/5 text-center">
                        <h1 className="text-(--palette_GunMetal) text-2xl font-extrabold mb-3">Preferences</h1>
                        <p className="text-(--palette_GunMetal) mb-4 text-left">
                            <div className="font-bold mb-1 ml-3">
                                Roadmaps Path
                            </div>
                            <div className="flex items-center space-x-2 ml-1">
                                <input
                                    type="text"
                                    className="border border-(--palette_GunMetal) rounded-lg p-2 w-18/20 text-(--palette_White) bg-(--palette_PaynesGray)
                                    focus:outline-none focus:ring-2 focus:ring-(--palette_GunMetal)
                                    hover:ring-1 hover:ring-(--palette_PaynesGray) transition-all"
                                    value={roadmapsPath}
                                    onChange={(e) => setRoadmapsPath(e.target.value)}
                                />
                                <ResetPreferenceButton onClick={async () => {
                                    await ResetPreference("roadmapsPath");
                                    await SaveSettings();
                                    await refresh();
                                }} />
                            </div>

                            <div className="font-bold mb-1 ml-3">
                                Window Width (needs restart)
                            </div>
                            <div className="flex items-center space-x-2 ml-1">
                                <input
                                    type="text"
                                    className="border border-(--palette_GunMetal) rounded-lg p-2 w-20 text-(--palette_White) bg-(--palette_PaynesGray)
                                    focus:outline-none focus:ring-2 focus:ring-(--palette_GunMetal)
                                    hover:ring-1 hover:ring-(--palette_PaynesGray) transition-all"
                                    value={windowWidth}
                                    onChange={(e) => setWindowWidth(parseInt(e.target.value))}
                                />
                                <ResetPreferenceButton onClick={async () => {
                                    await ResetPreference("windowWidth");
                                    await SaveSettings();
                                    await refresh();
                                }} />
                            </div>

                            <div className="font-bold mb-1 ml-3">
                                Window Height (needs restart)
                            </div>
                            <div className="flex items-center space-x-2 ml-1">
                                <input
                                    type="text"
                                    className="border border-(--palette_GunMetal) rounded-lg p-2 w-20 text-(--palette_White) bg-(--palette_PaynesGray)
                                    focus:outline-none focus:ring-2 focus:ring-(--palette_GunMetal)
                                    hover:ring-1 hover:ring-(--palette_PaynesGray) transition-all"
                                    value={windowHeight}
                                    onChange={(e) => setWindowHeight(parseInt(e.target.value))}
                                />
                                <ResetPreferenceButton onClick={async () => {
                                    await ResetPreference("windowHeight");
                                    await SaveSettings();
                                    await refresh();
                                }} />
                            </div>
                        </p >
                        <button className="bg-(--palette_PaynesGray) text-(--palette_White) px-4 py-2 rounded-lg hover:bg-(--palette_GunMetal)"
                            onClick={async () => {
                                let didChange = false;

                                if (roadmapsPath != preferences.roadmapsPath) { await ModifyPreferences("roadmapsPath", roadmapsPath); didChange = true }
                                if (windowWidth != preferences.windowWidth) { await ModifyPreferences("windowWidth", windowWidth); didChange = true }
                                if (windowHeight != preferences.windowHeight) { await ModifyPreferences("windowHeight", windowHeight); didChange = true }
                                if (didChange) { await SaveSettings(); didChange = false }
                                await refresh();
                            }}>
                            SAVE
                        </button>
                    </div >
                </div >
            )
        } else {
            return (
                <div className="bg-(--palette_Silver) rounded-2xl shadow-lg p-6 w-120 text-center">
                    <h1 className="text-(--palette_GunMetal) text-2xl font-extrabold mb-3">Preferences</h1>
                    <p className="text-(--palette_GunMetal) mb-4 text-left">
                        <div className="font-bold mb-1">
                            Failed to get user's Preferences
                            <br />
                            Please retry
                        </div>
                    </p>
                    <button className="bg-(--palette_PaynesGray) text-(--palette_White) px-4 py-2 rounded-lg hover:bg-(--palette_GunMetal)"
                        onClick={async () => {
                            navigateAndLog(navigate, "/");
                        }}>
                        GO BACK
                    </button>
                </div>
            )
        }
    }
}

export default Preferences