const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#submit-search-btn");

async function fetchMovieByTitle(title) {
  try{
    const query = encodeURIComponent(title.trim());
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2852b80f99652be71893efd5fd84cd73&language=pt-BR&query=${query}`);
    const data = await res.json();
    return data.results[0];
  }catch (error) {
    console.error(error);
  }
}

async function searchMovie() {
  const searchInputValue = searchInput.value;
  if (!searchInputValue) return;

  const movie = await fetchMovieByTitle(searchInputValue);

  if (movie && movie.id) {
    window.location.href = `../../public/info/info.html?id=${movie.id}`;
  } else {
    alert("Filme não encontrado.");
  }
}

searchBtn.addEventListener('click', searchMovie);
searchInput.addEventListener('keydown', (event)=>{
  if(event.key === "Enter"){
    event.preventDefault();
    searchMovie();
  }
});
