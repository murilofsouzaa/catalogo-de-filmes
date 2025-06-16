const dados = {
  users: [
    { id: 1, nome: "admin", senha: 123, email: "adm@gmail.com" }
  ]
};

const btnSignIn = document.querySelector("#btn-sign-in");
const mainContainer = document.querySelector(".main-container");
const close_btn = document.querySelector("#close-popup");
const loginPopUp = document.querySelector("#login-popup");
const submitLoginBtn = document.querySelector("#submit-login");

const userEmailInput = document.querySelector("#userEmail");
const userPasswordInput = document.querySelector("#userPassword");

let overlay;

function setupLoginPopUp() {
  if (!document.querySelector(".overlay")) {
    overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);
  }

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
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
}

function login(event) {
  event.preventDefault();

  const email = userEmailInput.value;
  const password = userPasswordInput.value;

  const user = dados.users.find(
    (u) => u.email === email && u.senha === Number(password)
  );

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Login bem-sucedido!");
    location.reload();
  } else {
    alert("Email ou senha incorretos!");
    userEmailInput.value = "";
    userPasswordInput.value = "";
  }
}

function logoutUser() {
  localStorage.removeItem("user");
  location.href = `../index/index.html`;
}

document.addEventListener("DOMContentLoaded", () => {
  const user = getUserInfo();

  if (user) {
    btnSignIn.textContent = "Sair";
    btnSignIn.removeEventListener("click", setupLoginPopUp);
    btnSignIn.addEventListener("click", logoutUser);

    submitLoginBtn.style.display = "none"; 
  } else {
    btnSignIn.textContent = "Entrar";
    btnSignIn.removeEventListener("click", logoutUser);
    btnSignIn.addEventListener("click", setupLoginPopUp);

    submitLoginBtn.style.display = "inline-block";
    submitLoginBtn.addEventListener("click", login);
  }
});

close_btn.addEventListener("click", closePopup);
