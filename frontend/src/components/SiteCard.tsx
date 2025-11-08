import '@/styles/components/SiteCard.css';
import type { roadmaps } from "@/../wailsjs/go/models";
import { DeleteSite, SaveRoadmap, SwitchCompletedState, MoveUpSite, MoveDownSite } from '@/../wailsjs/go/app/App';
import { useEffect, useRef, useState } from 'react';
import TrashSVG from '@/components/svg/TrashSVG';
import MoveUpSVG from './svg/MoveUpSVG';
import MoveDownSVG from './svg/MoveDownSVG';

type SiteCardProps = {
    site: roadmaps.Site;
    completed: boolean;
    refreshCall: () => Promise<void>;
};

const SiteCard: React.FC<SiteCardProps> = ({ site, completed, refreshCall }) => {
    //const [completed, setCompleted] = useState(site.completed);

    let siteCardClass;
    let hoverContentClass;
    let siteDescClass;
    if (completed) {
        siteCardClass = "site-card-completed group"
        hoverContentClass = "hover-content-completed"
        siteDescClass = "site-desc-completed"
    } else {
        siteCardClass = "site-card group"
        hoverContentClass = "hover-content"
        siteDescClass = "site-desc"
    }

    const [menuVisible, setMenuVisible] = useState(false);
    const cardRef = useRef<HTMLDivElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setMenuVisible(true);
    };

    // The following useEffect was made using GPT, I did not get it
    // Scroll menu into view when it becomes visible
    useEffect(() => {
        if (menuVisible && menuRef.current) {
            const menu = menuRef.current;
            const container = menu.parentElement?.parentElement?.parentElement; // parent of the card grid
            if (container) {
                const menuRect = menu.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                if (menuRect.bottom > containerRect.bottom) {
                    container.scrollBy({
                        top: menuRect.bottom - containerRect.bottom + 10, // extra padding
                        behavior: "smooth",
                    });
                } else if (menuRect.top < containerRect.top) {
                    container.scrollBy({
                        top: menuRect.top - containerRect.top - 10, // extra padding
                        behavior: "smooth",
                    });
                }
            }
        }
    }, [menuVisible]);

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
            <article
                className={siteCardClass}
                onContextMenu={handleContextMenu}
                ref={cardRef}
                onClick={async () => {
                    await SwitchCompletedState(site);
                    await SaveRoadmap();
                    //setCompleted(!completed);
                    await refreshCall();
                }}
            >
                <header className="mb-2">
                    <h1 className="site-title">{site.title}</h1>
                </header>
                <p className={siteDescClass}>{site.desc}</p>

                {/* Hover reveal */}
                <div className={hoverContentClass}>
                    <div className="hover-inner">
                        {site.content}
                    </div>
                </div>
            </article>

            {menuVisible && (
                <span className="context-menu absolute left-1/2 -translate-x-1/2 py-2 z-11" ref={menuRef}>
                    <button id="moveup-button" onClick={async () => {
                        setMenuVisible(false);
                        await MoveUpSite(site);
                        await refreshCall();
                    }}>
                        <span className="flex items-center justify-center rounded-full bg-(--palette_GunMetal-200)/50">
                            <MoveUpSVG />
                        </span>
                    </button>

                    <button id="delete-button" onClick={async () => {
                        setMenuVisible(false);
                        await DeleteSite(site);
                        await refreshCall();
                    }}>
                        <span className="flex items-center justify-center rounded-full bg-(--palette_GunMetal-200)/50">
                            <TrashSVG />
                        </span>
                    </button>

                    <button id="movedown-button" onClick={async () => {
                        setMenuVisible(false);
                        await MoveDownSite(site);
                        await refreshCall();
                    }}>
                        <span className="flex items-center justify-center rounded-full bg-(--palette_GunMetal-200)/50">
                            <MoveDownSVG />
                        </span>
                    </button>
                </span>
            )}
        </span>

    );
};

export default SiteCard