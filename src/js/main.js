document.addEventListener('DOMContentLoaded', () => {
  const userImg = document.querySelector('#userImg');
  const user = JSON.parse(localStorage.getItem('user'));

  if(user && user.userImageFile) {
    userImg.src = user.userImageFile;
  }
});

