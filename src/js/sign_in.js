const createAccountBtn = document.querySelector("#create-account-btn");

const usernameInput = document.querySelector("#userName");
const userPasswordInput = document.querySelector("#userPassword");
const userPasswordInputCheck = document.querySelector("#userPasswordCheck");
const userEmailInput = document.querySelector("#userEmail");

const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

let userImageFile = ""; 

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = () => {
      preview.src = reader.result;
      preview.style.width = "120px";
      preview.style.height = "120px"
      preview.style.borderRadius = "100%";
      userImageFile = reader.result; 
    };

    reader.readAsDataURL(file);
  }
});

function createUser() {
  const username = usernameInput.value.trim();
  const password = userPasswordInput.value;
  const passwordCheck = userPasswordInputCheck.value;
  const email = userEmailInput.value.trim();

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

  const user = { username, email, password, userImageFile };
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("user", JSON.stringify(user)); 

  alert("Conta criada com sucesso!");
  window.location.href = "../../public/index/index.html";
}

createAccountBtn.addEventListener("click", createUser);
