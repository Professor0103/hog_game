import { create } from 'zustand';

const VALID_GAME_STATES = new Set(['welcome', 'playing', 'memory_view', 'dialogue', 'finished']);

function isValidHeartId(id) {
    return Number.isInteger(id) && id >= 1 && id <= 5;
}

// All text is in code — edit these arrays to change what appears in the game.
function getDefaultMemories() {
    return [
        { id: 1, title: 'First Meeting', text: 'I remember the first time I saw you...', image: null, collected: false },
        { id: 2, title: 'Our First Date', text: 'That dinner was magical...', image: null, collected: false },
        { id: 3, title: 'Adventures', text: 'Every trip with you is an adventure...', image: null, collected: false },
        { id: 4, title: 'Laughter', text: 'Your smile lights up my world...', image: null, collected: false },
        { id: 5, title: 'Future', text: 'I cannot wait for what comes next...', image: null, collected: false },
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
        "Oink! You made it!",
        "I've been waiting for you...",
        "Will you be my Valentine? 💖"
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
