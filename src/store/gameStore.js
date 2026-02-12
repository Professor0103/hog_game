import { create } from 'zustand';

export const useGameStore = create((set) => ({
    gameState: 'welcome', // welcome, playing, memory_view, dialogue, finished
    heartsCollected: 0,
    totalHearts: 5,

    // Memories data (placeholder for now)
    memories: [
        { id: 1, title: 'First Meeting', text: 'I remember the first time I saw you...', collected: false },
        { id: 2, title: 'Our First Date', text: 'That dinner was magical...', collected: false },
        { id: 3, title: 'Adventures', text: 'Every trip with you is an adventure...', collected: false },
        { id: 4, title: 'Laughter', text: 'Your smile lights up my world...', collected: false },
        { id: 5, title: 'Future', text: 'I cannot wait for what comes next...', collected: false },
    ],
    currentMemory: null,

    // Dialogue
    dialogueStep: 0,
    dialogueLines: [
        "Pig: Oink! You made it!",
        "Pig: I've been waiting for you...",
        "Pig: Will you be my Valentine? 💖"
    ],

    // Actions
    setGameState: (state) => set({ gameState: state }),
    collectHeart: (id) => set((state) => {
        const newMemories = state.memories.map(m =>
            m.id === id ? { ...m, collected: true } : m
        );
        const memory = newMemories.find(m => m.id === id);
        return {
            heartsCollected: state.heartsCollected + 1,
            memories: newMemories,
            currentMemory: memory,
            gameState: 'memory_view'
        };
    }),
    closeMemory: () => set((state) => ({
        gameState: 'playing',
        currentMemory: null
    })),
    resetGame: () => set({
        gameState: 'welcome',
        heartsCollected: 0,
        currentMemory: null,
        dialogueStep: 0
    }),
    nextDialogue: () => set((state) => {
        if (state.dialogueStep < state.dialogueLines.length - 1) {
            return { dialogueStep: state.dialogueStep + 1 };
        } else {
            return { gameState: 'finished' };
        }
    }),
}));
