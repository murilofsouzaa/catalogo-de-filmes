const api_key = '2852b80f99652be71893efd5fd84cd73';
const endpoint = `https://api.themoviedb.org/3/`;

function getMovieID_URL() {
  const params = new URLSearchParams(location.search);
  return params.get('id');
}

async function fetchMovieById(movieID) {
  const movieURL = `${endpoint}movie/${movieID}?api_key=${api_key}&language=pt-BR`;
  const res = await fetch(movieURL);
  return await res.json();
}

async function fetchTrailer(movieID) {
  const trailerURL = `${endpoint}movie/${movieID}/videos?api_key=${api_key}&language=pt-BR`;
  const res = await fetch(trailerURL);
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
  const movieID = getMovieID_URL();

  if (!movieID) {
    document.getElementById("movie-detail").innerHTML = "<p>ID do filme não informado.</p>";
    return;
  }

  const movie = await fetchMovieById(movieID);
  const trailers = await fetchTrailer(movieID);
  const trailer = trailers.find(t => t.type === "Trailer" && t.site === "YouTube");
  const images = await fetchMovieImages(movieID);

  const container = document.getElementById("movie-detail");

  let imageGallery = images.slice(0, 5).map(img =>
    `<img src="https://image.tmdb.org/t/p/w500${img.file_path}" class="me-2 mb-2" style="width: 200px;">`
  ).join("");

  const trailerHTML = trailer
    ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" 
        frameborder="0" allowfullscreen loading="lazy" title="Trailer de ${movie.title}"></iframe>`
    : "<p>Trailer não disponível.</p>";

  container.innerHTML = `
    <div class="row">
      <div class="col-4">
        <h2 class="fs-1 mb-5" style="line-height:38px">${movie.title}</h2>
        <div class="d-flex flex-row">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </div>
      </div>

      <div class="col-4">
          <div class="movie-info">
            <p><span class="fw-bold">Nota:</span> ${movie.vote_average}</p>
            <p class="mt-3"><span class="fw-bold">Data de Lançamento:</span> ${movie.release_date}</p>
            <p class="mt-3"><span class="fw-bold">Descrição:</span> ${movie.overview}</p>
            <div>
              <h2 class="mt-5 mb-3">Fotos do Filme</h2>
              <div class="d-flex flex-wrap gap-2" style="width: 600px">${imageGallery}</div>
            </div>
          </div>
        </div>

          <div class="col-4 mt-5">
            <h2 class="mb-3">Trailer</h2>
            ${trailerHTML}
          </div>
      </div>
  `;
}

document.addEventListener('DOMContentLoaded', setupMovieDetail);
