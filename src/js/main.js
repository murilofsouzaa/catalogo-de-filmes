document.addEventListener('DOMContentLoaded', () => {
  const userImg = document.querySelector('#userImg');
  const user = JSON.parse(localStorage.getItem('user'));
  const btnSignIn = document.querySelector("#btn-sign-in");


  if(user && user.userImageFile) {
    userImg.src = user.userImageFile;
    btnSignIn.textContent = `Sair`; 
  }
});

