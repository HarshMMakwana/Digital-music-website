const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const playButtons = document.querySelectorAll('.play-button');

let currentSongIndex = 0;
const songs = [
    'song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3', 'song5.mp3',
    'song6.mp3', 'song7.mp3', 'song8.mp3', 'song9.mp3', 'song10.mp3',
    'song11.mp3', 'song12.mp3', 'song13.mp3', 'song14.mp3', 'song15.mp3',
    'song16.mp3', 'song17.mp3', 'song18.mp3', 'song19.mp3', 'song20.mp3'
];
let isPlaying = false;

playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentSongIndex = index;
        playSong(button.getAttribute('data-song'));
    });
});

playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong(songs[currentSongIndex]);
    }
});

prevButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex]);
});

nextButton.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex]);
});

audioPlayer.addEventListener('timeupdate', () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    progressBar.value = (currentTime / duration) * 100;
    updateCurrentTimeDisplay(currentTime);
});

progressBar.addEventListener('input', () => {
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (progressBar.value / 100) * duration;
});

function playSong(song) {
    audioPlayer.src = song;
    audioPlayer.play();
    playPauseButton.textContent = 'Pause';
    isPlaying = true;
}

function pauseSong() {
    audioPlayer.pause();
    playPauseButton.textContent = 'Play';
    isPlaying = false;
}

function updateCurrentTimeDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    currentTimeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
