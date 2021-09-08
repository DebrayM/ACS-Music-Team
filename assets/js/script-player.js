// variables qui visent les différents éléments html

const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const albumName = document.getElementById('albumName');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const timer = document.getElementById('timer');
const duration = document.getElementById('duration');

const prev = document.querySelector('#backward');
const play = document.getElementById('play');
const pause = document.querySelector('#pause');
const next = document.querySelector('#forward');
const shuffle = document.querySelector('#shuffle');
const looping = document.querySelector('#repeat');


let songIndex = 0;  //index initial

// Songs info (tableau d'objets avec les values)
const songs = [

  {
    
    title: 'Zen Garden /',
    albumName: 'Calm & Serenity',
    coverPath: './assets/images/zengarden.jpg',
    discPath: './assets/music/zengarden.mp3',
    duration: '0:30',
  },
  {
    
    title: 'Venus & the Gang /',
    albumName: 'Galaxy worms',
    coverPath: './assets/images/cover2.jpg',
    discPath: './assets/music/music2.mp3',
    duration: '2:22',
  },
  {
    title: 'What the phoque /',
    albumName: 'Seal me',
    coverPath: './assets/images/cover3.jpg',
    discPath: './assets/music/music3.mp3',
    duration: '1:54',
  },
];


// Load song initially (initialisation de départ du tableau de musiques)
loadSong(songs[songIndex]);




// Load the given song (chargement du morceau de musique de base)
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  albumName.textContent = song.albumName;
  duration.textContent = song.duration;
}

// Toggle play and pause (fonction initiale des boutons play et pause)
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}



// Update icon (actualisation des icônes boutons play et pause)
function updatePlayPauseIcon() {
  if (disc.paused) {
    pause.style.display = "none"; //quand le morceau est en pause, on affiche l'icône play et on cache l'icône pause
    play.style.display = "block";
  } else {
    play.style.display = "none"; //quand le morceau se joue (play), on affiche l'icône pause et on cache l'icône play
    pause.style.display = "block";
  }
}




// Update progress bar (bar de progression avec un width qui change en pourcentage, selon le temps donné et qui le display dans la section duration)
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress (bar de progression qui se réinitialise complètement (lorsque l'on lance un autre morceau)
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song (fonction qui lance le morceau précédent)
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
    disc.play(); //autoplay dés que l'on passe sur le morceau précédent
  }

  const isDiscPlayingNow = !disc.paused; //réinitialise la progression et relance un autre morceau
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
    
  }
}

// Go to next song (idem que la fonction du morceau précédent mais cette fois pour le morceau suivant)
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
    disc.play(); //autoplay dés qu'on passe sur le morceau suivant
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar (permet de faire évoluer la barre de progression en cliquant dessus sur l'axe horizontal (offsetX))
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}


//shuffle (random des msorceaux de musique)
function shuffleSongs() {

  let randomSongs = songs[Math.floor(Math.random() * songs.length)]; //randoming
  title.textContent = randomSongs.title; //récupération de toutes les valeurs des objets (musique + image + titres) et redisplay
  albumName.textContent = randomSongs.albumName;
  cover.src = randomSongs.coverPath;
  disc.src = randomSongs.discPath;
  disc.play(); //autoplay dés qu'on randomise un morceau de musique

}


 //Loop audio (relance le même morceau en resetant la barre de progression et en lançant un autoplay (se play directement sans appuyer sur le bouton play))
 function loopSong() {
  progress.style.width = 0 + '%';
  disc.load();
  disc.play();
}
  

//////////////////////////////////Les divers événements sur les boutons

// Play/Pause when play button clicked (événements sur boutons play et pause)
play.addEventListener('click', playPauseMedia);
pause.addEventListener('click', playPauseMedia);

// Various events on disc (les événements relatifs aux fichiers audio)
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked (événement bouton pour morceau suivant)
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked (événement bouton pour morceau précédent)
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song (événement click sur la barre de progression pour se balader manuellement dan sle morceau de musique)
progressContainer.addEventListener('click', setProgress);

//shuffle (événement click pour lancer le shuffle/random des morceaux de musique)
shuffle.addEventListener('click', shuffleSongs);

//loop (événement click pur lancer le repeat d'un morceau de musique)
looping.addEventListener('click', loopSong);









///////////////////////////////////////:::The Fetch !


fetch('http://api-music.test/api/albums/156', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzExMDEyMjAsImV4cCI6MTYzMTEwNDgyMCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZGVtb0BkZW1vLmNvbSJ9.pP31mRhm0UmVWsPXMlaYfW1MeZ8FEGZeavx1vz3Q5o1OjC2aaYRw3E7EiGOz0EiYHP3GmmpqNJUm0SRFftwgWpmDPsJsyIZw64ZTpYD8fuM21riuF3ensuT35JQWPiIIW5T70EsBm5gdplgomiMmoFwVvPhQnMrjZMm-6En_AQk6kSuUmmo6uS19hvOUjQ8tZ8eupR-5VK69ZxcPX4lVsnMTnALhx8PAgEUs63W12q7FQcBdXJ61vzcGcoyHj6hL1oLM2tsqjmDXXZqtZ3T4S7H0pmUJjhco9sScKy_4qvsAOr_73ANos3AHzUfN_MgrryaW4bF7CQh4a5O1mcyLI3seYlHT0_mdr53UJsVGqql-epiYWLqtHvtMgpP8QHCk_WF5AUN7Q17zUV6C7PPpSv0pK3SgtvHuf6JDukOs3p9J7TD6jigilnKF7vYDnHhx_kKeltbDpQegFqWA5olisM15CVJYJ7PTg-1DBvteWK6BHGNxgY4NzC55tVaKgr2oLalzWgCGQhZJCZjD_vxJOSalJ81ks3Hh8fSKyUTpqBXnUOHhTd7mrH3ZfMxDYIa7gAatS4E4Mx9NXj9fPS8aaYhCYHA1Yamsgm7o7HXoUj6jAdyPJ2O8g1N1Zoz_XGIKuXavCn_zYWNUr1Bjgu7DUP9dnLNbmUeaY47IcUR3FJM'
  }
})
  .then(response => response.json())
  .then(coverAlbum => {
    //console.log(coverAlbum);
    cover.src = coverAlbum.picture;
    title.textContent = coverAlbum.name;
    albumName.textContent = coverAlbum.artist;
    songs.push(coverAlbum);
    

  })
  .catch(e => console.log(e));