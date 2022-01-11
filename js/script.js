let listOfIngredients = [];
let listOfUtensils = [];
let listOfAppliances = [];

function structureData(recipes) {
    [listOfIngredients, listOfUtensils, listOfAppliances] = [...structureItems(recipes)];
    // let setOfIngredients = new Set();
    // let setOfUtensils = new Set();
    // let setOfAppliances = new Set();
    
    // recipes.forEach(recipe => {
    //     setOfAppliances.add(recipe.appliance.toLowerCase());
    //     recipe.ingredients.forEach(ingredient => {
    //         setOfIngredients.add(ingredient.ingredient.toLowerCase());
    //     });
    //     recipe.ustensils.forEach(utensil => {
    //         setOfUtensils.add(utensil.toLowerCase());
    //     });
    // });

    // listOfIngredients = [...setOfIngredients];
    // listOfUtensils = [...setOfUtensils];
    // listOfAppliances = [...setOfAppliances];
}

function structureItems(recipes) {
    let setOfIngredients = new Set();
    let setOfUtensils = new Set();
    let setOfAppliances = new Set();
    
    recipes.forEach(recipe => {
        setOfAppliances.add(recipe.appliance.toLowerCase());
        recipe.ingredients.forEach(ingredient => {
            setOfIngredients.add(ingredient.ingredient.toLowerCase());
        });
        recipe.ustensils.forEach(utensil => {
            setOfUtensils.add(utensil.toLowerCase());
        });
    });

    return [[...setOfIngredients], [...setOfUtensils], [...setOfAppliances]]
}

function createCard(recipe) {
    const card = document.createElement("article");
          card.classList.add("card");

        // const cardImg = document.createElement("img");           // Lignes à décomenter quand images disponibles
        //       cardImg.classList.add("card-img-top");             // |
        //       cardImg.src = "assets/img" + recipe.id + ".webp"   // |
        //       cardImg.alt = " ";                                 // |
        // card.appendChild(cardImg);                               // |

        const placeholder = document.createElement("div")  // Lignes à supprimer quand images disponibles
              placeholder.classList.add("card-img-top");   // |
        card.appendChild(placeholder);                     // |

        const cardBody = document.createElement("div");
              cardBody.classList.add("card-body");
            const recipeHeader = document.createElement("div");
                  recipeHeader.classList.add("recipeHeader");
                const recipeTitle = document.createElement("h2");
                      recipeTitle.classList.add("recipeTitle");
                      recipeTitle.textContent = recipe.name;
                recipeHeader.appendChild(recipeTitle);
                const recipeTime = document.createElement("span");
                      recipeTime.classList.add("recipeTime");
                    const recipeImg = document.createElement("img");
                          recipeImg.src = "assets/icons/time.svg";
                          recipeImg.alt = " ";
                    recipeTime.appendChild(recipeImg);
                    const recipeMinutes = document.createElement("span");
                          recipeMinutes.classList.add("recipeMinutes");
                          recipeMinutes.textContent = recipe.time + " min"
                    recipeTime.appendChild(recipeMinutes);
                recipeHeader.appendChild(recipeTitle);
            cardBody.appendChild(recipeHeader);
            const recipeIngredients = document.createElement("ul");
                  recipeIngredients.classList.add("recipeIngredients");
                  recipe.ingredients.forEach(ingredient => {
                    const recipeIngredient = document.createElement("li");
                        const recipeIngredientName = document.createElement("span");
                            recipeIngredientName.classList.add("recipeIngredientName");
                            recipeIngredientName.textContent = ingredient.ingredient + ": ";
                        recipeIngredient.appendChild(recipeIngredientName);
                        const recipeIngredientValue = document.createElement("span");
                            recipeIngredientValue.classList.add("recipeIngredientValue");
                            recipeIngredientValue.textContent = [ingredient.quantity, ingredient.unit].join(" ");
                        recipeIngredient.appendChild(recipeIngredientValue);
                    recipeIngredients.appendChild(recipeIngredient);
                  });
            cardBody.appendChild(recipeIngredients);
            const recipePreparation = document.createElement("p");
                  recipePreparation.classList.add("recipePreparation");
                  recipePreparation.textContent = recipe.description;
            cardBody.appendChild(recipePreparation);
        card.appendChild(cardBody);
    return card;
}

async function reloadCards() {
    document.querySelector("section").innerHTML = "";
    for (let i = 0; i < recipesFiltered.length ; i++) {
        document.querySelector("section").appendChild(createCard(recipesFiltered[i]));
    }
}

async function init() {
    await structureData(recipes);
    getDropdownsLists();
    await reloadCards();
}

init();

let listOfIngredientsFiltered = listOfIngredients;
let listOfUtensilsFiltered = listOfUtensils;
let listOfAppliancesFiltered = listOfAppliances;