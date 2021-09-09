window.onload = function() {

  let params = new URLSearchParams(document.location.search.substring(1));
  alert(params);
  //disc.play(params.get("id"));
 

}



// variables qui visent les différents éléments html

const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const albumName = document.getElementById('albumName');

const back = document.querySelector('#back');

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
    
    title: 'What the phoque /',
    albumName: 'Galaxy worms',
    coverPath: './assets/images/mermaid.jpg',
    discPath: './assets/music/bensound-deepblue.mp3',
    duration: '04:48',
  },
  {
    title: 'Pony tale /',
    albumName: 'Hiiii',
    coverPath: './assets/images/pony.jpg',
    discPath: './assets/music/bensound-moose.mp3',
    duration: '02:40',
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


//function of back arrow

function backAlbum() {
  location.href = "./album.html";

}



// the surprise hidden inside the timer (un easter egg clin d'oeil à la série M. Robot)
function easterEgg(){
  title.textContent = 'Mr Robot'; 
  albumName.textContent = 'Surprise !';
  duration.textContent = 'I hacked you';
  cover.src = './assets/images/surprise.jpg';
  disc.src = './assets/music/newbrave.mp3';
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

//loop (événement click pour lancer le repeat d'un morceau de musique)
looping.addEventListener('click', loopSong);

//back arrow to return in the tracks section (petite flèche de retour en arrière)
back.addEventListener('click', backAlbum);

// Little surprise stocked inside the timer when clicked (l'easter egg stocké dans le timer ;-)
timer.addEventListener('click', easterEgg);









///////////////////////////////////////:::The Fetch !



fetch('http://api-music.test/api/albums/156', { // fetch(newloc,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MzExMDkwMzQsImV4cCI6MTYzMTcxMzgzNCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiZGVtb0BkZW1vLmNvbSJ9.BYWMaT6CsdDU2LeRjxw74ignWHwlPVKWPVb-ujNHto5LPjvuf3fJ2wjSnm50H4zg_wDnsc7VueyIT_F8kuuTbj6QKicq0yMwCwcMfXin6kFbDnD0ZewcgOzsgLTNglAGxWVhhtAxnrFtbQhcoxWc59Ziqc9mGsTDmw-qn0rQMBSCWARlBCEfkAKE1KuZvMwN8Iotkj5bnGt0956VEMKpW7lfVWsfda-jFmhpRact2I3WivcPPc0eRDJYyltFW7WtmJfH35ssYKzf6-UJsB6YErqWifXu61lVUoyK45_wCBNQQ650FtGaAVTY3jTnGVAsPvmglGHEStdHEAC2ZQYnhzeknoFqFIr52E42NtufSsfDkEMWMqzZytUDUIKHwDJu6fCwM8qkaVAscGuMlonIS39H_U1kyPNW7CYH5q3-noHG9nKhoD1L7fL4TLO1VBtbuRmCpBve_bXDM5TocSeNbU8z0YtlkPXDOCMXSpFUFXakh3G4ljdfiiWz-ANl6Yk5yfLPbfwHiMhjG-jbDqTmL18A6lrCJq2XLGiGuXrXBzzMWX3qArj5K-KWrWvqaDNuZdkV2Bixx7wDbRzmoui9PUY_sh5e1gHUhk4YJaOifWoK_eWNEORFSfWxuKHO67NlgA1kJLXejHLiKs2fljl5Nf-f-4B8y2T5HoR1JgG9H2Q'
  }
})
  .then(response => response.json())
  .then(coverAlbum => {
    //console.log(coverAlbum);
    cover.src = coverAlbum.picture;
    title.textContent = coverAlbum.name;
    albumName.textContent = "";
    
    songs.push(coverAlbum);
    

  })
  .catch(e => console.log(e));

  



/*

//first page  (start from) :

function getLocation() {
  
          var loc = url.search; 
          localStorage.getItem = loc;
        }


// second page (landing on the player) :

        function changeLocation() {
  
            // Change current location
            var newloc = new URL "http://127.0.0.1:5500/album.html";
           
            window.location.href = localStorage.loc;
        }
 */

      

  
  