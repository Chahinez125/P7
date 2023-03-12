//Pour faire fonctionner la page GitHub Pages, nous devons utiliser un chemin relatif vers le répertoire de données
function getApiDataForGitHub() {
    const urlAPI = window.location.origin.includes("http://127.0.0.1:5500")
      ? "http://127.0.0.1:5500/P7/workstation/data/recipes.json"
      : "./data/recipes.json";
  
    return urlAPI;
  }
  
class IndexApp {
    constructor() {
      this.recipeUrlApi = getApiDataForGitHub();
      this.recipeDataApi = new RecipesApi(this.recipeUrlApi);
    }
  
    async main() {
      const recipesDataPromise = await this.recipeDataApi.getRecipes();
      return recipesDataPromise;
    }
  
    static addRecipeCards(container, recipeArray) {
      container.innerHTML = new RecipeCardTemplate(
        recipeArray
      ).createRecipeCards();
    }
  
    static createTagsForQuery(container, tagText, tagSearchType) {
      const tagTemplate = new TagTemplate(tagText, tagSearchType).createTag();
      container.appendChild(tagTemplate);
    }
  }
  
  //DOM Elements
  const recipeCardsContainer = document.querySelector(
    ".main-index__recipes-container"
  );
  
  const tagsContainer = document.querySelector(".main-index__tags-container");
  
  const dropdownMenuOptionsListContainer = document.querySelector(
    ".dropdown-menu__options-list"
  );
  
  //Lancement de l'application
  const launchApp = new IndexApp().main();
  
  const selectedOptionsArray = []; //Ce tableau contiendra tous les noms des balises que l'utilisateur a choisi
  
  let arrayOfRecipes = []; //Tableau contenant toute la liste des différentes recettes extraites du fichier JSON
  
  let arrayOfIngredients = []; //Tableau contenant toute la liste des
  
  let arrayOfDevices = []; //Tableau contenant toute la liste 
  
  let arrayOfUtensils = []; //Tableau contenant toute la liste 
  
  let arrayOfItemsSearchedByUser = [];
  
  let tagsTextArray = [];
  
  let queryParameters = "";
  
  let keywordsParameters = "";
  
  launchApp.then((recipes) => {
    arrayOfRecipes = recipes;
  
    arrayOfIngredients = createUniqueArrays(arrayOfRecipes, "ingredients", true); //Contient le tableau des tableaux
    arrayOfIngredients = createUniqueArrays(
      //Contient les valeurs uniques des tableaux à l'intérieur de ce tableau
      arrayOfIngredients,
      "ingredient",
      false
    );
  
    arrayOfDevices = createUniqueArrays(arrayOfRecipes, "appliance", false);
  
    arrayOfUtensils = createUniqueArrays(arrayOfRecipes, "ustensils", false);
  
    IndexApp.addRecipeCards(recipeCardsContainer, arrayOfRecipes);
  
    addEventListeners();
    console.log(
      "%cAlgorithme de recherche V1",
      "background: yellow; color: black;font-size: 16px; padding: 10px;"
    );
  
    initiateDropdownMenus();
  });
  
  const inputsArray = document.getElementsByClassName(
    "dropdown-menu__sort-input"
  );
  
  const searchRecipeInput = document.querySelector(".main-index__input");
  
  const form = document.querySelector(".main-index__form");
  
  //Ajoute tous les écouteurs d'événement à l'intérieur de la page
  function addEventListeners() {
    for (input of inputsArray) {
      input.addEventListener("click", openMenuOptions); //Pour ouvrir le menu déroulant
      input.addEventListener("input", createTag); //To display all the list items
    }
  
    searchRecipeInput.addEventListener("input", searchRecipes);
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
  
  //Cette fonction créera des tableaux avec des valeurs uniques
  function createUniqueArrays(array, objectProperty, arrayContainsObjects) {
    //nous ajoutons à l'intérieur de la méthode concat un tableau vide que nous allons concaténer
     // au tableau de recettes qui sera mappé pour contenir UNIQUEMENT le tableau d'appareils/dispositifs
    array = [].concat(
      ...array.map((recipe) => {
        let valueOfProperty = recipe[objectProperty];
        return valueOfProperty;
      })
    );
  
    if (!arrayContainsObjects) {
      //Si le tableau contient NE contient PAS d'objets → Définissez ses valeurs en minuscules
      setArrayValuesToLowerCase(array);
    }
  
    // 
    return [...new Set(array)];
  }
  
  //Nous allons créer un ensemble afin d'éviter les doublons,
  function setArrayValuesToLowerCase(array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = array[i].toLowerCase();
    }
    return array;
  }
  