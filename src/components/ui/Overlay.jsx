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
            <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 z-[9999]">
                {/* Background Floating Hearts */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(50)].map((_, i) => (
                        <div key={i}
                            className="absolute text-pink-300 animate-float opacity-40 select-none"
                            style={{
                                left: `${Math.random() * 120 - 10}%`,
                                top: `${Math.random() * 120 - 10}%`,
                                fontSize: `${Math.random() * 4 + 1}rem`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 10 + 10}s`,
                                transform: `rotate(${Math.random() * 360}deg)`
                            }}
                        >
                            ❤️
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-[90vw] w-full animate-fade-in-up">
                    <div className="text-6xl md:text-8xl text-pink-500 mb-6 drop-shadow-md animate-bounce">
                        💗
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold text-gray-800 mb-2 leading-tight tracking-tight drop-shadow-sm">
                        Happy Valentine's <br /> Day,
                    </h1>
                    <h1 className="text-5xl md:text-8xl font-bold text-pink-600 mb-8 leading-tight drop-shadow-lg" style={{ fontFamily: 'Great Vibes, cursive' }}>
                        My Love! 💕
                    </h1>

                    <p className="text-gray-700 text-lg md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                        I've created something special for you — a 3D journey through our most beautiful memories together.
                    </p>

                    <button
                        onClick={() => useGameStore.getState().setGameState('playing')}
                        className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-300 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-500/50 ring-4 ring-pink-200 hover:ring-pink-400 cursor-pointer"
                    >
                        <span>Begin Our Journey</span>
                        <span className="ml-3 text-2xl group-hover:translate-x-2 transition-transform">➜</span>
                    </button>

                    <p className="mt-8 text-pink-500 font-semibold tracking-wide uppercase text-sm animate-pulse">
                        ✨ Collect all 5 hearts to unlock a surprise ✨
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
