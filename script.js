const menu = document.querySelector( '.mobile-menu' );
const navigation = document.querySelector( '.navigation' );

const player = document.querySelector( '.player' );
const playerVideo = document.querySelector( '.player-video' );

const progress = document.querySelector( '.progress' );
const progressBar = document.querySelector( '.progress-bar' );

const playBtn = document.querySelector( '.fa-play' );
const skipButtons = document.querySelectorAll( '[data-skip]' );
const volumeRange = document.querySelectorAll( '.volume-control' );

const fullScreenIcon = document.querySelector( '.fa-expand' );

//MENU

menu.addEventListener('click', () => {
    menu.classList.toggle('active');
    navigation.classList.toggle('active');
})

document.querySelectorAll( '.menu-item' ).forEach(nav => nav.addEventListener('click', () => {
menu.classList.remove('active');
navigation.classList.remove('active');
}))

//FUNCTIONS

function togglePlay() {
    if (playerVideo.paused) {
        playerVideo.play();
    } else {
        playerVideo.pause();
    }
}

function updateBtn() {
    const icon = this.paused ? '►' : '❚ ❚';
    playBtn.textContent = icon;
}

function skip() {
    playerVideo.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
    playerVideo[this.name] = this.value;
    console.log(this.value);
}

function progressTime() {
    const percent = (playerVideo.currentTime / playerVideo.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function progressResize(e) {
    const time = (e.offsetX / progress.offsetWidth) * playerVideo.duration;
    playerVideo.currentTime = time;
    console.log(e);
}

function fullScreen() {
    if (playerVideo.requestFullscreen) {
        playerVideo.requestFullscreen();
    }
}

//EVENTS

//play events
playerVideo.addEventListener('click', togglePlay);
playerVideo.addEventListener('play', updateBtn);
playerVideo.addEventListener('pause', updateBtn);
playBtn.addEventListener('click', togglePlay);

//skip event
skipButtons.forEach(button => button.addEventListener('click', skip));

//volume event
volumeRange.forEach(range => range.addEventListener('change', rangeUpdate));

//progress events
let mousedown = false;

playerVideo.addEventListener('timeupdate', progressTime);
progress.addEventListener('click', progressResize);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && progressResize(e));

//fullScreen event
fullScreenIcon.addEventListener('click', fullScreen);