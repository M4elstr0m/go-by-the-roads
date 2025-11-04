import '@/styles/SiteCard.css';
import type { roadmaps } from "@/../wailsjs/go/models";

type SiteCardProps = {
    site: roadmaps.Site;
};

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
    return (
        <article className="site-card group">
            <header className="mb-2">
                <h1 className="site-title">{site.title}</h1>
            </header>
            <p className="site-desc">{site.desc}</p>

            {/* Hover reveal */}
            <div className="hover-content">
                <div className="hover-inner">
                    {site.content}
                </div>
            </div>
        </article>
    );
};

export default SiteCard