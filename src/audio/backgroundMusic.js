/**
 * Background music starts when the user clicks "Begin Our Journey" (user gesture required by browsers).
 * Place your audio file in public/music/ and name it to match MUSIC_SRC, or update MUSIC_SRC below.
 */

const MUSIC_SRC = '/music/background.mp3';

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
