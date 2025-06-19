const createAccountBtn = document.querySelector("#create-account-btn");

const usernameInput = document.querySelector("#userName");
const userPasswordInput = document.querySelector("#userPassword");
const userPasswordInputCheck = document.querySelector("#userPasswordCheck");
const userEmailInput = document.querySelector("#userEmail");

function createUser() {
  const username = usernameInput.value.trim();
  const password = userPasswordInput.value;
  const passwordCheck = userPasswordInputCheck.value;
  const email = userEmailInput.value.trim();
  const userImage = imagePreview.src;
  
  

  if (password !== passwordCheck) {
    alert("As senhas não são iguais!");
    return;
  }

  let usersString = localStorage.getItem("users");
  let users;

  try {
    users = usersString ? JSON.parse(usersString) : [];
  } catch {
    users = [];
  }

  const user = { username, email, password, userImage };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Conta criada com sucesso!");
  window.location.href = `../../public/index/index.html`;
}

createAccountBtn.addEventListener("click", createUser);
