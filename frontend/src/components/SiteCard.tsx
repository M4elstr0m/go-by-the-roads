import '@/styles/SiteCard.css';
import type { roadmaps } from "@/../wailsjs/go/models";

type SiteCardProps = {
    site: roadmaps.Site;
};

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
    return (
        <div className="site-card group">
            <h1>{site.title}</h1>
            <p>{site.desc}</p>

            {/* Hidden content that shows on hover */}
            <div className="hover-content bg-opacity-90">
                {site.content}
            </div>
        </div>
    );
};

export default SiteCard