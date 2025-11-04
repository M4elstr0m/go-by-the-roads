import '@/styles/components/LoadingScreen.css';

const LoadingScreen: React.FC = () => {
    return (
        <div className="loadingscreen p-4 shadow-md">
            <h1 className="text-lg font-semibold">Loading...</h1>
        </div>
    );
};

export default LoadingScreen