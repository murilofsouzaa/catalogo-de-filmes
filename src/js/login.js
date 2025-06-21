const btnSignIn = document.querySelector("#btn-sign-in");
const mainContainer = document.querySelector(".main-container");
const close_btn = document.querySelector("#close-popup");
const loginPopUp = document.querySelector("#login-popup");
const submitLoginBtn = document.querySelector("#submit-login");

const userEmailInput = document.querySelector("#userEmail");
const userPasswordInput = document.querySelector("#userPassword");

const userImageBtn = document.querySelector("#userImg");

let overlay;

function setupLoginPopUp() {
  overlay = document.createElement("div");  
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);

  loginPopUp.classList.remove("hidden");
  mainContainer.classList.add("body-active");
}

function closePopup() {
  loginPopUp.classList.add("hidden");
  mainContainer.classList.remove("body-active");

  const existingOverlay = document.querySelector(".overlay");
  if (existingOverlay) {
    document.body.removeChild(existingOverlay);
  }
}

function getUserInfo() {
  const users = JSON.parse(localStorage.getItem('users'));
  return users || [];
}

function logoutUser() {
  localStorage.removeItem('user');
  alert("Usuário deslogado com sucesso!");
  location.href = "../index/index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const users = getUserInfo();
  const userLogged = localStorage.getItem('user');

  function setBtnToLogout() {
    btnSignIn.textContent = "Sair";
    btnSignIn.onclick = logoutUser;
  }

  function setBtnToLogin() {
    btnSignIn.textContent = "Entrar";
    btnSignIn.onclick = setupLoginPopUp;
  }

  if (userLogged) {
    setBtnToLogout();
  } else {
    setBtnToLogin();
  }

  userImageBtn.addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      window.location.href = "../../public/myAccount/myAccount.html";
    } else {
      window.location.href = "../../public/sign-in/sign-in.html";
    }
  });

  submitLoginBtn.addEventListener("click", () => {
    const email = userEmailInput.value;
    const password = userPasswordInput.value;

    const user = users.find(user => user.email === email);

    if (!user || user.password !== password) {
      alert("Email ou senha incorreto!");
      userEmailInput.value = "";
      userPasswordInput.value = "";
      return;
    }

    localStorage.setItem('user', JSON.stringify(user));
    userImageBtn.src = user.userImageFile;
    btnSignIn.textContent = "Sair";
    alert("Login feito com sucesso!");
    closePopup();
    setBtnToLogout();
  });

  close_btn.addEventListener("click", closePopup);
});

document.addEventListener('DOMContentLoaded', () => {
  const userImg = document.querySelector('#userImg');
  const user = JSON.parse(localStorage.getItem('user'));
  const btnSignIn = document.querySelector("#btn-sign-in");

  if (user && user.userImageFile) {
    userImg.src = user.userImageFile;
    btnSignIn.textContent = `Sair`;
  }
});
