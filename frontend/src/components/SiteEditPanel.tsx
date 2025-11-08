import { useState } from "react";
import { ModifySiteByID, SaveRoadmap } from "@/../wailsjs/go/app/App";
import type { roadmaps } from "@/../wailsjs/go/models";

type SiteEditPanelProps = {
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    site: roadmaps.Site | undefined;
    refreshCall: () => Promise<void>;
};

const SiteEditPanel: React.FC<SiteEditPanelProps> = ({ setVisibility, site, refreshCall }) => {
    let htmlContent;
    if (site) {
        const [title, setTitle] = useState(site.title);
        const [desc, setDesc] = useState(site.desc);
        const [content, setContent] = useState(site.content);

        htmlContent = <div className="bg-(--palette_Silver) rounded-2xl shadow-lg p-6 w-120 text-center">
            <h1 className="text-(--palette_GunMetal) text-2xl font-extrabold mb-3">Edit Panel</h1>
            <p className="text-(--palette_GunMetal) mb-4 text-left">
                <div className="font-bold mb-1 ml-3">
                    Title
                </div>
                <input
                    type="text"
                    className="border border-(--palette_GunMetal) rounded-lg p-2 w-full text-(--palette_White) bg-(--palette_PaynesGray)
                        focus:outline-none focus:ring-2 focus:ring-(--palette_GunMetal)
                        hover:ring-1 hover:ring-(--palette_PaynesGray) transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="font-bold mb-1 ml-3">
                    Description
                </div>
                <input
                    type="text"
                    className="border border-(--palette_GunMetal) rounded-lg p-2 w-full text-(--palette_White) bg-(--palette_PaynesGray)
                        focus:outline-none focus:ring-2 focus:ring-(--palette_GunMetal)
                        hover:ring-1 hover:ring-(--palette_PaynesGray) transition-all"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />

                <div className="font-bold mb-1 ml-3">
                    Content
                </div>
                <input
                    type="text"
                    className="border border-(--palette_GunMetal) rounded-lg p-2 w-full text-(--palette_White) bg-(--palette_PaynesGray)
                        focus:outline-none focus:ring-2 focus:ring-(--palette_GunMetal)
                        hover:ring-1 hover:ring-(--palette_PaynesGray) transition-all"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </p>
            <button className="bg-(--palette_PaynesGray) text-(--palette_White) px-4 py-2 rounded-lg hover:bg-(--palette_GunMetal)"
                onClick={async () => {
                    let didChange = false;

                    setVisibility(false);
                    if (title != site.title) { await ModifySiteByID(site.id, "title", title); didChange = true }
                    if (title != site.desc) { await ModifySiteByID(site.id, "desc", desc); didChange = true }
                    if (title != site.content) { await ModifySiteByID(site.id, "content", content); didChange = true }
                    if (didChange) { await SaveRoadmap(); didChange = false }
                    await refreshCall();
                }}>
                SAVE
            </button>
            <button className="bg-(--palette_PaynesGray) text-(--palette_White) px-4 py-2 ml-3 rounded-lg hover:bg-(--palette_GunMetal)"
                onClick={async () => {
                    setVisibility(false);
                }}>
                CANCEL
            </button>
        </div>
    } else {
        htmlContent = <div className="bg-(--palette_Silver) rounded-2xl shadow-lg p-6 w-120 text-center">
            <h1 className="text-(--palette_GunMetal) text-2xl font-extrabold mb-3">Edit Panel</h1>
            <p className="text-(--palette_GunMetal) mb-4 text-left">
                <div className="font-bold mb-1">
                    Failed to get selected Site
                    <br />
                    Please retry
                </div>
            </p>
            <button className="bg-(--palette_PaynesGray) text-(--palette_White) px-4 py-2 rounded-lg hover:bg-(--palette_GunMetal)"
                onClick={async () => {
                    setVisibility(false);
                }}>
                CLOSE
            </button>
        </div>
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-49">
            {htmlContent}
        </div>
    );
};

export default SiteEditPanel