import recipes from "../data/recipes.js";
import {
  displayData,
  displayIngredient,
  displayApp,
  displayUst,
} from "./display.js";

//varriables
const main = document.querySelector("#main");
const ul_igr = document.querySelector("#list_igr");
const ul_ust = document.querySelector("#list_ust");
const ul_app = document.querySelector("#list_app");

// ---- Recupération des ingredients ----
const getIngredients = async (recipes) => {
  let tab = [];
  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((igd) => {
      if (
        !tab.includes(igd.ingredient.toUpperCase()) &&
        !tab.includes(
          igd.ingredient.toUpperCase().substring(0, igd.ingredient.length - 1)
        )
      ) {
        tab.push(igd.ingredient.toUpperCase());
      }
    });
  });
  return tab;
};

// ---- Récupération des ustensils ----
const getUstensiles = async (recipes) => {
  let tab = [];
  recipes.forEach((recipe) => {
    recipe.ustensils.forEach((ust) => {
      if (!tab.includes(ust.toUpperCase())) {
        tab.push(ust.toUpperCase());
      }
    });
  });
  return tab;
};

// ---- Récupération des appareil ----
const getAppareil = async (recipes) => {
  let tab = [];
  recipes.forEach((recipe) => {
    if (!tab.includes(recipe.appliance.toUpperCase())) {
      tab.push(recipe.appliance.toUpperCase());
    }
  });
  return tab;
};

// ---- Appel les fonctions d'affichage ----
const init = async (recipes) => {
  displayData(recipes);
  let tab1 = await getIngredients(recipes);
  let tab2 = await getUstensiles(recipes);
  let tab3 = await getAppareil(recipes);
  // Retirer le tag de la liste des recherches avancées
  if (tag.length > 0) {
    for (let t of tag) {
      if (tab1.includes(t.toUpperCase())) {
        let tagIndex = tab1.indexOf(t.toUpperCase());
        tab1.splice(tagIndex, 1);
      }
      if (tab2.includes(t.toUpperCase())) {
        let tagIndex = tab1.indexOf(t.toUpperCase());
        tab2.splice(tagIndex, 1);
      }
      if (tab3.includes(t.toUpperCase())) {
        let tagIndex = tab1.indexOf(t.toUpperCase());
        tab3.splice(tagIndex, 1);
      }
    }
  }
  // Si le resultat n'affiche qu'une seul recette => fin de recherche
  if (newArrayRecipe.length == 1) {
    tab1 = [];
    tab2 = [];
    tab3 = [];
  }
  // actualisé les liste des recherches avancé en fonction des resultats affichés
  ul_igr.innerHTML = "";
  ul_app.innerHTML = "";
  ul_ust.innerHTML = "";
  await displayIngredient(tab1);
  await displayUst(tab2);
  await displayApp(tab3);
};
init(recipes);

// ---- Recheche Principale ----
const search_method = async (tag) => {
  let recipes_try = [];
  let array = [];
  if (tag.length > 0) {
    if (newArrayRecipe.length == 0) {
      array = recipes;
    } else if (newArrayRecipe.length > 0) {
      array = newArrayRecipe;
    }
    recipes_try = array.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(tag.toLowerCase()) ||
        recipe.description.toLowerCase().includes(tag.toLowerCase()) ||
        recipe.ingredients.some((rcp) =>
          rcp.ingredient.toLowerCase().includes(tag.toLowerCase())
        )
    );
  } else if (tag.length == 0) {
    recipes_try = recipes;
  }
  main.innerHTML = "";
  if (recipes_try.length > 0) {
    ul_igr.innerHTML = "";
    ul_app.innerHTML = "";
    ul_ust.innerHTML = "";
    init(recipes_try);
  } else if (recipes_try.length == 0) {
    main.innerHTML = `<div><p class='text-danger'> Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</div>`;
  }

  return recipes_try;
};

// ---- au input: Lancer la recherche principale ----
const tag_search = document.querySelector("#search_barre");
tag_search.addEventListener("input", async () => {
  search_method(tag_search.value);
  newArrayRecipe = await search_method(tag_search.value);
});

// ---- Fonction Tri de recherche avancé ----
let newRecipes = [];
async function tri(tag, array) {
  let tab1 = await getIngredients(array);
  let tab2 = await getAppareil(array);
  let tab3 = await getUstensiles(array);
  console.log(tag);
  tag.forEach((t) => {
    if (tab1.includes(t.toUpperCase())) {
      console.log("1");
      newRecipes = array.filter((recipe) =>
        recipe.ingredients.some((rcp) =>
          rcp.ingredient.toLowerCase().includes(t.toLowerCase())
        )
      );
    }
    if (tab3.includes(t.toUpperCase())) {
      console.log("2");
      newRecipes = array.filter((recipe) =>
        recipe.ustensils.some((ust) =>
          ust.toLowerCase().includes(t.toLowerCase())
        )
      );
    }
    if (tab2.includes(t.toUpperCase())) {
      console.log("3");
      newRecipes = array.filter((recipe) =>
        recipe.appliance.toLowerCase().includes(t.toLowerCase())
      );
    }
  });
  console.log(newRecipes);
  return newRecipes;
}

// ---- les recherches avancées: utilisation d'input ----
// filtrer les ingrédient au input
const inputIgr = document.querySelector("#input_igr");
inputIgr.addEventListener("input", async (e) => {
  let tab1 = [];
  if (newArrayRecipe.length == 0) {
    tab1 = await getIngredients(recipes);
  } else {
    tab1 = await getIngredients(newArrayRecipe);
  }
  let tab2 = [];
  if (e.target.value.length > 0) {
    tab2 = tab1.filter((tab) => tab.includes(e.target.value.toUpperCase()));
  } else {
    tab2 = tab1;
  }
  ul_igr.innerHTML = "";
  displayIngredient(tab2);
});

