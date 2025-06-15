const api_key = '2852b80f99652be71893efd5fd84cd73';

 function getMovieID_URL() {
      const params = new URLSearchParams(location.search);
      return params.get('id');
    }

    async function fetchMovies() {
      const api_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR`;
      const res = await fetch(api_URL);
      const data = await res.json();
      return data.results;
    }

    async function fetchMovieImages(movieID) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/images`, {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODUyYjgwZjk5NjUyYmU3MTg5M2VmZDVmZDg0Y2Q3MyIsIm5iZiI6MTc0OTk0NzYyMS4wNzUsInN1YiI6IjY4NGUxNGU1MWQ2YzRhNDc0ZWJiNGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoPKcy35MKgHv6VjJqHd5ep5Lb_mez8whECYYG2zr8I'
      }
    });
    const data = await res.json();
    return data.backdrops;
  }

  async function setupMovieDetail() {
    const movies = await fetchMovies();
    const movieID = getMovieID_URL();
    const movie = movies.find(m => m.id.toString() === movieID);

    if (!movie) {
      document.getElementById("movie-detail").innerHTML = "<p>Filme não encontrado.</p>";
      return;
    }

    const images = await fetchMovieImages(movieID);

    const container = document.getElementById("movie-detail");

    let imageGallery = images.slice(0, 5).map(img =>
      `<img src="https://image.tmdb.org/t/p/w500${img.file_path}" class="me-2 mb-2" style="width: 200px;">`
    ).join("");

    container.innerHTML = `
      <h2 class="fs-1 mb-5">${movie.title}</h2>
      <div class="d-flex flex-row">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-info mx-5">
          <p><span class="fw-bold">Nota:</span> ${movie.vote_average}</p>
          <p class="mt-3"><span class="fw-bold">Data de Lançamento:</span> ${movie.release_date}</p>
          <p class="mt-3"><span class="fw-bold">Descrição:</span> ${movie.overview}</p>
          <div>
            <h2 class="mt-5 mb-3">Fotos do Filme</h2>
            <div class="d-flex flex-wrap" style="width: 600px">${imageGallery}</div>
          </div>
        </div>
      </div>
    `;
  }



    document.addEventListener('DOMContentLoaded', setupMovieDetail);