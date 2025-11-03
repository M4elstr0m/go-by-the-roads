import { useState } from 'react';
import '../styles/SiteCard.css';
import type { roadmaps } from "../../wailsjs/go/models";

type SiteCardProps = {
    site: roadmaps.Site;
};

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
    return (
        <div className="ok p-4 rounded-2xl shadow-md bg-purple-400">
            <h2 className="text-lg font-semibold">{site.title}</h2>
            <p className="text-gray-600">{site.desc}</p>
        </div>
    );
};

export default SiteCard