// filtrer les apareils au input
const inputApp = document.querySelector("#input_app");
inputApp.addEventListener("input", async (e) => {
  let tab1 = [];
  if (newArrayRecipe.length == 0) {
    tab1 = await getAppareil(recipes);
  } else {
    tab1 = await getAppareil(newArrayRecipe);
  }
  let tab2 = [];
  if (e.target.value.length > 0) {
    tab2 = tab1.filter((tab) => tab.includes(e.target.value.toUpperCase()));
  } else {
    tab2 = tab1;
  }
  ul_app.innerHTML = "";
  displayApp(tab2);
});

// filtrer les ustensils par input
const inputust = document.querySelector("#input_ust");
inputust.addEventListener("input", async (e) => {
  let tab1 = [];
  if (newArrayRecipe.length == 0) {
    tab1 = await getUstensiles(recipes);
  } else {
    tab1 = await getUstensiles(newArrayRecipe);
  }
  let tab2 = [];
  if (e.target.value.length > 0) {
    tab2 = tab1.filter((tab) => tab.includes(e.target.value.toUpperCase()));
  } else {
    tab2 = tab1;
  }
  ul_ust.innerHTML = "";
  displayUst(tab2);
});

// ---- les recherches avancées: au click ----
// varriables
const listIng = document.querySelector("#igr");
const listApp = document.querySelector("#app");
const listUst = document.querySelector("#ust");
const btnIng = document.querySelector("#btn_igr");
const btnAppliance = document.querySelector("#btn_app");
const btnUstensils = document.querySelector("#btn_ust");
const keyword = document.querySelector("#tag");
const keyWordDiv = document.createElement("div");
keyword.appendChild(keyWordDiv);
let tag = [];
let arrayRecipe = [];
let newArrayRecipe = [];

// Filtrer les ingrédient au click
ul_igr.addEventListener("click", async (e) => {
  // Manipulation d'interface
  btnAppliance.style.marginLeft = "0px";
  btnUstensils.style.marginLeft = "0px";
  listIng.style.display = "none";
  btnIng.style.display = "block";
  // insertion du tag a la DOM
  console.log(e.target.id);
  tag.push(e.target.id);
  keyWordDiv.innerHTML += `<div class="btn btn-primary m-1">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;
  // Moteur de recherche
  if (newArrayRecipe.length == 0) {
    newArrayRecipe = await tri(tag, recipes);
  } else {
    newArrayRecipe = await tri(tag, newArrayRecipe);
  }
  console.log(newArrayRecipe);
  arrayRecipe = newArrayRecipe;
  // Manipuler la DOM pour afficher les nouveaux resultat
  main.innerHTML = "";
  ul_igr.innerHTML = "";
  ul_ust.innerHTML = "";
  ul_app.innerHTML = "";
  init(arrayRecipe);
});

// Filtrer les ustensils au click
ul_ust.addEventListener("click", async (e) => {
  // Manipulation d'interface
  listUst.style.display = "none";
  btnUstensils.style.display = "block";
  // Insertion des tag dans la DOM
  console.log(e.target.id);
  tag.push(e.target.id);
  keyWordDiv.innerHTML += `<div class="btn m-1" style="background:#ED6454;color:white">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;

  // Moteur de recherche
  if (newArrayRecipe.length == 0) {
    newArrayRecipe = await tri(tag, recipes);
  } else {
    newArrayRecipe = await tri(tag, newArrayRecipe);
  }
  console.log(newArrayRecipe);
  arrayRecipe = newArrayRecipe;
  // Actualisé avec le nouveau resultat
  main.innerHTML = "";
  ul_igr.innerHTML = "";
  ul_ust.innerHTML = "";
  ul_app.innerHTML = "";
  init(arrayRecipe);
});

// Filtrer les apareils au click
ul_app.addEventListener("click", async (e) => {
  listApp.style.display = "none";
  btnAppliance.style.display = "block";
  console.log(e.target.id);
  tag.push(e.target.id);
  keyWordDiv.innerHTML += `<div class="btn m-1" style="background:#68D9A4;color:white">
       ${e.target.id}<span class="close"><i class="bi bi-x-circle"></i><span></div>`;
  if (newArrayRecipe.length == 0) {
    newArrayRecipe = await tri(tag, recipes);
  } else {
    newArrayRecipe = await tri(tag, newArrayRecipe);
  }
  console.log(newArrayRecipe);
  arrayRecipe = newArrayRecipe;
  main.innerHTML = "";
  ul_igr.innerHTML = "";
  ul_ust.innerHTML = "";
  ul_app.innerHTML = "";
  init(arrayRecipe);
});

// ---- Retirer les tags ----
keyword.addEventListener("click", async (e) => {
  if (e.target.classList.contains("bi-x-circle")) {
    let indexTag = tag.indexOf(e.target.innerText);
    tag.splice(indexTag, 1);
    e.target.parentElement.parentElement.remove();
    //keyWordDiv.innerHTML = "";
    console.log(newArrayRecipe);
    newArrayRecipe = await tri(tag, recipes);
    console.log(newArrayRecipe);
    init(newArrayRecipe);
    if (tag.length == 0) {
      init(recipes);
      newArrayRecipe = [];
    }
  }
});
