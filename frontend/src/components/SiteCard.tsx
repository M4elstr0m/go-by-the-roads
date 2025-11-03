import { useState } from 'react';
import '../styles/SiteCard.css';
import type { roadmaps } from "../../wailsjs/go/models";

type SiteCardProps = {
    site: roadmaps.Site;
};

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
    return (
        <div className="p-4 rounded-2xl shadow-md bg-white">
            <h2 className="text-lg font-semibold">Site Card</h2>
            <p className="text-gray-600">Title: {site.title}</p>
        </div>
    );
};

export default SiteCard