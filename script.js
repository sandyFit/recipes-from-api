const apiUrl = 'GET https://api.spoonacular.com/recipes/complexSearch';
const themeBtn = document.querySelector('.nav-btn');
const body = document.querySelector('body')

const changeTheme = () => {
    body.classList.toggle('dark');
}

themeBtn.addEventListener('click', changeTheme);