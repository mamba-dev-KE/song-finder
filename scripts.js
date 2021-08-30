let searchTerm = "";
const songContainer = document.getElementById("songs");

// search for songs from different artists
const updateSearchTerm = () => {
	searchTerm = document.getElementById("search").value;
	if (!searchTerm || searchTerm === "") {
		alert("input a search string");
	} else {
		//check if songcontainer has child elements
		while (songContainer.firstChild) {
			songContainer.removeChild(songContainer.firstChild);
		}
		//fetch songs from iTunes search API
		const url = `https://itunes.apple.com/search?media=music&limit=20&term=${searchTerm}`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				console.log(data.results);
				const artists = data.results;
				return artists.map((result) => {
					// declaring variables that hold created HTML elements
					const article = document.createElement("article"),
						song = document.createElement("h2"),
						artist = document.createElement("p"),
						img = document.createElement("img"),
						audio = document.createElement("audio"),
						audioSource = document.createElement("source");

					// setting declared variables to data derived from API
					artist.innerHTML = result.artistName;
					song.innerHTML = result.trackName;
					img.src = result.artworkUrl100;
					audioSource.src = result.previewUrl;
					audio.setAttribute("controls", "");

					//appending created elements as children of the html article
					article.appendChild(song);
					article.appendChild(artist);
					article.appendChild(img);
					article.appendChild(audio);
					audio.appendChild(audioSource);
					songContainer.appendChild(article);
				});
			})
			.catch((error) => {
				console.log("Request failed: ", error);
			});
	}
};

//event listener for a search event on button
const searchBtn = document.querySelector("button");
searchBtn.addEventListener("click", updateSearchTerm);
