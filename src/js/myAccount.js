const usernameText = document.querySelector("#usernameText");

function getUserInfo() {
  const users = JSON.parse(localStorage.getItem('users'));
  return users || [];
}

function usernameTitle(){
    getUserInfo();
    const userLogged = JSON.parse(localStorage.getItem('user'));
    document.title = `${userLogged.username}`;
}


async function fetchFavoritesMovies(){

}
async function fetchMoviesSaved() {
    
}

document.addEventListener('DOMContentLoaded', ()=>{
    usernameTitle();
})
