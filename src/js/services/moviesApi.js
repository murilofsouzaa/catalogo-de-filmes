const api_key = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODUyYjgwZjk5NjUyYmU3MTg5M2VmZDVmZDg0Y2Q3MyIsIm5iZiI6MTc0OTk0NzYyMS4wNzUsInN1YiI6IjY4NGUxNGU1MWQ2YzRhNDc0ZWJiNGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoPKcy35MKgHv6VjJqHd5ep5Lb_mez8whECYYG2zr8I';
const urlMovies = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR';
const urlMoviesGenre = 'https://api.themoviedb.org/3/genre/movie/list?language=pt-BR';
const urlUpcomingMovies = 'https://api.themoviedb.org/3/movie/upcoming?language=pt-BR';

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

function getColumnClass() {
  const width = window.innerWidth;
  
  if (width < 576) {
    return 'col-12'; 
  } else if (width < 768) {
    return 'col-6'; 
  } else if (width < 992) {
    return 'col-4'; 
  } else {
    return 'col-4'; 
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
    div.classList.add(getColumnClass(), 'mb-4');
    div.innerHTML = `
      <div class="movie-card p-0 m-0 d-flex flex-column align-items-center text-white mb-5">
        <a href="../info/info.html?id=${movie.id}" class="d-block">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
               class="blur card-img-top img-fluid" 
               alt="${movie.title}">
        </a>
        <p class="mt-2 mb-0">Gênero: ${genreNames}</p>
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
      <a href="../info/info.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" 
             class="d-block" 
             alt="${movie.title}">
      </a>
    `;
    carouselInner.appendChild(div);
  });
}

function handleResize() {

  clearTimeout(window.resizeTimeout);
  window.resizeTimeout = setTimeout(() => {
    setupMovies(); 
  }, 250);
}

function setupLoginPopup() {
  const loginPopup = document.getElementById('login-popup');
  const btnSignIn = document.getElementById('btn-sign-in');
  const closePopup = document.getElementById('close-popup');
  const submitLogin = document.getElementById('submit-login');

  if (btnSignIn) {
    btnSignIn.addEventListener('click', () => {
      loginPopup.classList.remove('hidden');
    });
  }

  if (closePopup) {
    closePopup.addEventListener('click', () => {
      loginPopup.classList.add('hidden');
    });
  }

  if (loginPopup) {
    loginPopup.addEventListener('click', (e) => {
      if (e.target === loginPopup) {
        loginPopup.classList.add('hidden');
      }
    });
  }

  if (submitLogin) {
    submitLogin.addEventListener('click', () => {
      const email = document.getElementById('userEmail').value;
      const password = document.getElementById('userPassword').value;
      
      if (email && password) {
        alert('Login realizado com sucesso!');
        loginPopup.classList.add('hidden');
      } else {
        alert('Por favor, preencha todos os campos.');
      }
    });
  }
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('submit-search-btn');

  if (searchBtn) {
    searchBtn.addEventListener('click', performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      console.log('Buscando por:', query);
    }
  }
}

addEventListener("load", () => {
  setupMovies();
  setupCarousel();
  setupLoginPopup();
  setupSearch();
});

addEventListener("resize", handleResize);

document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if ('loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy';
    }
  });
});