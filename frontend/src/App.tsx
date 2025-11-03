import { useState, useEffect } from 'react';
import logo from './assets/images/logo-universal.png';
import './styles/App.css';
import { Greet, GetMapLoader } from "../wailsjs/go/app/App";
import SiteCard from './components/SiteCard';
import LoadingScreen from './components/LoadingScreen';
import { GetFirstSite } from "../wailsjs/go/app/App";
import type { roadmaps } from "../wailsjs/go/models";

function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState('');
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    const [mapLoader, setMapLoader] = useState<roadmaps.MapLoader | null>(null);
    const [site, setSite] = useState<roadmaps.Site | null>(null);
    useEffect(() => {
        async function loadData() {
            try {
                // 1️⃣ Get the map loader first
                const loader = await GetMapLoader();
                setMapLoader(loader);

                // 2️⃣ Then pass it to GetFirstSite
                const firstSite = await GetFirstSite(loader);
                setSite(firstSite);
            } catch (err) {
                console.error("Failed to load site data:", err);
            }
        }

        loadData();
    }, []);

    function greet() {
        Greet(name).then(updateResultText);
    }

    if (!mapLoader || !site) {
        return <LoadingScreen />;
    }

    return (
        <div id="App">
            <img src={logo} id="logo" alt="logo" />
            <div id="result" className="result">{resultText}</div>
            <div id="input" className="input-box">
                <input id="name" className="input" onChange={updateName} autoComplete="off" name="input" type="text" />
                <button className="btn shadow-md" onClick={greet}>Greet</button>
            </div>
            <SiteCard site={site}></SiteCard>
        </div>
    )
}

export default App
