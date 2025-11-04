import '@/styles/SiteCard.css';
import type { roadmaps } from "@/../wailsjs/go/models";

type SiteCardProps = {
    site: roadmaps.Site;
};

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
    return (
        <div className="site-card group relative p-4 rounded-2xl shadow-md bg-purple-400 transition-all duration-300 hover:shadow-lg hover:bg-purple-500">
            <h2 className="text-lg font-semibold">{site.title}</h2>
            <p className="text-gray-600">{site.desc}</p>

            {/* Hidden content that shows on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-purple-800 bg-opacity-90 text-white text-sm p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {site.content}
            </div>
        </div>
    );
};

export default SiteCard