
/* =========================
   ELY'S LITTLE UNIVERSE
   JAVASCRIPT
========================= */

// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.textContent =
      navMenu.classList.contains("active") ? "✕" : "☰";
  });

  document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.textContent = "☰";
    });
  });
}


// FOOTER YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// =========================
// MUSIC PLAYER
// =========================

const songs = [
  {
    title: "Drop Dead",
    artist: "Olivia Rodrigo",
    file: "song1.mp3"
  },
  {
    title: "About You",
    artist: "The 1975",
    file: "song2.mp3"
  },
  {
    title: "Born to Die",
    artist: "Lana Del Rey",
    file: "song3.mp3"
  },
  {
    title: "Cinnamon Girl",
    artist: "Lana Del Rey",
    file: "song4.mp3"
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


// DISPLAY SONGS

function displaySongs() {
  if (!songList) return;

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
  if (!audio) return;

  const song = songs[currentSong];

  audio.pause();
  audio.src = song.file;
  audio.load();

  if (songTitle) songTitle.textContent = song.title;
  if (songArtist) songArtist.textContent = song.artist;

  if (playBtn) playBtn.textContent = "▶";
  if (progressBar) progressBar.value = 0;
  if (currentTime) currentTime.textContent = "0:00";
  if (duration) duration.textContent = "0:00";

  displaySongs();

  if (autoPlay) {
    playMusic();
  }
}


// PLAY MUSIC

async function playMusic() {
  if (!audio) return;

  try {
    await audio.play();
    if (playBtn) playBtn.textContent = "Ⅱ";
  } catch (error) {
    console.error("Music error:", error);
    if (playBtn) playBtn.textContent = "▶";
    alert("Musik gagal diputar. Periksa file MP3!");
  }
}


// PLAY / PAUSE

if (playBtn && audio) {
  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      playMusic();
    } else {
      audio.pause();
      playBtn.textContent = "▶";
    }
  });
}


// NEXT SONG

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(true);
  });
}


// PREVIOUS SONG

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    currentSong =
      (currentSong - 1 + songs.length) % songs.length;

    loadSong(true);
  });
}


// AUTO NEXT

if (audio) {
  audio.addEventListener("ended", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(true);
  });
}


// TIME FORMAT

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const remaining = Math.floor(seconds % 60);

  return minutes + ":" + String(remaining).padStart(2, "0");
}


// UPDATE PROGRESS

if (audio) {
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
      if (progressBar) {
        progressBar.value =
          (audio.currentTime / audio.duration) * 100;
      }

      if (currentTime) {
        currentTime.textContent = formatTime(audio.currentTime);
      }
    }
  });

  audio.addEventListener("loadedmetadata", () => {
    if (duration) {
      duration.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener("play", () => {
    if (playBtn) playBtn.textContent = "Ⅱ";
  });

  audio.addEventListener("pause", () => {
    if (playBtn) playBtn.textContent = "▶";
  });
}


// SEEK MUSIC

if (progressBar && audio) {
  progressBar.addEventListener("input", () => {
    if (audio.duration) {
      audio.currentTime =
        (progressBar.value / 100) * audio.duration;
    }
  });
}


// INITIALIZE

displaySongs();
loadSong();


// =========================
// GUESTBOOK
// =========================

const sendMessage = document.getElementById("sendMessage");
const guestName = document.getElementById("guestName");
const guestMessage = document.getElementById("guestMessage");
const messageList = document.getElementById("messageList");

if (sendMessage && guestName && guestMessage && messageList) {
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
}


// =========================
// BACK TO TOP
// =========================

const backTop = document.getElementById("backTop");

if (backTop) {
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
}
