import '@/styles/components/RoadmapCard.css';
import { useNavigate } from "react-router-dom";
import { DeleteRoadmap, NewRoadmap, SelectRoadmap } from "@/../wailsjs/go/app/App";
import { navigateAndLog } from "@/utils/logNavigate";
import { useEffect, useRef, useState } from 'react';
import TrashSVG from '@/components/svg/TrashSVG';

type RoadmapCardProps = {
    roadmap: string;
    refreshCall: () => Promise<void>;
};

const RoadmapCard: React.FC<RoadmapCardProps> = ({ roadmap, refreshCall }) => {
    if (roadmap == "\\x00") {
        return (
            <div className="roadmap-card" onClick={async () => {
                await NewRoadmap();
                await refreshCall();
            }}>
                <h1>+</h1>
            </div>
        )
    } else {
        const navigate = useNavigate();

        const [menuVisible, setMenuVisible] = useState(false);
        const menuRef = useRef<HTMLDivElement | null>(null);

        const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            setMenuVisible(true);
        };

        useEffect(() => {
            const handleClick = (event: MouseEvent) => {

                // If click is inside the menu, do nothing
                if (menuRef.current && menuRef.current.contains(event.target as Node)) return;

                setMenuVisible(false);
            };

            window.addEventListener("mousedown", handleClick);

            return () => {
                window.removeEventListener("mousedown", handleClick);
            };
        }, []);

        return (
            <span className="relative inline-block">
                <div
                    className="roadmap-card"
                    onContextMenu={handleContextMenu}
                    onClick={() => {
                        SelectRoadmap(roadmap);
                        navigateAndLog(navigate, "/roadmap");
                    }}
                >
                    <h1>{roadmap}</h1>
                </div>

                {menuVisible && (
                    <span className="context-menu absolute left-1/2 -translate-x-1/2 py-2 z-1" ref={menuRef}>
                        <button onClick={async () => {
                            setMenuVisible(false);
                            await DeleteRoadmap(roadmap);
                            await refreshCall();
                        }}>
                            <span className="flex items-center justify-center rounded-full bg-(--palette_GunMetal-200)/50">
                                <TrashSVG />
                            </span>
                        </button>
                    </span>
                )}
            </span>

        );
    }
};

export default RoadmapCard