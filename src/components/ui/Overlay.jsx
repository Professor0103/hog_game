import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useGameStore } from '../../store/gameStore';

export const UIOverlay = () => {
    const gameState = useGameStore((state) => state.gameState);
    const heartsCollected = useGameStore((state) => state.heartsCollected);
    const totalHearts = useGameStore((state) => state.totalHearts);
    const currentMemory = useGameStore((state) => state.currentMemory);
    const closeMemory = useGameStore((state) => state.closeMemory);
    const dialogueStep = useGameStore((state) => state.dialogueStep);
    const dialogueLines = useGameStore((state) => state.dialogueLines);
    const nextDialogue = useGameStore((state) => state.nextDialogue);

    const [showCollectBanner, setShowCollectBanner] = useState(false);
    const hasShownCollectBanner = useRef(false);

    useEffect(() => {
        if (gameState === 'playing' && !hasShownCollectBanner.current) {
            hasShownCollectBanner.current = true;
            setShowCollectBanner(true);
            const t = setTimeout(() => setShowCollectBanner(false), 3000);
            return () => clearTimeout(t);
        }
        if (gameState === 'welcome') {
            hasShownCollectBanner.current = false;
        }
    }, [gameState]);

    useEffect(() => {
        const handleKey = (e) => {
            if ((e.code === 'Space' || e.code === 'Enter') && gameState === 'memory_view') {
                closeMemory();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [gameState, closeMemory]);

    // ——— Welcome ———
    if (gameState === 'welcome') {
        return (
            <div className="fixed inset-0 w-full overflow-auto bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
                <div className="relative min-h-full min-h-viewport py-12 px-4" style={{ minHeight: '100vh' }}>
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(40)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute text-pink-300 animate-float select-none"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    fontSize: `${Math.random() * 2 + 1.5}rem`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    opacity: 0.4 + Math.random() * 0.3,
                                }}
                            >
                                ❤️
                            </div>
                        ))}
                    </div>
                    <div
                        className="relative z-10 text-center w-[90vw] max-w-4xl bg-white/90 p-10 rounded-3xl shadow-2xl border-4 border-white mx-4"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <div className="text-8xl text-pink-500 mb-6 drop-shadow-md animate-bounce">💗</div>
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
                            className="inline-block px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl hover:opacity-95 hover:scale-105 transition-transform cursor-pointer"
                        >
                            ❤ Begin Our Journey
                        </button>
                        <p className="mt-8 text-pink-500 font-bold uppercase text-sm tracking-widest animate-pulse">
                            ✨ Collect hearts to unlock our memories ✨
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // ——— Memory popup (heart collected) — render to body so it's always on top of canvas ———
    if (gameState === 'memory_view' && currentMemory) {
        const memoryPopup = (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4" style={{ zIndex: 10000 }}>
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full border-4 border-pink-200 max-h-[90vh] overflow-auto">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❤️</div>
                        {currentMemory.image && (
                            <div className="mb-6 rounded-xl overflow-hidden border-2 border-pink-200">
                                <img src={currentMemory.image} alt="" className="w-full h-auto max-h-56 object-cover" />
                            </div>
                        )}
                        <h2 className="text-2xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
                            {currentMemory.title}
                        </h2>
                        <p className="text-gray-700 text-lg mb-8 italic whitespace-pre-wrap">"{currentMemory.text}"</p>
                        <button
                            className="bg-pink-500 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-600"
                            onClick={closeMemory}
                        >
                            ❤️ Keep Exploring ❤️
                        </button>
                    </div>
                </div>
            </div>
        );
        return createPortal(memoryPopup, document.body);
    }

    // ——— Pig dialogue — render to body so it's always on top of canvas ———
    if (gameState === 'dialogue') {
        const dialogueUI = (
            <>
                <div className="fixed top-4 left-4 bg-white rounded-2xl shadow-xl border-2 border-pink-400 min-w-[180px] px-4 py-3" style={{ zIndex: 10001 }}>
                    <div className="text-xs uppercase text-pink-500 font-semibold">Player</div>
                    <div className="text-pink-600 font-bold text-lg" style={{ fontFamily: 'Dancing Script, cursive' }}>Marmot</div>
                    <div className="flex gap-0.5 mt-1">
                        {[...Array(totalHearts)].map((_, i) => (
                            <span key={i} className={`text-xl ${i < heartsCollected ? 'opacity-100' : 'opacity-30'}`}>❤️</span>
                        ))}
                    </div>
                    <div className="text-pink-600 font-bold text-sm font-mono mt-1">{heartsCollected}/{totalHearts}</div>
                </div>
                <div className="fixed inset-x-0 bottom-6 flex justify-center px-4" style={{ zIndex: 10001 }}>
                    <div
                        className="bg-white p-6 rounded-2xl shadow-2xl max-w-2xl w-full border-4 border-pink-300 cursor-pointer hover:bg-pink-50 transition-colors"
                        onClick={nextDialogue}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">🐷</span>
                            <h3 className="text-xl font-bold text-pink-600">Piggy says:</h3>
                        </div>
                        <p className="text-xl text-gray-800 font-medium">{dialogueLines[dialogueStep]}</p>
                        <p className="text-right text-sm text-pink-500 mt-3 font-semibold">Click to continue ➤</p>
                    </div>
                </div>
            </>
        );
        return createPortal(dialogueUI, document.body);
    }

    // ——— Finished ——— render to body so it's on top
    if (gameState === 'finished') {
        const finishedUI = (
            <div className="fixed inset-0 flex items-center justify-center bg-pink-400/50 backdrop-blur-[2px]" style={{ zIndex: 10000 }}>
                <div className="text-center text-white p-8">
                    <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-bounce" style={{ fontFamily: 'Great Vibes, cursive' }}>
                        Happy Valentine's Day! 💖
                    </h1>
                    <p className="text-2xl md:text-4xl font-light mb-8">I love you more than words can say!</p>
                    <div className="text-6xl animate-pulse">💑</div>
                </div>
            </div>
        );
        return createPortal(finishedUI, document.body);
    }

    // ——— Playing: user bar (Marmot + hearts) + banner — render in overlay layer so it's always visible above canvas ———
    return (
        <>
            {showCollectBanner && (
                <div
                    className="fixed top-0 left-0 right-0 text-center py-4 pointer-events-none banner-fade-in"
                    style={{ fontFamily: "'Block Craft', 'Press Start 2P', cursive", zIndex: 200 }}
                >
                    <span className="text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.8)] text-lg sm:text-xl md:text-2xl">
                        Collect the Hearts!
                    </span>
                </div>
            )}
            <div
                className="fixed top-4 left-4 bg-white rounded-2xl shadow-2xl border-2 border-pink-400 min-w-[200px] px-5 py-4"
                style={{ zIndex: 201 }}
            >
                <div className="text-xs uppercase tracking-wider text-pink-500 font-semibold mb-0.5">Player</div>
                <div className="text-pink-600 font-bold text-xl mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    Marmot
                </div>
                <div className="text-xs uppercase tracking-wider text-pink-500 font-semibold mb-1">Hearts</div>
                <div className="flex items-center gap-1 flex-wrap">
                    {[...Array(totalHearts)].map((_, i) => (
                        <span
                            key={i}
                            className={`text-2xl ${i < heartsCollected ? 'opacity-100 scale-110' : 'opacity-30 scale-90'}`}
                        >
                            ❤️
                        </span>
                    ))}
                </div>
                <div className="text-pink-600 font-bold text-sm font-mono mt-1.5">
                    {heartsCollected} / {totalHearts} hearts
                </div>
            </div>
        </>
    );
};
