import { create } from 'zustand';

const VALID_GAME_STATES = new Set(['welcome', 'playing', 'memory_view', 'dialogue', 'finished']);

function isValidHeartId(id) {
    return Number.isInteger(id) && id >= 1 && id <= 5;
}

// All text is in code — edit these arrays to change what appears in the game.
function getDefaultMemories() {
    return [
        { id: 1, title: 'First date', text: 'I honestly have lots of fuzzy love-filled memories, but how could I forget the warmth in my heart when we went to Happy Lemon :).', image: null, collected: false },
        { id: 2, title: 'First present', text: 'Honestly, seeing you so happy from my measly Amazon gift gave me pleasure beyond any material gain.', image: null, collected: false },
        { id: 3, title: 'Adventures', text: 'Trailing you from behind as you run like a motivated beaver for food, I couldn\'t ask for someone better to follow.', image: null, collected: false },
        { id: 4, title: 'Laughter', text: "You're the funniest little hog I met, keep making jokes and make people smile.", image: null, collected: false },
        { id: 5, title: 'Future', text: 'I just want to work hard as a pig, I know I am immature now and a shitty person sometimes. However, I still have the right intentions. I love you hog.', image: null, collected: false },
    ];
}

export const useGameStore = create((set) => ({
    gameState: 'welcome',
    heartsCollected: 0,
    totalHearts: 5,
    memories: getDefaultMemories(),
    currentMemory: null,

    // Pig dialogue — edit these strings for the final conversation (click pig after all hearts).
    dialogueStep: 0,
    dialogueLines: [
        "You completed the mission! Now pig will provide presents and kisses",
        "Anything else you want?",
        "OK LA U, PIG ROLL"
    ],

    setGameState: (state) => set(() => {
        if (!VALID_GAME_STATES.has(state)) return {};
        return { gameState: state };
    }),
    collectHeart: (id) => set((state) => {
        if (!isValidHeartId(id)) return {};
        const existingMemory = state.memories.find((m) => m.id === id);
        if (!existingMemory || existingMemory.collected) return {};
        const newMemories = state.memories.map((m) =>
            m.id === id ? { ...m, collected: true } : m
        );
        const memory = newMemories.find((m) => m.id === id);
        return {
            heartsCollected: newMemories.filter((m) => m.collected).length,
            memories: newMemories,
            currentMemory: memory,
            gameState: 'memory_view',
        };
    }),
    closeMemory: () => set(() => ({
        gameState: 'playing',
        currentMemory: null,
    })),
    resetGame: () => set(() => ({
        gameState: 'welcome',
        heartsCollected: 0,
        currentMemory: null,
        dialogueStep: 0,
        memories: getDefaultMemories(),
    })),
    nextDialogue: () => set((state) => {
        if (state.dialogueStep < 0) return { dialogueStep: 0 };
        if (state.dialogueStep < state.dialogueLines.length - 1) {
            return { dialogueStep: state.dialogueStep + 1 };
        }
        return { gameState: 'finished' };
    }),
}));
