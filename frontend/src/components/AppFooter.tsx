import NavigationWidget from '@/components/NavigationWidget';
import { OpenRepoLink } from '@/../wailsjs/go/app/App';
import { fetchVersion } from '@/hooks/fetchVersion';
import GithubSVG from '@/components/svg/GithubSVG';
import PreferencesSVG from './svg/PreferencesSVG';
import { navigateAndLog } from '@/utils/logNavigate';
import { useNavigate } from 'react-router-dom';

const AppFooter: React.FC = () => {
    const { IsLatestVersion, CurrentTag, LatestReleaseTag, RepoLink, RepoOwner } = fetchVersion();
    const navigate = useNavigate();

    let content;
    let content_class;
    if (IsLatestVersion) {
        content = "Up to Date"
        content_class = "py-2 font-extrabold text-green-400"
    } else {
        content = "Outdated"
        content_class = "py-2 font-extrabold text-red-400"
    }

    return (
        <footer className="fixed bottom-0 left-0 w-full
        bg-(--palette_GunMetal-100) text-gray-100 flex justify-between
        items-center px-6 py-2 shadow-lg border-t border-(--palette_GunMetal-100)">
            {/* LEFT */}
            <div className='flex flex-row gap-3'>
                <NavigationWidget route="/" text="Home"></NavigationWidget>
                <NavigationWidget route="/about" text="About"></NavigationWidget>
            </div>
            {/* RIGHT */}
            <div className='flex flex-row gap-3'>
                <h1 className={content_class}>{content}</h1>

                <button onClick={() => { OpenRepoLink() }} style={{
                    "--icon-color": "var(--palette_White)",
                } as React.CSSProperties}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.setProperty("--icon-color", "var(--palette_Silver)"))
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.setProperty("--icon-color", "var(--palette_White)"))
                    }>
                    <GithubSVG />
                </button>

                <button className="hover:rotate-180 transition-all duration-500" onClick={() => { navigateAndLog(navigate, "/preferences") }} style={{
                    "--icon-color": "var(--palette_White)",
                } as React.CSSProperties}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.setProperty("--icon-color", "var(--palette_Silver)"))
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.setProperty("--icon-color", "var(--palette_White)"))
                    }>
                    <PreferencesSVG />
                </button>
            </div>
        </footer>
    );
};

export default AppFooter