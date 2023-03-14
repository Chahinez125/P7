const main = document.querySelector("#main");

// ---- affichage des articles qui contient les recettes ----
export const displayData = (recettes) => {
  recettes.forEach((recette) => {
    const article = document.createElement("article");
    article.classList.add("col");
    article.classList.add("gy-5");

    const card_img = document.createElement("img");
    card_img.classList.add("card-img-top");

    card_img.classList.add("py-5");
    card_img.style.backgroundColor = "#C7BEBE";
    card_img.style.height = "45%";

    const card_body = document.createElement("div");
    card_body.classList.add("card-body");
    card_body.style.background = "#E7E7E7";
    card_body.style.paddingBottom = "0";

    // div name+time
    const div_card_title = document.createElement("div");
    div_card_title.classList.add("card-title");
    div_card_title.classList.add("row");
    div_card_title.classList.add("align-items-center");

    const name_recipe = document.createElement("h2");
    name_recipe.classList.add("col-8");
    name_recipe.classList.add("text_header");
    name_recipe.textContent = recette.name;

    const time_recipe = document.createElement("span");
    time_recipe.classList.add("fw-bold");
    time_recipe.classList.add("col-4");
    time_recipe.classList.add("text_header");
    time_recipe.style.fontSize = "15px";
    time_recipe.innerHTML = `<i class="bi bi-clock"></i> ${recette.time} min`;
    div_card_title.appendChild(name_recipe);
    div_card_title.appendChild(time_recipe);

    // div text
    const div_card_text = document.createElement("div");
    div_card_text.classList.add("row");
    div_card_text.style.fontSize = "0.85rem";

    const div_list = document.createElement("div");
    div_list.classList.add("col");
    div_list.classList.add("p-2");

    const div_desc = document.createElement("div");
    div_desc.classList.add("col-5");
    div_desc.classList.add("p-1");

    // ingrédients
    const ingredients_list = document.createElement("ul");
    ingredients_list.classList.add("list-unstyled");
    recette.ingredients.forEach((igd) => {
      const ingredient_recipe = document.createElement("li");
      ingredient_recipe.classList.add("text_igr");
      if (igd.quantity) {
        if (igd.unit === "grammes") {
          ingredient_recipe.textContent = `${igd.ingredient}: ${igd.quantity}g`;
        } else if (igd.unit === "cuillères à soupe") {
          ingredient_recipe.textContent = `${igd.ingredient}: ${igd.quantity} cuillères`;
        } else {
          ingredient_recipe.textContent = igd.unit
            ? `${igd.ingredient}: ${igd.quantity}${igd.unit}`
            : `${igd.ingredient}: ${igd.quantity}`;
        }
      } else {
        ingredient_recipe.textContent = igd.ingredient;
      }
      ingredient_recipe.classList.add("fw-bold");
      ingredients_list.appendChild(ingredient_recipe);
    });
    div_list.appendChild(ingredients_list);
    // description
    const desc_recipe = document.createElement("p");
    desc_recipe.textContent = recette.description;
    desc_recipe.classList.add("text_ellipsis");
    desc_recipe.classList.add("text_dsc");
    div_desc.appendChild(desc_recipe);
    div_card_text.appendChild(div_list);
    div_card_text.appendChild(div_desc);

    card_body.appendChild(div_card_title);
    card_body.appendChild(div_card_text);

    article.appendChild(card_img);
    article.appendChild(card_body);
    main.appendChild(article);
  });
};

// ---- affichage de liste des ingredients ----
const btnIngredient = document.querySelector("#btn_igr");
const ingredients_list = document.querySelector("#list_igr");
const igrClose = document.querySelector(".igr_close");
export const displayIngredient = async (tab) => {
  for (let i = 0; i < tab.length; i++) {
    const ingredient_list = document.createElement("li");
    ingredient_list.classList.add("bg-primary");
    ingredient_list.classList.add("px-2");
    ingredient_list.classList.add("py-0");
    ingredient_list.classList.add("fs-6");
    ingredient_list.classList.add("text-light");
    ingredient_list.classList.add("list-group-item");
    ingredient_list.style.border = "none";
    ingredient_list.setAttribute(
      "id",
      tab[i].substr(0, 1).toUpperCase() +
        tab[i].substr(1, tab[i].length).toLowerCase()
    );
    ingredient_list.textContent =
      tab[i].substr(0, 1).toUpperCase() +
      tab[i].substr(1, tab[i].length).toLowerCase();

    ingredients_list.appendChild(ingredient_list);
  }
};

