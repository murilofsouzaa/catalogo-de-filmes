const btnSignIn = document.querySelector("#btn-sign-in");
const mainContainer = document.querySelector('.main-container');
const close_btn = document.querySelector("#close-popup");
const loginPopUp = document.querySelector("#login-popup");
const body = document.querySelector('body');
const submitLoginBtn = document.querySelector("#submit-login");

const userEmailInput = document.querySelector("#userEmail");
const userPasswordInput = document.querySelector("#userPassword");

function setupLoginPopUp() {
  const overlay = document.createElement('div');
  loginPopUp.classList.remove('hidden');
  mainContainer.classList.add('body-active');
  document.body.appendChild(overlay);
}

function setUserInfo(event) {
  event.preventDefault();
  const user = {
    email: userEmailInput.value,
    password: userPasswordInput.value
  };
  localStorage.setItem('user', JSON.stringify(user));
}

function getUserInfo() {
  const userString = localStorage.getItem('user');
  return JSON.parse(userString);
}

close_btn.addEventListener('click', () => {
  loginPopUp.classList.add('hidden');
  mainContainer.classList.remove('body-active');
});

btnSignIn.addEventListener("click", setupLoginPopUp);
submitLoginBtn.addEventListener('click', setUserInfo);
