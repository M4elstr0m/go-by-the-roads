import '@/styles/components/SiteCard.css';
import type { roadmaps } from "@/../wailsjs/go/models";
import { SaveRoadmap, SwitchCompletedState } from '@/../wailsjs/go/app/App';
import { useState } from 'react';

type SiteCardProps = {
    site: roadmaps.Site;
    refreshCall: () => Promise<void>;
};

const SiteCard: React.FC<SiteCardProps> = ({ site, refreshCall }) => {
    const [completed, setCompleted] = useState(site.completed);

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

    return (
        <article className={siteCardClass} onClick={() => {
            SwitchCompletedState(site)
            SaveRoadmap()
            setCompleted(!completed)
        }}>
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
    );
};

export default SiteCard