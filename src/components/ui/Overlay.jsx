import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';

export const UIOverlay = () => {
    const gameState = useGameStore(state => state.gameState);
    const heartsCollected = useGameStore(state => state.heartsCollected);
    const currentMemory = useGameStore(state => state.currentMemory);
    const closeMemory = useGameStore(state => state.closeMemory);
    const dialogueStep = useGameStore(state => state.dialogueStep);
    const dialogueLines = useGameStore(state => state.dialogueLines);
    const nextDialogue = useGameStore(state => state.nextDialogue);

    // FIX: Hooks must be at the top level
    useEffect(() => {
        const handleKey = (e) => {
            if ((e.code === 'Space' || e.code === 'Enter') && gameState === 'memory_view') {
                closeMemory();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [gameState, closeMemory]);

    if (gameState === 'welcome') {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md animate-bounce-in">
                    <h1 className="text-4xl font-bold text-valentine-red mb-4">Valentine's Memory Journey</h1>
                    <p className="text-gray-600 mb-6">Explore the world, collect hearts (JUMP with Space!), and find your way to the special surprise.</p>
                    <button
                        className="bg-valentine-red text-white px-8 py-3 rounded-full text-xl font-bold hover:bg-red-600 transition-transform hover:scale-105"
                        onClick={() => useGameStore.getState().setGameState('playing')}
                    >
                        Start Journey
                    </button>
                </div>
            </div>
        );
    }

    if (gameState === 'memory_view' && currentMemory) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all scale-100">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❤️</div>
                        <h2 className="text-2xl font-bold text-valentine-red mb-2">{currentMemory.title}</h2>
                        <p className="text-gray-700 text-lg mb-6">{currentMemory.text}</p>
                        <button
                            className="bg-valentine-pink text-white px-6 py-2 rounded-full font-bold hover:bg-pink-400"
                            onClick={closeMemory}
                        >
                            Keep Exploring
                        </button>
                        <p className="text-xs text-gray-400 mt-2">Press Space or Enter to continue</p>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'dialogue') {
        return (
            <div className="absolute inset-x-0 bottom-8 flex justify-center z-50">
                <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-2xl w-full mx-4 border-2 border-pink-300 cursor-pointer" onClick={nextDialogue}>
                    <h3 className="text-xl font-bold text-pink-600 mb-2">Piggy</h3>
                    <p className="text-2xl text-gray-800 animate-pulse">{dialogueLines[dialogueStep]}</p>
                    <div className="text-right text-sm text-gray-400 mt-2">Click to continue...</div>
                </div>
            </div>
        );
    }

    if (gameState === 'finished') {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-500/80 backdrop-blur-md z-50">
                <div className="text-center text-white animate-bounce">
                    <h1 className="text-6xl font-bold mb-4">Happy Valentine's Day! 💖</h1>
                    <p className="text-2xl">I love you!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg border-2 border-valentine-pink">
                <span className="text-valentine-red font-bold text-xl">
                    Hearts: {heartsCollected} / 3
                </span>
            </div>
        </div>
    );
};
