const btnSignIn = document.querySelector("#btn-sign-in");
const mainContainer = document.querySelector('.main-container');
const close_btn = document.querySelector("#close-popup");
const loginPopUp = document.querySelector("#login-popup");
const body = document.querySelector('body');
const submitLoginBtn = document.querySelector("#submit-login");

const userEmailInput = document.querySelector("#userEmail");
const userPasswordInput = document.querySelector("#userPassword");

let overlay; 

function setupLoginPopUp() {
  overlay = document.createElement('div');
  overlay.classList.add('overlay');
  loginPopUp.classList.remove('hidden');
  mainContainer.classList.add('body-active');
  document.body.appendChild(overlay);
}

function closePopup(){
    loginPopUp.classList.add('hidden');
    mainContainer.classList.remove('body-active');
}

function getUserInfo() {
  const userString = localStorage.getItem('user');
  return userString ? JSON.parse(userString) : null;
}

function login(event) {
  event.preventDefault();

  const user = {
    email: userEmailInput.value,
    password: userPasswordInput.value
  };

  const existingUser = getUserInfo();

  if(userEmailInput.value !== null && userEmailInput.value.trim() !== ""){
    if (!existingUser || existingUser.email !== user.email) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      userEmailInput.classList.add('exist');
      userEmailInput.value = "";
      userPasswordInput.value = "";
      userEmailInput.placeholder = `Esse email já está sendo utilizado`;
    }
  }else{
    userEmailInput.placeholder = `Informe um endereço de email válido`;
    userEmailInput.classList.add('exist');
  }

}

close_btn.addEventListener('click', closePopup);
btnSignIn.addEventListener("click", setupLoginPopUp);
submitLoginBtn.addEventListener('click', login);
