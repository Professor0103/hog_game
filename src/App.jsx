import React, { Suspense } from 'react';
import { GameScene } from './components/3d/Scene';
import { UIOverlay } from './components/ui/Overlay';
import ErrorBoundary from './components/ErrorBoundary';
import { useGameStore } from './store/gameStore';

function App() {
    const gameState = useGameStore(state => state.gameState);

    return (
        <ErrorBoundary>
            <div className="w-full h-full relative bg-pink-50">
                {gameState !== 'welcome' && (
                    <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-valentine-red font-bold text-2xl animate-pulse">Loading Love...</div>}>
                        <GameScene />
                    </Suspense>
                )}
                <UIOverlay />
            </div>
        </ErrorBoundary>
    );
}

export default App;
