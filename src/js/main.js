const api_key = '2852b80f99652be71893efd5fd84cd73';

const submitBtn = document.querySelector("#submit-search-btn");

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

async function searchMovie(){
    const searchInput = document.querySelector("#search-input");
    const search = searchInput.value;
    const movies = fetchMovies();

    const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchValue)
  );  
    
    if(!filteredMovies){

    }else{
        window.location.href = `../../public/info/info.html?${filteredMovies.id}`;
    }
}

submitBtn.addEventListener('click', searchMovie);


