const api_key = '2852b80f99652be71893efd5fd84cd73';

 
 function getMovieID_URL() {
      const params = new URLSearchParams(location.search);
      return params.get('id');
    }

    async function fetchMovies() {
      const api_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
      const res = await fetch(api_URL);
      const data = await res.json();
      return data.results;
    }

    async function setupMovieDetail() {
      const movies = await fetchMovies();
      const movieID = getMovieID_URL();
      const movie = movies.find(m => m.id.toString() === movieID);

      if (!movie) {
        document.getElementById("movie-detail").innerHTML = "<p>Filme não encontrado.</p>";
        return;
      }

      const container = document.getElementById("movie-detail");
      container.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-info">
          <h2>${movie.title}</h2>
          <p><strong>Nota:</strong> ${movie.vote_average}</p>
          <p><strong>Data de Lançamento:</strong> ${movie.release_date}</p>
          <p><strong>Descrição:</strong> ${movie.overview}</p>
        </div>
      `;
    }

    document.addEventListener('DOMContentLoaded', setupMovieDetail);