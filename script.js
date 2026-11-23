
/* =========================
   ELY'S LITTLE UNIVERSE
   JAVASCRIPT
========================= */

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  menuToggle.textContent =
    navMenu.classList.contains("active") ? "✕" : "☰";
});

// CLOSE MENU AFTER CLICK

document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    menuToggle.textContent = "☰";
  });
});

// FOOTER YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();


// =========================
// MUSIC PLAYER
// =========================

// TAMBAHKAN LAGU KAMU DI BAGIAN INI

const songs = [
  {
    title: "Drop dead",
    artist: "Olivia Rodrigo",
    file: "music/song1.mp3"
  },
  {
    title: "About You",
    artist: "The 1975",
    file: "music/song2.mp3"
  },
  {
    title: "Born to die",
    artist: "Lana del rey",
    file: "music/song3.mp3"
  },
  {
    title: "Cinnamon Girl",
    artist: "Lana del rey",
    file: "music/song4.mp3"
  }
];

const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextSong");
const prevBtn = document.getElementById("prevSong");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const songList = document.getElementById("songList");

const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

let currentSong = 0;

// DISPLAY SONG LIST

function displaySongs() {
  songList.innerHTML = "";

  songs.forEach((song, index) => {
    const item = document.createElement("div");

    item.className =
      "song-item" + (index === currentSong ? " active" : "");

    const title = document.createElement("strong");
    title.textContent = "♫ " + song.title;

    const artist = document.createElement("span");
    artist.textContent = song.artist;

    item.append(title, artist);

    item.addEventListener("click", () => {
      currentSong = index;
      loadSong(true);
    });

    songList.appendChild(item);
  });
}

// LOAD SONG

function loadSong(autoPlay = false) {
  const song = songs[currentSong];

  audio.src = song.file;

  songTitle.textContent = song.title;
  songArtist.textContent = song.artist;

  playBtn.textContent = "▶";

  displaySongs();

  if (autoPlay) {
    playMusic();
  }
}

// PLAY MUSIC

function playMusic() {
  if (!audio.src) {
    loadSong();
  }

  audio.play()
    .then(() => {
      playBtn.textContent = "❚❚";
    })
    .catch(() => {
      playBtn.textContent = "▶";
      alert("Musik belum bisa diputar. Periksa file MP3 kamu ya!");
    });
}

// PAUSE / PLAY BUTTON

playBtn.addEventListener("click", () => {
  if (audio.paused) {
    playMusic();
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});

// NEXT SONG

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(true);
});

// PREVIOUS SONG

prevBtn.addEventListener("click", () => {
  currentSong =
    (currentSong - 1 + songs.length) % songs.length;

  loadSong(true);
});

// AUTO NEXT SONG

audio.addEventListener("ended", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(true);
});

// TIME FORMAT

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return minutes + ":" + String(remaining).padStart(2, "0");
}

// UPDATE PROGRESS

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progressBar.value =
      (audio.currentTime / audio.duration) * 100;

    currentTime.textContent =
      formatTime(audio.currentTime);

    duration.textContent =
      formatTime(audio.duration);
  }
});

// SEEK MUSIC

progressBar.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime =
      (progressBar.value / 100) * audio.duration;
  }
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

displaySongs();
loadSong();


// =========================
// GUESTBOOK
// =========================

const sendMessage =
  document.getElementById("sendMessage");

const guestName =
  document.getElementById("guestName");

const guestMessage =
  document.getElementById("guestMessage");

const messageList =
  document.getElementById("messageList");

sendMessage.addEventListener("click", () => {

  const name = guestName.value.trim();
  const message = guestMessage.value.trim();

  if (!name || !message) {
    alert("Isi nama dan pesan kamu dulu ya! ♡");
    return;
  }

  const card = document.createElement("div");
  card.className = "guest-message";

  const author = document.createElement("strong");
  author.textContent = "♡ " + name;

  const content = document.createElement("p");
  content.textContent = message;

  card.append(author, content);
  messageList.prepend(card);

  guestName.value = "";
  guestMessage.value = "";

  alert("Your message has been added! Thank you ♡");
});


// =========================
// BACK TO TOP
// =========================

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
