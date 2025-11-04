import { useState, useEffect } from 'react';
import logo from './assets/images/logo-universal.png';
import './styles/App.css';
import { GetAvailableRoadmaps, SelectRoadmap } from "../wailsjs/go/app/App";
import type { roadmaps } from "../wailsjs/go/models";
import SiteCard from './components/SiteCard';
import LoadingScreen from './components/LoadingScreen';
import { fetchAvailableRoadmaps } from './hooks/fetchAvailableRoadmaps';

function App() {
    const { AvailableRoadmaps, loading } = fetchAvailableRoadmaps();

    if (loading) {
        return <LoadingScreen />;
    } else {
        return (
            <div id="App">
                {AvailableRoadmaps.map((roadmap) => (
                    <button onClick={() => SelectRoadmap(roadmap)}>{roadmap}</button>
                ))}

                <img src={logo} id="logo" alt="logo" />
                <SiteCard site={site}></SiteCard>
            </div>
        )
    }
}

export default App
