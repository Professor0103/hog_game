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
            // Full screen intro page
            <div className="absolute inset-0 flex items-center justify-center bg-pink-100 z-50">
                {/* Valentine's Card Container - Centered and Elegant */}
                <div className="relative w-full max-w-lg aspect-[3/4] bg-white shadow-2xl rounded-xl p-10 border-[12px] border-pink-200 flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-transform duration-500 cursor-pointer"
                    onClick={() => useGameStore.getState().setGameState('playing')}
                >
                    {/* Decorative Hearts */}
                    <div className="absolute top-4 left-4 text-4xl animate-bounce">❤️</div>
                    <div className="absolute top-4 right-4 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>❤️</div>
                    <div className="absolute bottom-4 left-4 text-4xl animate-bounce" style={{ animationDelay: '0.4s' }}>❤️</div>
                    <div className="absolute bottom-4 right-4 text-4xl animate-bounce" style={{ animationDelay: '0.6s' }}>❤️</div>

                    <h1 className="text-6xl text-valentine-red mb-8" style={{ fontFamily: 'Great Vibes, cursive' }}>
                        Happy Valentine's Day
                    </h1>

                    <div className="text-2xl text-gray-700 mb-8 font-serif italic">
                        <p className="mb-2">To: My Love</p>
                        <p>From: Your Favorite Raccoon 🦝</p>
                    </div>

                    <p className="text-pink-500 mb-10 text-lg font-light">
                        I've hidden 5 of our special memories in this world.<br />
                        Can you find them all?
                    </p>

                    <button
                        className="bg-valentine-red text-white px-10 py-4 rounded-full text-2xl font-bold shadow-lg hover:bg-red-600 hover:shadow-xl transition-all animate-pulse"
                        style={{ fontFamily: 'Dancing Script, cursive' }}
                    >
                        Open Your Gift 🎁
                    </button>

                    <p className="mt-4 text-sm text-gray-400">(Click anywhere to start)</p>
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

    const totalHearts = useGameStore(state => state.totalHearts);

    return (
        <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg border-2 border-valentine-pink">
                <span className="text-valentine-red font-bold text-xl">
                    Hearts: {heartsCollected} / {totalHearts}
                </span>
            </div>
        </div>
    );
};
