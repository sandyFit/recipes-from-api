const input = document.querySelector('#search-input');
const body = document.querySelector('body');
const themeBtn = document.querySelector('.nav-btn');
const tableBody = document.querySelector("tbody");

// ========== CHANGE THEME =============
const changeTheme = () => {
    body.classList.toggle('dark');
};

themeBtn.addEventListener('click', changeTheme);

// ===============FETCH DATE FROM TASTY API================
const fetchAutocompleteData = async (prefix) => {
    const options = {
        method: 'GET',
        url: 'https://tasty.p.rapidapi.com/recipes/auto-complete',
        params: {
            prefix: prefix,
        },
        headers: {
            'X-RapidAPI-Key': '2b647adabdmsh2da63f7dd8ace6dp10a31ejsn1fd6e9b10eb0',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        },
    };

    try {
        const response = await axios.request(options);
        return response.data.results || [];
    } catch (error) {
        console.error(error);
        return [];
    }
};
/* 
  ======================= DEBOUNCE FUNCTION ==========================
  When dealing with user input, especially in search boxes or autocomplete functionality, debounce can be useful. 
  It ensures that the associated processing or filtering functions are not triggered too frequently, 
  reducing unnecessary computations.
  DEBOUNCE FUNCTION PARAMETERS: It takes two parameters
  func: the function to be debounced
  delay: the time interval (in milliseconds) to wait before invoking the debounced function
*/
const debounce = (func, delay) => {
    // Declare a variable to store the timeout ID
    let timeoutId;

    // Return a new function that will be used as the debounced function
    return function (...args) {
        // Clear any existing timeout to ensure that only one timeout is active at a time
        clearTimeout(timeoutId);

        // Set a new timeout
        timeoutId = setTimeout(() => {
            // Execute the original function with the provided arguments
            func.apply(this, args);
        }, delay);
    };
};


const updateSearchResults = async () => {
    const term = input.value.toLowerCase();
    const recipes = await fetchAutocompleteData(term);

    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.display && recipe.display.includes(term);
    });

    console.log(filteredRecipes);

    tableBody.innerHTML = ''; // Clear previous results

    filteredRecipes.forEach((recipe) => {
        tableBody.innerHTML += `
            <tr key=${recipe.display}>
                <td>${recipe.search_value}</td>
                <td>${recipe.type}</td>
                
            </tr>
        `;
    });
};

input.addEventListener('input', debounce(updateSearchResults, 300));
