import { create } from 'zustand';

export const useGameStore = create((set) => ({
    gameState: 'welcome', // welcome, playing, memory_view, dialogue, finished
    heartsCollected: 0,
    totalHearts: 3,

    // Memories data (placeholder for now)
    memories: [
        { id: 1, title: "The First Date", text: "Remember when we went to that cafe...", image: null, collected: false },
        { id: 2, title: "The Road Trip", text: "Driving through the mountains...", image: null, collected: false },
        { id: 3, title: "Lazy Sunday", text: "Just staying in and watching movies...", image: null, collected: false },
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
