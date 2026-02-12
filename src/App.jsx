import React from 'react';
import { GameScene } from './components/3d/Scene';
import { UIOverlay } from './components/ui/Overlay';

function App() {
    return (
        <div className="w-full h-screen relative bg-valentine-pink/20">
            <GameScene />
            <UIOverlay />
        </div>
    );
}

export default App;
