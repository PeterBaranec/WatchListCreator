const allKeys = Object.keys(localStorage);
const movieArr = [];
console.log(movieArr);
console.log(allKeys);

function renderWatchList(movies) {
  allKeys.map((key) => {
    const movie = localStorage.getItem(key);
    movieArr.push(JSON.parse(movie));
    loadMovies(movies);
  });
}

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
                    <a href="#" id="movie-btn" data-id=${movie.imdbID}>Remove</a>
                </div>
                <p class="movie movie-description">${movie.Plot}</p>
            </div>
        </div>
        `;
    moviesEL.insertAdjacentHTML("beforeend", movieHtml);
    removeItemFromLocalStorage(movie.imdbID);
  });
}

function removeItemFromLocalStorage(movieID) {
  const movieBtn = document.querySelectorAll("#movie-btn");
  movieBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (btn.dataset.id === movieID) {
        localStorage.removeItem(movieID);

        const movieEL = btn.closest(".movies-section");
        movieEL.remove();
      }
    });
  });
}

renderWatchList(movieArr);
