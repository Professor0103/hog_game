import React, { Suspense } from 'react';
import { GameScene } from './components/3d/Scene';
import { UIOverlay } from './components/ui/Overlay';
import ErrorBoundary from './components/ErrorBoundary';
import { useGameStore } from './store/gameStore';

function App() {
    const gameState = useGameStore(state => state.gameState);

    return (
        <ErrorBoundary>
            <div className="fixed inset-0 w-full h-full bg-pink-50" style={{ width: '100vw', height: '100vh', height: '100dvh' }}>
                {gameState !== 'welcome' && (
                    <div className="absolute inset-0 w-full h-full" style={{ width: '100%', height: '100%' }}>
                        <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-valentine-red font-bold text-2xl animate-pulse">Loading Love...</div>}>
                            <GameScene />
                        </Suspense>
                    </div>
                )}
                <UIOverlay />
            </div>
        </ErrorBoundary>
    );
}

export default App;
