//Création d'une liste vide pour les dropdowns
/* Creating a list of empty variables. */
let ingredientsList = [];
let appareilsList = [];
let ustensilesList = [];

/**
 * It creates a listener for each dropdown.
 */
function init() {
  //Filtre des recettes dans l'onglet recherche
  let searchText = document.querySelector(".form-control").value;
  searchText = searchText.length > 2 ? searchText : "";
  let recipesFiltred = "";
  if (searchText) {
    recipesFiltred = recipes.filter((recipe) => {
      return (
        clearText(recipe.name).includes(clearText(searchText)) ||
        recipe.ingredients.some((ingredient) => clearText(ingredient.ingredient).includes(clearText(searchText))) ||
        recipe.description.includes(clearText(searchText))
      );
    });
  } else {
    recipesFiltred = recipes;
  }

  //Filtres des recettes par ingrédients (dropdown)
  const badgeIngredientList = badgeListFactory(".ingredientsBadges");
  if (badgeIngredientList.length > 0) {
    badgeIngredientList.forEach((badge) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return recipe.ingredients.some((ingredient) => clearText(ingredient.ingredient).includes(clearText(badge)));
      });
    });
  }
  //Filtres des recettes par appareils (dropdown)
  const badgeAppareilsList = badgeListFactory(".appareilsBadges");
  if (badgeAppareilsList.length > 0) {
    badgeAppareilsList.forEach((badge) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return clearText(recipe.appliance).includes(clearText(badge));
      });
    });
  }
  //Filtres des recettes par ustensiles (dropdown)
  const badgeUstensilesList = badgeListFactory(".ustensilesBadges");
  if (badgeUstensilesList.length > 0) {
    badgeUstensilesList.forEach((badge) => {
      recipesFiltred = recipesFiltred.filter((recipe) => {
        return recipe.ustensils.some((ustensile) => clearText(ustensile).includes(clearText(badge)));
      });
    });
  }
  //Création des cards avec les recettes filtrées et les afficher
  cardsFactory(recipesFiltred);

  //Réinitialisation des listes des dropdowns
  ingredientsList = [];
  appareilsList = [];
  ustensilesList = [];
  //Création des listes des dropdowns avec les recettes filtrées
  recipesFiltred.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const ingredientName = ingredient.ingredient;
      ingredientsList.includes(ingredientName) || badgeIngredientList.includes(ingredientName)
        ? null
        : ingredientsList.push(ingredientName);
    });

    const appareilName = recipe.appliance;
    appareilsList.includes(appareilName) || badgeAppareilsList.includes(appareilName)
      ? null
      : appareilsList.push(appareilName);

    recipe.ustensils.forEach((ustensil) => {
      const ustensilName = ustensil;
      ustensilesList.includes(ustensilName) || badgeUstensilesList.includes(ustensilName)
        ? null
        : ustensilesList.push(ustensilName);
    });
  });

  //Ajoute les options des dropdowns
  datalist(ingredientsList, "#ingredients", ".ingredientsList");
  datalist(appareilsList, "#appareils", ".appareilsList");
  datalist(ustensilesList, "#ustensiles", ".ustensilesList");
  /**
   * Fonction qui crée un écouteur d'événement pour chaque dropdown
   */
  /**
   * *This function takes in a list of elements, a target class, and a color, and adds a click event to
   * each element in the list.
   * It then uses the click event to call the badgeFactory function.*
   * @param sourceElements - The element that contains the list of elements that will be used to generate
   * the badges.
   * @param badgeTargetClass - The CSS class of the element that will be the badge.
   * @param color - The color of the badge.
   */
  function onElementClick(sourceElements, badgeTargetClass, color) {
    document.querySelectorAll(sourceElements + " li").forEach((element) =>
      element.addEventListener("click", (e) => {
        badgeFactory(badgeTargetClass, color, e.target.innerText, e.target.attributes["value"].value);
      })
    );
  }
  onElementClick("#ingredients", ".ingredientsBadges", "primaryColor");
  onElementClick("#appareils", ".appareilsBadges", "successColor");
  onElementClick("#ustensiles", ".ustensilesBadges", "dangerColor");
}
init();
//Écoute le changement de la valeur de la recherche
document.querySelector(".form-control").addEventListener("input", (e) => {
  init();
});

/**
 * It creates a dropdown menu and binds it to a badge.
 * @param dropdownClass - The class of the dropdown element.
 * @param badgeTargetClass - The class of the element that will be updated with the new badge.
 * @param color - The color of the badge.
 */
function onDropdownChange(dropdownClass, badgeTargetClass, color) {
  document.querySelector(dropdownClass).addEventListener("change", (e) => {
    badgeFactory(badgeTargetClass, color, e.target.value, e.target.value);
    //Réinitialisation de la valeur de la recherche du dropdown
    e.target.value = "";
  });
}
document.querySelector(".ingredientsList").addEventListener("input", (e) => {
  init();
});
document.querySelector(".appareilsList").addEventListener("input", (e) => {
  init();
});
document.querySelector(".ustensilesList").addEventListener("input", (e) => {
  init();
});
const dropdownDownIngredients = document.querySelector(".dropdownDownIngredients");
const dropdownUpIngredients = document.querySelector(".dropdownUpIngredients");
const ingredientsTagBtn = document.getElementById("ingredients-tag-btn");
const openedBtningredients = document.querySelector(".opened-btn-ingredients");

const dropdownDownAppareils = document.querySelector(".dropdownDownAppareils");
const dropdownUpAppareils = document.querySelector(".dropdownUpAppareils");
const appareilsTagBtn = document.getElementById("appareils-tag-btn");
const openedBtnAppareils = document.querySelector(".opened-btn-appareils");

const dropdownDownUstensiles = document.querySelector(".dropdownDownUstensiles");
const dropdownUpUstensiles = document.querySelector(".dropdownUpUstensiles");
const ustensilesTagBtn = document.getElementById("ustensiles-tag-btn");
const openedBtnUstensiles = document.querySelector(".opened-btn-ustensiles");

/**
 * The function launches a dropdown menu by adding an event listener to the dropdown down button.
 *
 * The function also adds an event listener to the dropdown up button.
 *
 * When the dropdown down button is clicked, the opened button is displayed and the tag button is
 * hidden.
 *
 * When the dropdown up button is clicked, the tag button is displayed and the opened button is hidden.
 * @param dropdownDown - the button that opens the dropdown
 * @param dropdownUp - the button that closes the dropdown
 * @param openedBtn - the button that opens the dropdown
 * @param tagBtn - the button that will be used to open the dropdown
 */
function launchDropdown(dropdownDown, dropdownUp, openedBtn, tagBtn) {
  dropdownDown.addEventListener("click", () => {
    openedBtn.style.display = "block";
    tagBtn.style.display = "none";
  });
  dropdownUp.addEventListener("click", () => {
    tagBtn.style.display = "block";
    openedBtn.style.display = "none";
  });
}

launchDropdown(dropdownDownIngredients, dropdownUpIngredients, openedBtningredients, ingredientsTagBtn);
launchDropdown(dropdownDownAppareils, dropdownUpAppareils, openedBtnAppareils, appareilsTagBtn);
launchDropdown(dropdownDownUstensiles, dropdownUpUstensiles, openedBtnUstensiles, ustensilesTagBtn);
