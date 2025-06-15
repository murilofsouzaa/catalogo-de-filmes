const url = 'https://api.themoviedb.org/3/movie/popular';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODUyYjgwZjk5NjUyYmU3MTg5M2VmZDVmZDg0Y2Q3MyIsIm5iZiI6MTc0OTk0NzYyMS4wNzUsInN1YiI6IjY4NGUxNGU1MWQ2YzRhNDc0ZWJiNGRjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eoPKcy35MKgHv6VjJqHd5ep5Lb_mez8whECYYG2zr8I'
  }
};

async function fetchMovies(){
    try{
        const res = await fetch(url, options);
        const data = await res.json();
        return data.results;
    }

    catch(error){
        console.error(error);
        }
}

async function setupMovies(){

    const movies = await fetchMovies();
    const moviesContainer = document.querySelector("#movies");
    
    movies.forEach(movie => {
        const div = document.createElement('div');

        div.innerHTML = `
            <div class="card col-md-4" style="width: 18rem;">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.overview}</p>
                <a href="https://www.themoviedb.org/movie/${movie.id}" target="_blank" class="btn btn-primary">Saiba Mais</a>
            </div>
            </div>
        `
        moviesContainer.appendChild(div);
    });
}

window.setupMovies = setupMovies;
