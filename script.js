const getData = async () => {
  try {
    const response = await fetch("songs.json");
    const data = await response.json();

    let div = document.getElementById("div");

    let audio = document.createElement("audio");
    let currentSongIndex = 0; // Keep track of the current song index

    let songElements; // Define songElements array

    function playSelectedSong() {
      audio.pause();
      audio.currentTime = 0;
      audio.src = `KK/${decodeURIComponent(data[currentSongIndex].url)}`;
      audio.play().catch((error) => {
        console.error("Error playing audio:", error.message);
      });
    }

    function updateSongElements() {
      songElements = document.querySelectorAll(".song-list");
    }

    function filterSongs(searchTerm) {
      // Convert the searchTerm to lowercase for case-insensitive matching
      const lowercaseTerm = searchTerm.toLowerCase();

      data.forEach((item, index) => {
        const songList = songElements[index];

        if (item.title.toLowerCase().includes(lowercaseTerm)) {
          // If the song title includes the searchTerm, show the song
          songList.style.display = "";
        } else {
          // Otherwise, hide the song
          songList.style.display = "none";
        }
      });
    }

    data.forEach((item, index) => {
      const li = document.createElement("li");
      const songList = div.appendChild(li);
      songList.className = "song-list";
      songList.textContent = `${item.title}`;

      const playButton = document.createElement("button");
      playButton.textContent = "Play";
      playButton.className = "play";
      songList.appendChild(playButton);

      playButton.addEventListener("click", () => {
        currentSongIndex = index;
        playSelectedSong();
      });
    });

    updateSongElements();

    const nextButton = document.querySelector(".next-btn");
    const prevButton = document.querySelector(".previous-btn");
    const pauseButton = document.querySelector(".pause-btn");

    nextButton.addEventListener("click", () => {
      if (currentSongIndex < data.length - 1) {
        let currentSongElement = songElements[currentSongIndex];
        if (currentSongElement) {
          currentSongElement.style.backgroundColor = "";
        }

        currentSongIndex++;
        playSelectedSong();
        updateSongElements();

        let nextSongElement = songElements[currentSongIndex];
        if (nextSongElement) {
          nextSongElement.style.backgroundColor = "red";
          div.scrollTop = nextSongElement.offsetTop - div.offsetTop;
        }
      }
    });

    prevButton.addEventListener("click", () => {
      if (currentSongIndex > 0) {
        let currentSongElement = songElements[currentSongIndex];
        if (currentSongElement) {
          currentSongElement.style.backgroundColor = "";
        }

        currentSongIndex--;
        playSelectedSong();
        updateSongElements();

        let prevSongElement = songElements[currentSongIndex];
        if (prevSongElement) {
          prevSongElement.style.backgroundColor = "blue";
          div.scrollTop = prevSongElement.offsetTop - div.offsetTop;
        }
      }
    });

    pauseButton.addEventListener("click", () => {
      audio.pause();
      let currentSongElement = songElements[currentSongIndex];
      if (currentSongElement) {
        div.scrollTop = currentSongElement.offsetTop - div.offsetTop;
      }

      let inp = document.getElementById("inp");
    });

    inp.addEventListener("input", (e) => {
      const searchTerm = e.target.value;
      filterSongs(searchTerm);
    });

    div.appendChild(audio);

    const btn = document.getElementById("btn");

    btn.addEventListener("click", () => {
      console.log("working");
      const songLists = document.querySelectorAll(".song-list");
      songLists.forEach((songList) => {
        songList.style.display =
          songList.style.display === "none" ? "" : "none";
      });
      div.style.backgroundColor = "black";
      div.style.color = "white";
    });
  } catch (err) {
    console.log(`error in fetching data: ${err}`);
  }
};

getData();
