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
            <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 z-50">
                {/* Background Floating Hearts */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div key={i}
                            className="absolute text-pink-300 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 2 + 1}rem`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 5 + 5}s`
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="z-10 text-center px-4 max-w-2xl animate-fade-in-up">
                    <div className="text-6xl text-pink-500 mb-6 drop-shadow-sm animate-pulse">
                        💗
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-2 leading-tight tracking-tight">
                        Happy Valentine's <br /> Day,
                    </h1>
                    <h1 className="text-5xl md:text-7xl font-bold text-pink-500 mb-8 leading-tight drop-shadow-sm" style={{ fontFamily: 'Great Vibes, cursive' }}>
                        My Love! 💕
                    </h1>

                    <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed">
                        I've created something special for you — a journey through our most beautiful memories together.
                    </p>

                    <button
                        onClick={() => useGameStore.getState().setGameState('playing')}
                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:scale-105 shadow-xl hover:shadow-2xl"
                    >
                        <span>Begin Our Journey</span>
                        <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">➜</span>
                    </button>

                    <p className="mt-8 text-sm text-pink-400 font-medium tracking-wide uppercase">
                        Collect hearts to unlock our memories ✨
                    </p>
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
