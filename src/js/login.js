const btnSignIn = document.querySelector("#btn-sign-in");
const mainContainer = document.querySelector('.main-container');
const close_btn = document.querySelector("#close-popup");
const loginPopUp = document.querySelector("#login-popup")
const body = document.querySelector('body');

function setupLoginPopUp() {
  const overlay = document.createElement('div');
  loginPopUp.classList.remove('hidden');
  mainContainer.classList.add('body-active');

  document.body.appendChild(overlay);
}

close_btn.addEventListener('click', () =>{
    loginPopUp.classList.add('hidden');
    mainContainer.classList.remove('body-active');
})

btnSignIn.addEventListener("click", setupLoginPopUp);

