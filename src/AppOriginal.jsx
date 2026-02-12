import React, { Suspense } from 'react';
import { GameScene } from './components/3d/Scene';
import { UIOverlay } from './components/ui/Overlay';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <ErrorBoundary>
            <div className="w-full h-screen relative bg-valentine-pink/20">
                {/* <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-valentine-red font-bold text-2xl">Loading 3D Scene...</div>}> */}
                <GameScene />
                {/* </Suspense> */}
                <UIOverlay />
            </div>
        </ErrorBoundary>
    );
}

export default App;
