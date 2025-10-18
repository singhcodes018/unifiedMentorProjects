function SearchRecipes(){
  const searchedItem = document.getElementById("searchInput").value.trim(); //1st access the name of the recipe we searched for
  const recipesBox = document.getElementById('recipes');//inside this we will render the recipes
  const notFoundBox = document.getElementById('notFound');//this html element will render when there is no recipes found
  const loader = document.getElementById('loader');
  recipesBox.innerHTML = "";
  notFoundBox.style.display = "none";
  notFoundBox.classList.remove("red");

  if(!searchedItem){
    notFoundBox.innerHTML="⚠ Please provide a dish name to proceed!";
    notFoundBox.style.display = "block";
    notFoundBox.classList.add('red');
    return ;

  }
  loader.style.display = "block";
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedItem}`).then(response=>response.json()).then(data=>{
    loader.style.display = "none";
    if(!data.meals){
         notFoundBox.innerHTML = "Dish isn't found ☹ ! Search for other recipes";
         notFoundBox.classList.add('red');
         notFoundBox.style.display="block";
         //this will make it visible
}
else{
  notFoundBox.classList.remove('red');
  notFoundBox.style.display = "none";//hiding the red box when meals are found
  data.meals.forEach(meal => {
    const card = document.createElement('div');//a div element
    card.classList.add('card-class');
    card.innerHTML = `<img src="${meal.strMealThumb}" alt="👎${meal.strMeal}"/>
    <h3>${meal.strMeal}</h3>
    <button onclick="ViewRecipes('${meal.strMeal}')">View recipes</button>
`;
   recipesBox.appendChild(card);

    
  });
}

  }).catch(err=>{
    console.log("ERROR FETCHING DATA",err);
    notFoundBox.innerHTML = "😐 Something went wrong please try again later"
    notFoundBox.classList.add('red')
    notFoundBox.style.display = "block";
  })//apilink or apikey we'll need to fetc the details of the food 
}

document.getElementById('searchInput').addEventListener('keypress',e=>{
  if(e.key==="Enter"){
    SearchRecipes();
  }
  
})

document.getElementById('searchBtn').addEventListener('click',SearchRecipes);

function ViewRecipes(mealname){
  const popupCard = document.getElementById('popupCard');
  const recipeHeader = document.getElementById('recipe-header');
  const recipesDetails  =document.getElementById('recipeDetails');

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`).then(res=>res.json()).then(data=>{
    console.log(data)
    const meal = data.meals[0];
    recipeHeader.innerText = meal.strMeal;
    recipesDetails.innerText = meal.strInstructions;
    popupCard.style.display = 'block';
    popupOverlay.style.display = 'block';

  });
}

function closePopup() {
  document.getElementById('popupCard').style.display = 'none';
  document.getElementById('popupOverlay').style.display = 'none';
} 