import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';

export const UIOverlay = () => {
    const gameState = useGameStore(state => state.gameState);
    const heartsCollected = useGameStore(state => state.heartsCollected);
    const totalHearts = useGameStore(state => state.totalHearts);
    const currentMemory = useGameStore(state => state.currentMemory);
    const closeMemory = useGameStore(state => state.closeMemory);
    const dialogueStep = useGameStore(state => state.dialogueStep);
    const dialogueLines = useGameStore(state => state.dialogueLines);
    const nextDialogue = useGameStore(state => state.nextDialogue);
    const memories = useGameStore(state => state.memories);
    const updateMemory = useGameStore(state => state.updateMemory);
    const showCustomizeMemories = useGameStore(state => state.showCustomizeMemories);
    const setShowCustomizeMemories = useGameStore(state => state.setShowCustomizeMemories);

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
        if (showCustomizeMemories) {
            return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-auto">
                    <div className="bg-white rounded-2xl shadow-2xl border-4 border-pink-200 max-w-2xl w-full max-h-[90vh] overflow-auto">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-pink-600 mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                                Customize your love messages & photos
                            </h2>
                            <p className="text-gray-600 text-sm mb-6">
                                Edit the title and message for each heart. Add a photo and it will show in the popup when the heart is collected.
                            </p>
                            {memories.map((memory) => (
                                <div key={memory.id} className="mb-8 p-4 rounded-xl bg-pink-50 border-2 border-pink-200">
                                    <h3 className="text-lg font-bold text-pink-700 mb-3">Heart #{memory.id}</h3>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input
                                        type="text"
                                        value={memory.title}
                                        onChange={(e) => updateMemory(memory.id, { title: e.target.value })}
                                        className="w-full px-3 py-2 rounded-lg border border-pink-300 mb-3 focus:ring-2 focus:ring-pink-400"
                                        placeholder="e.g. First Meeting"
                                    />
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Love message</label>
                                    <textarea
                                        value={memory.text}
                                        onChange={(e) => updateMemory(memory.id, { text: e.target.value })}
                                        rows={3}
                                        className="w-full px-3 py-2 rounded-lg border border-pink-300 mb-3 focus:ring-2 focus:ring-pink-400 resize-y"
                                        placeholder="Your message when this heart is collected..."
                                    />
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo (optional)</label>
                                    {memory.image ? (
                                        <div className="mb-2">
                                            <img src={memory.image} alt="Memory" className="w-full max-h-40 object-cover rounded-lg border border-pink-300" />
                                            <button
                                                type="button"
                                                onClick={() => updateMemory(memory.id, { image: null })}
                                                className="mt-2 text-sm text-pink-600 hover:underline"
                                            >
                                                Remove photo
                                            </button>
                                        </div>
                                    ) : (
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                const reader = new FileReader();
                                                reader.onload = () => updateMemory(memory.id, { image: reader.result });
                                                reader.readAsDataURL(file);
                                                e.target.value = '';
                                            }}
                                            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
                                        />
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setShowCustomizeMemories(false)}
                                    className="px-6 py-3 rounded-full font-bold bg-pink-500 text-white hover:bg-pink-600 shadow-lg"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            /* Scrollable so message is always reachable; content centered in viewport */
            <div className="fixed inset-0 w-full overflow-auto bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">
                {/* Wrapper: at least viewport height so 50% = middle; relative so card can be absolutely centered */}
                <div className="relative min-h-full min-h-viewport py-12 px-4" style={{ minHeight: '100vh' }}>
                    {/* Background Floating Hearts */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(60)].map((_, i) => (
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

                    {/* Main Content – centered with position so it's always in the middle */}
                    <div
                        className="relative z-10 text-center w-[90vw] max-w-4xl bg-white/80 p-10 rounded-3xl shadow-2xl border-4 border-white mx-4"
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
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
                            className="inline-block px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-xl hover:opacity-95 hover:scale-105 transition-transform cursor-pointer"
                        >
                            ❤ Begin Our Journey
                        </button>

                        <p className="mt-8 text-pink-500 font-bold uppercase text-sm tracking-widest animate-pulse">
                            ✨ Collect hearts to unlock our memories ✨
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowCustomizeMemories(true)}
                            className="mt-4 text-pink-600 hover:text-pink-700 underline text-sm font-medium"
                        >
                            Customize love messages & photos
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === 'memory_view' && currentMemory) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full transform transition-all scale-100 border-4 border-pink-200 max-h-[90vh] overflow-auto">
                    <div className="text-center">
                        <div className="text-6xl mb-4 animate-pulse">❤️</div>
                        {currentMemory.image && (
                            <div className="mb-6 rounded-xl overflow-hidden border-2 border-pink-200 shadow-lg">
                                <img
                                    src={currentMemory.image}
                                    alt="Our memory"
                                    className="w-full h-auto max-h-64 object-cover object-center"
                                />
                            </div>
                        )}
                        <h2 className="text-3xl font-bold text-pink-600 mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>{currentMemory.title}</h2>
                        <p className="text-gray-700 text-lg mb-8 italic whitespace-pre-wrap">"{currentMemory.text}"</p>
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
        <div className="fixed top-4 left-4 z-[100] pointer-events-auto">
            <div className="bg-white/90 backdrop-blur-md px-5 py-4 rounded-2xl shadow-xl border-2 border-pink-400 min-w-[180px]">
                <div className="text-pink-600 font-bold text-lg mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    Marmot
                </div>
                <div className="flex items-center gap-0.5" aria-label={`${heartsCollected} of ${totalHearts} hearts`}>
                    {[...Array(totalHearts)].map((_, i) => (
                        <span
                            key={i}
                            className={`text-2xl transition-all duration-200 ${i < heartsCollected ? 'scale-110 opacity-100' : 'scale-90 opacity-30'}`}
                            title={i < heartsCollected ? 'Collected' : 'Not yet collected'}
                        >
                            ❤️
                        </span>
                    ))}
                </div>
                <div className="text-pink-600 font-bold text-sm font-mono mt-1.5">
                    {heartsCollected} / {totalHearts} hearts
                </div>
            </div>
        </div>
    );
};
