import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';

export const UIOverlay = () => {
    const gameState = useGameStore(state => state.gameState);
    const heartsCollected = useGameStore(state => state.heartsCollected);
    const totalHearts = useGameStore(state => state.totalHearts); // Moved up to fix Hook Error
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
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 99999, background: 'linear-gradient(to bottom right, #ffe4e6, #f3e8ff)' }}>
                {/* Background Floating Hearts */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(40)].map((_, i) => (
                        <div key={i}
                            className="absolute text-pink-300 animate-float select-none"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${Math.random() * 3 + 2}rem`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 10 + 10}s`,
                                opacity: 0.3 + Math.random() * 0.4
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                {/* Main Content - Centered Absolutely */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[90vw] max-w-4xl bg-white/80 p-10 rounded-3xl shadow-2xl border-4 border-white">
                    <div className="text-8xl text-pink-500 mb-6 drop-shadow-md animate-bounce">
                        💗
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-4 leading-tight">
                        Happy Valentine's <br /> Day,
                    </h1>
                    <h1 className="text-6xl md:text-8xl font-bold text-pink-600 mb-10" style={{ fontFamily: 'Great Vibes, cursive' }}>
                        My Love! 💕
                    </h1>

                    <p className="text-gray-800 text-xl md:text-3xl mb-12 font-light">
                        I've created something special for you — a journey through our most beautiful memories together.
                    </p>

                    <button
                        onClick={() => useGameStore.getState().setGameState('playing')}
                        className="inline-block px-12 py-6 text-2xl font-bold text-white bg-pink-500 rounded-full shadow-xl hover:bg-pink-600 hover:scale-105 transition-transform cursor-pointer"
                    >
                        Begin Our Journey ➜
                    </button>

                    <p className="mt-8 text-pink-500 font-bold uppercase text-sm tracking-widest animate-pulse">
                        ✨ Collect hearts to unlock memories ✨
                    </p>
                </div>
            </div>
        );
    }

    if (gameState === 'memory_view' && currentMemory) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50">
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all scale-100 m-4 border-4 border-pink-200">
                    <div className="text-center">
                        <div className="text-6xl mb-4 animate-pulse">❤️</div>
                        <h2 className="text-3xl font-bold text-valentine-red mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>{currentMemory.title}</h2>
                        <p className="text-gray-700 text-lg mb-8 italic">"{currentMemory.text}"</p>
                        <button
                            className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600 transition-colors shadow-lg"
                            onClick={closeMemory}
                        >
                            ❤️ Keep Exploring ❤️
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'dialogue') {
        return (
            <div className="fixed inset-x-0 bottom-8 flex justify-center z-50 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl max-w-3xl w-full mx-4 border-4 border-pink-300 pointer-events-auto cursor-pointer transform hover:scale-[1.01] transition-all" onClick={nextDialogue}>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="text-4xl">🐷</div>
                        <h3 className="text-2xl font-bold text-pink-600">Piggy Says:</h3>
                    </div>
                    <p className="text-2xl text-gray-800 leading-relaxed font-medium">{dialogueLines[dialogueStep]}</p>
                    <div className="text-right text-sm text-pink-400 mt-4 font-bold uppercase tracking-wider">Click to continue ➤</div>
                </div>
            </div>
        );
    }

    if (gameState === 'finished') {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-pink-500/90 backdrop-blur-lg z-50">
                <div className="text-center text-white p-8">
                    <h1 className="text-7xl md:text-9xl font-bold mb-8 animate-bounce" style={{ fontFamily: 'Great Vibes, cursive' }}>Happy Valentine's Day! 💖</h1>
                    <p className="text-3xl md:text-5xl font-light mb-8">I love you more than words can say!</p>
                    <div className="text-6xl animate-pulse">💑</div>
                </div>
            </div>
        )
    }

    return (
        <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border-2 border-pink-400 flex items-center gap-2">
                <span className="text-2xl">❤️</span>
                <span className="text-pink-600 font-bold text-xl font-mono">
                    {heartsCollected} / {totalHearts}
                </span>
            </div>
        </div>
    );
};
