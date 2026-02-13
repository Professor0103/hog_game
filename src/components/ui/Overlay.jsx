import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useGameStore } from '../../store/gameStore';
import { startBackgroundMusic } from '../../audio/backgroundMusic';

const opts = { passive: false };

export function MobileControls() {
    const setMobileKey = useGameStore((s) => s.setMobileKey);
    const clearMobileMovement = useGameStore((s) => s.clearMobileMovement);
    const containerRef = useRef(null);

    useEffect(() => {
        return () => clearMobileMovement();
    }, [clearMobileMovement]);

    /* Non-passive touch so preventDefault works on iOS (stops scroll/zoom) */
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const prevent = (e) => { e.preventDefault(); e.stopPropagation(); };
        const onTouchStart = (e) => { prevent(e); };
        const onTouchEnd = (e) => { prevent(e); };
        el.addEventListener('touchstart', onTouchStart, opts);
        el.addEventListener('touchend', onTouchEnd, opts);
        return () => {
            el.removeEventListener('touchstart', onTouchStart, opts);
            el.removeEventListener('touchend', onTouchEnd, opts);
        };
    }, []);

    const prevent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // Portal to document.body so controls are guaranteed on top of canvas (fixes mobile touch)
    const controlsUI = (
        <div
            className="mobile-controls-layer"
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                pointerEvents: 'none',
                touchAction: 'none',
            }}
        >
            <div
                ref={containerRef}
                className="fixed bottom-6 left-4 flex items-end gap-4 md:bottom-8 md:left-6 mobile-controls-only"
                style={{
                    pointerEvents: 'auto',
                    touchAction: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    minWidth: 140,
                    minHeight: 140,
                }}
            >
                {/* D-pad - 48px min touch targets */}
                <div className="grid grid-cols-3 grid-rows-3 gap-1 place-items-center select-none" style={{ width: 132, height: 132 }}>
                    <div />
                    <button
                        type="button"
                        aria-label="Forward"
                        className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-xl bg-white/95 border-2 border-pink-400 shadow-lg active:bg-pink-200 flex items-center justify-center text-xl"
                    onPointerDown={(e) => { prevent(e); setMobileKey('forward', true); }}
                    onPointerUp={(e) => { prevent(e); setMobileKey('forward', false); }}
                    onPointerLeave={() => setMobileKey('forward', false)}
                    onTouchStart={(e) => { prevent(e); setMobileKey('forward', true); }}
                    onTouchEnd={(e) => { prevent(e); setMobileKey('forward', false); }}
                >
                    ▲
                </button>
                <div />
                <button
                    type="button"
                    aria-label="Left"
                    className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-xl bg-white/95 border-2 border-pink-400 shadow-lg active:bg-pink-200 flex items-center justify-center text-xl"
                    onPointerDown={(e) => { prevent(e); setMobileKey('left', true); }}
                    onPointerUp={(e) => { prevent(e); setMobileKey('left', false); }}
                    onPointerLeave={() => setMobileKey('left', false)}
                    onTouchStart={(e) => { prevent(e); setMobileKey('left', true); }}
                    onTouchEnd={(e) => { prevent(e); setMobileKey('left', false); }}
                >
                    ◀
                </button>
                <div className="w-12 h-12" />
                <button
                    type="button"
                    aria-label="Right"
                    className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-xl bg-white/95 border-2 border-pink-400 shadow-lg active:bg-pink-200 flex items-center justify-center text-xl"
                    onPointerDown={(e) => { prevent(e); setMobileKey('right', true); }}
                    onPointerUp={(e) => { prevent(e); setMobileKey('right', false); }}
                    onPointerLeave={() => setMobileKey('right', false)}
                    onTouchStart={(e) => { prevent(e); setMobileKey('right', true); }}
                    onTouchEnd={(e) => { prevent(e); setMobileKey('right', false); }}
                >
                    ▶
                </button>
                <div />
                <button
                    type="button"
                    aria-label="Backward"
                    className="min-w-[48px] min-h-[48px] w-12 h-12 rounded-xl bg-white/95 border-2 border-pink-400 shadow-lg active:bg-pink-200 flex items-center justify-center text-xl"
                    onPointerDown={(e) => { prevent(e); setMobileKey('backward', true); }}
                    onPointerUp={(e) => { prevent(e); setMobileKey('backward', false); }}
                    onPointerLeave={() => setMobileKey('backward', false)}
                    onTouchStart={(e) => { prevent(e); setMobileKey('backward', true); }}
                    onTouchEnd={(e) => { prevent(e); setMobileKey('backward', false); }}
                >
                    ▼
                </button>
                <div />
            </div>
            {/* Jump - 48px min touch target */}
            <button
                type="button"
                aria-label="Jump"
                className="min-w-[48px] min-h-[48px] w-14 h-14 rounded-full bg-white/95 border-2 border-pink-400 shadow-lg active:bg-pink-200 flex items-center justify-center text-sm font-bold text-pink-600 select-none"
                onPointerDown={(e) => { prevent(e); setMobileKey('jump', true); }}
                onPointerUp={(e) => { prevent(e); setMobileKey('jump', false); }}
                onPointerLeave={() => setMobileKey('jump', false)}
                onTouchStart={(e) => { prevent(e); setMobileKey('jump', true); }}
                onTouchEnd={(e) => { prevent(e); setMobileKey('jump', false); }}
            >
                Jump
            </button>
        </div>
    </div>
    );

    return createPortal(controlsUI, document.body);
}

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
                            baby joe 💕
                        </h1>
                        <p className="text-gray-800 text-xl md:text-3xl mb-12 font-light">
                            I hope this is better than my last site, upgraded skills now :]]
                        </p>
                        <button
                            onClick={() => {
                                useGameStore.getState().setGameState('playing');
                                startBackgroundMusic();
                            }}
                            className="inline-block px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl hover:opacity-95 hover:scale-105 transition-transform cursor-pointer"
                        >
                            ❤ Begin Our Journey
                        </button>
                        <p className="mt-8 text-pink-500 font-bold uppercase text-sm tracking-widest animate-pulse">
                            Pig loves you
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // memory_view and dialogue: text is shown as 3D text in the scene (MemoryText3D + NPC), same style as "Click me!" — no HTML popup here

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
