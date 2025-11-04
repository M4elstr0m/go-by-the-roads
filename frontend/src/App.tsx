import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import '@/styles/App.css';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Roadmap from '@/pages/Roadmap';

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/roadmap" element={<Roadmap />} />
            </Routes>
        </HashRouter>
    );
}

export default App
