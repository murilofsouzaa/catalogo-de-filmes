const usernameText = document.querySelector("#usernameText");

function getUserInfo() {
  const users = JSON.parse(localStorage.getItem('users'));
  return users || [];
}

function usernameTitle(){
    const userLogged = JSON.parse(localStorage.getItem('user'));
    document.title = `${userLogged.username}`;
}

async function fetchFavoritedMovies(favoritedID) {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${favoritedID}?api_key=2852b80f99652be71893efd5fd84cd73&language=pt-BR`);
    const data = await res.json();
    return data;

  }catch (error) {
    console.error(error);
  }
}

async function fetchSavedMoviesID(savedID) {
  try{
    const res = await fetch(`https://api.themoviedb.org/3/movie/${savedID}?api_key=2852b80f99652be71893efd5fd84cd73&language=pt-BR`);
    const data = await res.json();
    return data;
  }catch (error) {
    console.error(error);
  } 
}

function getFavoritesMoviesID(){
    const favoritedMovies = JSON.parse(localStorage.getItem('favorites'));
    return favoritedMovies;
}

function getMoviesSavedID() {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    return savedMovies;
}



async function setupFavoritedMovies(){
    const savedListID = getFavoritesMoviesID();
    const favoriteContainer = document.querySelector("#favorited-movies");
    
    for (const movieID of savedListID){
      const movie = await fetchFavoritedMovies(movieID);
      const favoriteMovieCard = document.createElement('div');
      
      favoriteMovieCard.innerHTML = `
      <div class="p-0 m-0 d-flex align-items-center text-white mb-5 w-100">
        <a href="../info/info.html?id=${movie.id}" class="d-block">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="card-img-top img-fluid blur" />
        </a>
      </div>
      `;

      favoriteContainer.appendChild(favoriteMovieCard);
      }
}

async function setupSavedMovies(){
    const savedListID = getMoviesSavedID();
    const savedMovieContainer = document.querySelector("#saved-movies");

    for (const movieID of savedListID){
      const movie = await fetchFavoritedMovies(movieID);
      const favoriteMovieCard = document.createElement('div');
      
      favoriteMovieCard.innerHTML = `
      <div class="p-0 m-0 d-flex align-items-center text-white mb-5 w-100">
        <a href="../info/info.html?id=${movie.id}" class="d-block">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="card-img-top img-fluid blur" />
        </a>
      </div>
      `;

      savedMovieContainer.appendChild(favoriteMovieCard);
      }
}

document.addEventListener('DOMContentLoaded', ()=>{
    usernameTitle();
    setupFavoritedMovies();
    setupSavedMovies();

})
