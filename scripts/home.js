const themeBtn = document.querySelector('.nav-btn');
const body = document.querySelector('body');
const viewMoreBtn = document.querySelector('.viewMore-btn');


const changeTheme = () => {
    body.classList.toggle('dark');
}
themeBtn.addEventListener('click', changeTheme);

// ========FUNCTION FOR THE VIEW MORE BUTTON ==============
const viewMore = (id) => {
    window.location.href = `detail.html?id=${id}`;
}


// ==================API CALL===================
const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/list',
  params: {
    from: '0',
    size: '20',
    tags: 'under_30_minutes'
  },
  headers: {
    'X-RapidAPI-Key': '2b647adabdmsh2da63f7dd8ace6dp10a31ejsn1fd6e9b10eb0',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }
};

const getAllRecipes = async() => {
    try {
        const response = await axios.request(options);
        console.log(response.data);
        const recipes = response.data.results;

        const cardsBox = document.querySelector('#box');
        recipes.forEach(recipe => {
            cardsBox.innerHTML += `               
                <div class="card">
                    <p>Recipe: ${recipe.id}</p>
                    <h3>${recipe.slug}</h3>
                    <img class='card-img' src='${recipe.thumbnail_url}' alt="pic" />
                    <p>${recipe.description}</p>
                    <button class="viewMore-btn" onclick="viewMore(${recipe.id})">View More</button>
                </div>                                  
            `
        });

    }
    
    catch (error) {
        console.error(error);
    }


}

getAllRecipes();

