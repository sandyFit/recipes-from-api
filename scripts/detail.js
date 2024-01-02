const detailBox = document.querySelector('.detail-box');
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

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

    if (moreInfoRecipes) {
        detailBox.innerHTML += `
            <div class="detail-card">
                <p>Recipe: ${moreInfoRecipes.id}</p>
                <h3>${moreInfoRecipes.slug}</h3>
                <img class='card-img' src='${moreInfoRecipes.thumbnail_url}' alt="pic" />
                <p>${moreInfoRecipes.description}</p>
                <p>${moreInfoRecipes.nutrition.calories}</p>
            </div>
        `;
    }
}

renderData();
