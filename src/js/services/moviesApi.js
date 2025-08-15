const urlMovies = `https://api.themoviedb.org/3/movie/popular?language=pt-BR`;
const urlMoviesGenre = `https://api.themoviedb.org/3/genre/movie/list?language=pt-BR`;
const urlUpcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?language=pt-BR`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODUyYjgwZjk5NjUyYmU3MTg5M2VmZDVmZDg0Y2Q3MyIsIm5iZiI6MTc0OTk0NzYyMS4wNzUsInN1YiI6IjY4NGUxNGU1MWQ2YzRhNDc0ZWJiNGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoPKcy35MKgHv6VjJqHd5ep5Lb_mez8whECYYG2zr8I'
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

  moviesContainer.innerHTML = ''; 

  movies.forEach(movie => {
    const genreNames = movie.genre_ids.map(id => genreMap[id]).join(', ');

    const div = document.createElement('div');
    div.classList.add('col-sm-6', 'col-md-4', 'mb-4');

    div.innerHTML = `
      <div class="p-0 m-0 d-flex flex-column align-items-center text-white mb-5 w-100 position-relative">
        <a href="../info/info.html?id=${movie.id}" class="d-block w-100">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="card-img-top img-fluid blur" />
        </a>
        <p class="mt-2 mb-0 w-100" style="color:rgba(53, 53, 53, 0.84); text-align: left;">
          Gênero: ${genreNames}
        </p>
      </div>
    `;

    // Cria botão de salvar
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Salvar';
    saveBtn.className = 'btn btn-outline-secondary btn-sm mt-2';
    saveBtn.style.position = 'absolute';
    saveBtn.style.top = '8px';
    saveBtn.style.left = '8px';

    // Estado inicial do botão
    let savedMovies = JSON.parse(localStorage.getItem('savedMovies') || '[]');
    if (savedMovies.includes(movie.id)) {
      saveBtn.style.background = '#ffe066';
      saveBtn.textContent = 'Salvo';
    }

    saveBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      let saved = JSON.parse(localStorage.getItem('savedMovies') || '[]');
      if (saved.includes(movie.id)) {
        saved = saved.filter(id => id !== movie.id);
        saveBtn.style.background = '';
        saveBtn.textContent = 'Salvar';
      } else {
        saved.push(movie.id);
        saveBtn.style.background = '#ffe066';
        saveBtn.textContent = 'Salvo';
      }
      localStorage.setItem('savedMovies', JSON.stringify(saved));
    });

    div.querySelector('div').appendChild(saveBtn);

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
      <a href="../info/info.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="d-block img-fluid" alt="${movie.title}">
      </a>
    `;
    carouselInner.appendChild(div);
  });
}

function showToast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText = "position:fixed;bottom:20px;right:20px;background:#333;color:#fff;padding:10px 18px;border-radius:6px;z-index:9999;opacity:0.95;";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

addEventListener("load", () => {
  setupMovies();
  setupCarousel();
});
