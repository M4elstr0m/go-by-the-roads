import { useState } from 'react';
import '../styles/SiteCard.css';
import type { roadmaps } from "../../wailsjs/go/models";

type SiteCardProps = {
    object: roadmaps.Site; // the prop type
};

const SiteCard: React.FC<SiteCardProps> = ({ object }) => {
    return (
        <div className="p-4 rounded-2xl shadow-md bg-white">
            <h2 className="text-lg font-semibold">Site Card</h2>
            <p className="text-gray-600">Object: {object.title}</p>
        </div>
    );
};

export default SiteCard