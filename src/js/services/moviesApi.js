const api_key = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODUyYjgwZjk5NjUyYmU3MTg5M2VmZDVmZDg0Y2Q3MyIsIm5iZiI6MTc0OTk0NzYyMS4wNzUsInN1YiI6IjY4NGUxNGU1MWQ2YzRhNDc0ZWJiNGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoPKcy35MKgHv6VjJqHd5ep5Lb_mez8whECYYG2zr8I';

const urlMovies = 'https://api.themoviedb.org/3/movie/popular';
const urlMoviesGenre = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR';
const urlUpcomingMovies = 'https://api.themoviedb.org/3/movie/upcoming';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: api_key
  }
};

const moviesContainer = document.querySelector("#movies");

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

async function fetchMoviesUpcoming() {
  try {
    const res = await fetch(urlUpcomingMovies, options);
    const data = await res.json();
    return data.results;
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

  movies.forEach(movie => {
    const genreNames = movie.genre_ids.map(id => genreMap[id]).join(', ');

    const div = document.createElement('div');
    div.classList.add('col-4', 'mb-4');

   div.innerHTML = `
    <div class=" p-0 m-0 d-flex flex-column align-items-center text-white mb-5">
        <a href="../info/info.html?id=${movie.id}" class="d-block" style="width: 400px;">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="blur card-img-top img-fluid" alt="${movie.title}" style="width: 100%;">
        </a>
        <p class="mt-2 mb-0" style="width: 400px; color:rgba(53, 53, 53, 0.84) ; text-align: left;">Gênero: ${genreNames}</p>
    </div>
    `;

    moviesContainer.appendChild(div);
  });
}

async function setupCarousel() {
  const carouselContainer = document.querySelector("#highlights");
  const movies = await fetchMoviesUpcoming();

  carouselContainer.innerHTML = `
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner"></div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;

  const carouselInner = carouselContainer.querySelector(".carousel-inner");

  movies.forEach((movie, index) => {
    const div = document.createElement("div");
    div.classList.add("carousel-item");
    if (index === 0) div.classList.add("active");

    div.innerHTML = `
      <a href="#">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="d-block w-100" alt="${movie.title}">
      </a>
    `;

    carouselInner.appendChild(div);
  });
}

addEventListener("load", setupMovies);
addEventListener("load", setupCarousel);
