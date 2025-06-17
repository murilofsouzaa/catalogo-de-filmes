const createAccountBtn = document.querySelector("#create-account-btn");

function getUserInfo() {
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
}

function createAccount(){
    
    const username = document.querySelector("#userName").value;
    const password = document.querySelector("#userPassword").value;
    const passwordCheck = document.querySelector("#userPasswordCheck").value;
    const email = document.querySelector("#userEmail").value;

    if(password != passwordCheck){
        alert("As senhas não são iguais!");
        return;
    }
        const user = {
            name: username,
            password: password,
            email: email
        }
        
        const userString = JSON.stringify(user);
        localStorage.setItem('user', userString);
        alert("Conta criada com sucesso!");

        window.location.href = `../../public/index/index.html`
    
}

createAccountBtn.addEventListener("click", createAccount);