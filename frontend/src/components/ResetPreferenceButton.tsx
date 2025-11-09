import ResetSVG from "./svg/ResetSVG";

type ResetPreferenceButtonProps = {
    onClick: () => Promise<void>;
};

const ResetPreferenceButton: React.FC<ResetPreferenceButtonProps> = ({ onClick }) => {
    return (
        <button style={{
            "--icon-color": "var(--palette_GunMetal)",
        } as React.CSSProperties}
            onMouseEnter={(e) =>
                (e.currentTarget.style.setProperty("--icon-color", "var(--palette_GunMetal)"))
            }
            onMouseLeave={(e) =>
                (e.currentTarget.style.setProperty("--icon-color", "var(--palette_GunMetal-200)"))
            }
            onClick={onClick}>
            <ResetSVG />
        </button>
    );
};

export default ResetPreferenceButton