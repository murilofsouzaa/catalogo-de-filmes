const urlMovies = 'https://api.themoviedb.org/3/movie/popular';
const urlMoviesGenre = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODUyYjgwZjk5NjUyYmU3MTg5M2VmZDVmZDg0Y2Q3MyIsIm5iZiI6MTc0OTk0NzYyMS4wNzUsInN1YiI6IjY4NGUxNGU1MWQ2YzRhNDc0ZWJiNGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoPKcy35MKgHv6VjJqHd5ep5Lb_mez8whECYYG2zr8I'
  }
};

async function fetchMovies() {
  try {
    const res = await fetch(urlMovies, options);
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

async function fetchMoviesGenre() {
  try {
    const res = await fetch(urlMoviesGenre, options);
    const data = await res.json();
    return data.genres;
  } catch (error) {
    console.error(error);
  }
}

async function setupMovies() {
  const movies = await fetchMovies();
  const genres = await fetchMoviesGenre();

  const genreMap = {};
  genres.forEach(genre => {
    genreMap[genre.id] = genre.name;
  });

  const moviesContainer = document.querySelector("#movies");

  movies.forEach(movie => {
    const genreNames = movie.genre_ids.map(id => genreMap[id]).join(', ');

    const div = document.createElement('div');
    div.classList.add('col-4', 'mb-4');

   div.innerHTML = `
    <div class="p-0 m-0 d-flex flex-column align-items-center text-white mb-5">
        <a href="#" class="d-block" style="width: 400px;">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top img-fluid" alt="${movie.title}" style="width: 100%;">
        </a>
        <p class="mt-2 mb-0" style="width: 400px; color:rgba(53, 53, 53, 0.84) ; text-align: left;">${genreNames}</p>
        <a href=""></a>
    </div>
    `;

    moviesContainer.appendChild(div);
  });
}

addEventListener("load", setupMovies);