// ---- affichage de liste des ustensils ----
const btnUstensils = document.querySelector("#btn_ust");
const ustensiles_list = document.querySelector("#list_ust");
const ustClose = document.querySelector(".ust_close");
export const displayUst = async (tab) => {
  for (let i = 0; i < tab.length; i++) {
    const ustensile_list = document.createElement("li");
    ustensile_list.classList.add("px-2");
    ustensile_list.classList.add("py-0");
    ustensile_list.classList.add("fs-6");
    ustensile_list.classList.add("text-light");
    ustensile_list.classList.add("list-group-item");
    ustensile_list.style.border = "none";
    ustensile_list.style.background = "#ED6454";
    ustensile_list.setAttribute(
      "id",
      tab[i].substr(0, 1).toUpperCase() +
        tab[i].substr(1, tab[i].length).toLowerCase()
    );

    ustensile_list.textContent =
      tab[i].substr(0, 1).toUpperCase() +
      tab[i].substr(1, tab[i].length).toLowerCase();
    ustensiles_list.appendChild(ustensile_list);
  }
};

// ---- Affichage de liste des appareils
const btnAppliance = document.querySelector("#btn_app");
const appareils_list = document.querySelector("#list_app");
const appClose = document.querySelector(".app_close");
export const displayApp = async (tab) => {
  for (let i = 0; i < tab.length; i++) {
    const appareil_list = document.createElement("li");
    appareil_list.classList.add("px-2");
    appareil_list.classList.add("py-0");
    appareil_list.classList.add("fs-6");
    appareil_list.classList.add("text-light");
    appareil_list.classList.add("list-group-item");
    appareil_list.style.border = "none";
    appareil_list.style.background = "#68D9A4";
    appareil_list.setAttribute(
      "id",
      tab[i].substr(0, 1).toUpperCase() +
        tab[i].substr(1, tab[i].length).toLowerCase()
    );
    appareil_list.textContent =
      tab[i].substr(0, 1).toUpperCase() +
      tab[i].substr(1, tab[i].length).toLowerCase();
    appareils_list.appendChild(appareil_list);
  }
};

// ---- Ouverture des listes ----
const igr = document.querySelector("#igr");
const app = document.querySelector("#app");
const ust = document.querySelector("#ust");
btnIngredient.addEventListener("click", () => {
  igr.style.display = "block";
  app.style.display = "none";
  ust.style.display = "none";
  btnIngredient.style.display = "none";
  btnAppliance.style.display = "block";
  btnUstensils.style.display = "block";
  btnAppliance.style.marginLeft = "250px";
  btnUstensils.style.marginLeft = "200px";
});
btnUstensils.addEventListener("click", () => {
  igr.style.display = "none";
  app.style.display = "none";
  ust.style.display = "block";
  btnIngredient.style.display = "block";
  btnAppliance.style.display = "block";
  btnUstensils.style.display = "none";
  btnAppliance.style.marginLeft = "0px";
  btnUstensils.style.marginLeft = "0px";
});
btnAppliance.addEventListener("click", () => {
  igr.style.display = "none";
  app.style.display = "block";
  ust.style.display = "none";
  btnIngredient.style.display = "block";
  btnAppliance.style.display = "none";
  btnUstensils.style.display = "block";
  btnAppliance.style.marginLeft = "0px";
  btnUstensils.style.marginLeft = "0px";
});

// ---- la fermeture des listes ----
igrClose.addEventListener("click", () => {
  igr.style.display = "none";
  btnIngredient.style.display = "block";
  btnAppliance.style.marginLeft = "0px";
  btnUstensils.style.marginLeft = "0px";
});
ustClose.addEventListener("click", () => {
  ust.style.display = "none";
  btnUstensils.style.display = "block";
});
appClose.addEventListener("click", () => {
  app.style.display = "none";
  btnAppliance.style.display = "block";
});
