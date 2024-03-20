const searchBtn = document.getElementById("search-btn");
let watchList = [];
const apiKey = "9b6b2dd5";

async function fetchMovieDetails(movieID) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`
  );
  return await response.json();
}

async function searchMovies(searchQuery) {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`
  );
  const data = await response.json();
  if (data.Search) {
    const moviePromises = data.Search.map((movie) =>
      fetchMovieDetails(movie.imdbID)
    );
    return Promise.all(moviePromises);
  } else {
    return []; // Return an empty array if there are no search results
  }
}

searchBtn.addEventListener("click", function () {
  const searchBox = document.getElementById("movie-search").value;
  searchMovies(searchBox).then((movieDetails) => {
    loadMovies(movieDetails);
    addToWatchList();
  });
});

function loadMovies(movies) {
  const moviesEL = document.getElementById("movies");
  moviesEL.innerHTML = "";
  movies.forEach((movie) => {
    const movieHtml = `
         <div class="flex movies-section" id="movies-section">
             <div>
                <img src="${movie.Poster}" alt="${movie.Title}" width="100" height="150">
            </div>
            <div>
                <div class="movie">
                    <h3 class="movie-title">${movie.Title}</h3>
                    <p>star</p>
                    <p class="movie-rating">${movie.imdbRating}</p>
                </div>
                <div class="movie">
                    <p class="movie-duration">${movie.Runtime}</p>
                    <p class="movie-genre">${movie.Genre}</p>
                    <a href="#" id="movie-btn" data-id=${movie.imdbID}>Watchlist</a>
                </div>
                <p class="movie movie-description">${movie.Plot}</p>
            </div>
        </div>
        `;
    moviesEL.insertAdjacentHTML("beforeend", movieHtml);
    addToWatchList(movie, movie.imdbID);
  });
}

function addToWatchList(movies, movieID) {
  const movieBtn = document.querySelectorAll("#movie-btn");

  movieBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (btn.dataset.id === movieID) {
        watchList.push(movies);
        console.log(watchList);
      }
    });
  });
}
