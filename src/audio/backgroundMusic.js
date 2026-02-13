/**
 * Background music starts when the user clicks "Begin Our Journey" (user gesture required by browsers).
 * Uses Vite base URL so it works on GitHub Pages (e.g. /hog_game/music/background.mp3).
 */
const MUSIC_SRC = `${import.meta.env.BASE_URL}music/background.mp3`;

let audio = null;

export function startBackgroundMusic() {
    if (typeof window === 'undefined') return;
    try {
        if (!audio) {
            audio = new window.Audio(MUSIC_SRC);
            audio.loop = true;
            audio.volume = 0.4;
        }
        const p = audio.play();
        if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (_) {}
}

export function pauseBackgroundMusic() {
    if (audio) audio.pause();
}
