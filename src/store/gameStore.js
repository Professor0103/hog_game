import { create } from 'zustand';

const VALID_GAME_STATES = new Set(['welcome', 'playing', 'memory_view', 'dialogue', 'finished']);
const STORAGE_KEY = 'hog-game-memory-customizations';

function isValidHeartId(id) {
    return Number.isInteger(id) && id >= 1 && id <= 5;
}

function getDefaultMemories() {
    return [
        { id: 1, title: 'First Meeting', text: 'I remember the first time I saw you...', image: null, collected: false },
        { id: 2, title: 'Our First Date', text: 'That dinner was magical...', image: null, collected: false },
        { id: 3, title: 'Adventures', text: 'Every trip with you is an adventure...', image: null, collected: false },
        { id: 4, title: 'Laughter', text: 'Your smile lights up my world...', image: null, collected: false },
        { id: 5, title: 'Future', text: 'I cannot wait for what comes next...', image: null, collected: false },
    ];
}

function getSavedCustomizations() {
    try {
        const s = localStorage.getItem(STORAGE_KEY);
        return s ? JSON.parse(s) : {};
    } catch {
        return {};
    }
}

function getInitialMemories() {
    const defaults = getDefaultMemories();
    const saved = getSavedCustomizations();
    return defaults.map((m) => ({
        ...m,
        ...(saved[m.id] || {}),
        id: m.id,
        collected: false,
    }));
}

function saveCustomizations(memories) {
    const obj = {};
    memories.forEach((m) => {
        obj[m.id] = { title: m.title, text: m.text, image: m.image ?? null };
    });
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch (_) {}
}

export const useGameStore = create((set) => ({
    gameState: 'welcome', // welcome, playing, memory_view, dialogue, finished
    heartsCollected: 0,
    totalHearts: 5,

    memories: getInitialMemories(),
    currentMemory: null,
    showCustomizeMemories: false,

    // Dialogue
    dialogueStep: 0,
    dialogueLines: [
        "Pig: Oink! You made it!",
        "Pig: I've been waiting for you...",
        "Pig: Will you be my Valentine? 💖"
    ],

    // Actions
    setGameState: (state) => set(() => {
        if (!VALID_GAME_STATES.has(state)) {
            return {};
        }
        return { gameState: state };
    }),
    setShowCustomizeMemories: (show) => set({ showCustomizeMemories: show }),
    collectHeart: (id) => set((state) => {
        if (!isValidHeartId(id)) {
            return {};
        }

        const existingMemory = state.memories.find((memory) => memory.id === id);
        if (!existingMemory || existingMemory.collected) {
            return {};
        }

        const newMemories = state.memories.map(m =>
            m.id === id ? { ...m, collected: true } : m
        );
        const memory = newMemories.find(m => m.id === id);
        return {
            heartsCollected: newMemories.filter((m) => m.collected).length,
            memories: newMemories,
            currentMemory: memory,
            gameState: 'memory_view'
        };
    }),
    closeMemory: () => set((state) => ({
        gameState: 'playing',
        currentMemory: null
    })),
    updateMemory: (id, { title, text, image }) => set((state) => {
        if (!isValidHeartId(id)) return {};
        const next = state.memories.map((m) =>
            m.id === id ? { ...m, title: title ?? m.title, text: text ?? m.text, image: image !== undefined ? image : m.image } : m
        );
        saveCustomizations(next);
        return { memories: next };
    }),
    resetGame: () => set(() => ({
        gameState: 'welcome',
        heartsCollected: 0,
        currentMemory: null,
        dialogueStep: 0,
        memories: getInitialMemories(),
    })),
    nextDialogue: () => set((state) => {
        if (!Number.isInteger(state.dialogueStep) || state.dialogueStep < 0) {
            return { dialogueStep: 0 };
        }

        if (state.dialogueStep < state.dialogueLines.length - 1) {
            return { dialogueStep: state.dialogueStep + 1 };
        } else {
            return { gameState: 'finished' };
        }
    }),
}));
