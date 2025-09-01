let searchBox = document.getElementById("searchBox");
let searchBtn = document.getElementById("searchBtn");
let recipecon = document.querySelector(".recipe-container");
let recipeDetails = document.querySelector(".recipe-details-content");
let closeBtn = document.querySelector(".recipe-close-btn");

const fetchRecipe = async (query) =>{
    recipecon.innerHTML = "<h2>fetching Recipes...</h2>"
    const deta = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const responce = await deta.json();

    recipecon.innerHTML = "";

    responce.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipeChild");
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `

        const button = document.createElement("button");
        button.textContent = "View Recipe"
        recipeDiv.appendChild(button);

        button.addEventListener("click", ()=>{
            openRecipefunc(meal);
        })
        recipecon.appendChild(recipeDiv);
    })


}

const fetchIngredents = (meal)=>{
    let ingredentsList = "";
    for(let i=1; i<=20; i++){
        const ingredents = meal[`strIngredient${i}`]
        if(ingredents){
            const measure = meal[`strMeasure${i}`]
            ingredentsList += `<li>${measure} ${ingredents}</li>`
        }
        else{
            break;
        }
    }
    return ingredentsList;

}

const openRecipefunc = (meal)=>{
    recipeDetails.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents: </h3>
    <ul class="IngredientList">${fetchIngredents(meal)}</ul>
     <div class="recipeInstructions">
        <h3>instrcutions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `

   
    recipeDetails.parentElement.style.display = "block";
}


closeBtn.addEventListener("click", ()=>{
    recipeDetails.parentElement.style.display = "none"
})
searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const searchinput = searchBox.value.trim();
    fetchRecipe(searchinput);
    // console.log("clicked");
})