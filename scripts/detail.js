const detailBox = document.querySelector('.detail-box');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const title = document.querySelector('#title');
const themeBtn = document.querySelector('.nav-btn');
const body = document.querySelector('body');

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
})

const getMoreInfo = async (id) => {
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
        params: { id }, // Corrected: Use an object for params
        headers: {
            'X-RapidAPI-Key': '2b647adabdmsh2da63f7dd8ace6dp10a31ejsn1fd6e9b10eb0',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data; // Corrected: Return the data
    } catch (error) {
        console.error(error);
        return null; // Handle errors appropriately
    }
}

const renderData = async () => {
    const moreInfoRecipes = await getMoreInfo(id);

    title.textContent = `Recipe N° ${moreInfoRecipes.id}`

    if (moreInfoRecipes) {
        detailBox.innerHTML += `
            <div class="card detail-card">
                <h3>${moreInfoRecipes.slug}</h3>
                <div class="detail-card-box">
                    <img class='card-img detail-img' src='${moreInfoRecipes.thumbnail_url}' alt="pic" />
                    <div class="stats">
                        <p>${moreInfoRecipes.description}</p>
                        <div class="macros">
                            <p>Calories: ${moreInfoRecipes.nutrition.calories}</p>						
                            <h4>Macros</h4>
                            <p>Carbohyfrates: ${moreInfoRecipes.nutrition.carbohydrates}</p>
                            <pFat: moreInfoRecipes.nutrition.fat}</p>
                            <p>Protein: ${moreInfoRecipes.nutrition.protein}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

renderData();
