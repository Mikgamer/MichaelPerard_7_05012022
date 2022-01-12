let listOfIngredientsSelected = new Set();
let listOfUtensilsSelected = new Set();
let listOfAppliancesSelected = new Set();

let listOfIngredientsFilteredTag = [];
let listOfUtensilsFilteredTag = [];
let listOfAppliancesFilteredTag = [];

let listOfIngredientsFilteredInput = [];
let listOfUtensilsFilteredInput = [];
let listOfAppliancesFilteredInput = [];

let recipesTagFiltered = recipes;
let recipesInputFiltered = recipesTagFiltered;
let recipesFiltered = recipesInputFiltered;

async function recipesTagFilter() {
    // Filtre cartes
    let itemsFiltered = [];
    for (let i = 0; i < recipesTagFiltered.length; i++) {
        const item = recipesTagFiltered[i];

        let haveIngredients = true;
        for (let j = 0; j < listOfIngredientsSelected.size; j++) {
            let haveIngredient = 0;
            for (let k = 0; k < item.ingredients.length; k++) {
                listOfIngredientsSelected.has(item.ingredients[k].ingredient.toLowerCase()) ? haveIngredient++ : undefined;
            }
            haveIngredient === listOfIngredientsSelected.size ? haveIngredients = true : haveIngredients = false;
        }

        let haveUtensils = true;
        for (let j = 0; j < listOfUtensilsSelected.size; j++) {
            let haveUtensil = 0;
            for (let k = 0; k < item.ustensils.length; k++) {
                listOfUtensilsSelected.has(item.ustensils[k].toLowerCase()) ? haveUtensil++ : undefined;
            }
            haveUtensil === listOfUtensilsSelected.size ? haveUtensils = true : haveUtensils = false;
        }

        let haveAppliance = true 
        if (listOfAppliancesSelected.size > 0 ) {
            haveAppliance = listOfAppliancesSelected.has(item.appliance.toLowerCase());
        }

        // Si tout est trouvé dans l'objet vérifié, on l'insère dans le tableau
        haveIngredients && haveUtensils && haveAppliance ? itemsFiltered.push(item) : undefined;
    }

    // Filtre dropdowns
    [listOfIngredientsFilteredTag, listOfUtensilsFilteredTag, listOfAppliancesFilteredTag] = [...structureItems(itemsFiltered)];
    [listOfIngredientsFiltered, listOfUtensilsFiltered, listOfAppliancesFiltered] = [listOfIngredientsFilteredTag, listOfUtensilsFilteredTag, listOfAppliancesFilteredTag]
    
    return itemsFiltered;
}

async function recipesTagUpdate() {
    recipesTagFiltered = await recipesTagFilter();
    recipesInputReload();
}

async function recipesTagReload() {
    recipesTagFiltered = recipes;
    recipesTagUpdate();
}

async function recipesInputFilter() {

    const inputFilter = document.querySelector(".search input").value.toLowerCase();
    let itemsFiltered = [];

    if (inputFilter.length >= 3) {
        // Filtre cartes
        for (let i = 0; i < recipesInputFiltered.length; i++) {
            const item = recipesInputFiltered[i];
            
            const isFilterInName = item.name.toLowerCase().includes(inputFilter);
            let isFilterInIngredients = false;
            for (let j = 0; j < item.ingredients.length; j++) {
                item.ingredients[j].ingredient.includes(inputFilter) ? isFilterInIngredients = true : undefined;
            }
            const isFilterInDescription = item.description.toLowerCase().includes(inputFilter);
        
            // Si la chaine de caractères est trouvée dans l'objet vérifié, on l'insère dans le tableau
            isFilterInName || isFilterInIngredients || isFilterInDescription ? itemsFiltered.push(item) : undefined;
        }

        // Filtre dropdowns
        [listOfIngredientsFilteredInput, listOfUtensilsFilteredInput, listOfAppliancesFilteredInput] = [...structureItems(itemsFiltered)];
        [listOfIngredientsFiltered, listOfUtensilsFiltered, listOfAppliancesFiltered] = [listOfIngredientsFilteredInput, listOfUtensilsFilteredInput, listOfAppliancesFilteredInput]
    
        getDropdownsLists();
    } else {
        itemsFiltered = recipesTagFiltered;
    }

    return itemsFiltered;
}

async function recipesInputUpdate() {
    recipesInputFiltered = await recipesInputFilter();
    recipesFiltered = recipesInputFiltered;
    getDropdownsLists();
    reloadCards();
}

async function recipesInputReload() {
    recipesInputFiltered = recipesTagFiltered;
    recipesInputUpdate();
}

function dropdownFilterInput() {
    [listOfIngredientsFilteredSearch,listOfAppliancesFilteredSearch,listOfUtensilsFilteredSearch] = [[],[],[]]
    const inputs = document.querySelectorAll(".dropdown input");
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs.item(i);
        inputValue = input.value.toLowerCase();
        switch (input.parentNode.dataset.type) {
            case "ingredient":
                for (let i = 0; i < listOfIngredientsFiltered.length; i++) {
                    const item = listOfIngredientsFiltered[i].toLowerCase();
                    item.includes(inputValue) ? listOfIngredientsFilteredSearch.push(item) : undefined;
                }
                break;
    
            case "appliance":
                for (let i = 0; i < listOfAppliancesFiltered.length; i++) {
                    const item = listOfAppliancesFiltered[i];
                    item.includes(inputValue) ? listOfAppliancesFilteredSearch.push(item) : undefined;
                }
                break;
    
            case "utensil":
                for (let i = 0; i < listOfUtensilsFiltered.length; i++) {
                    const item = listOfUtensilsFiltered[i];
                    item.includes(inputValue) ? listOfUtensilsFilteredSearch.push(item) : undefined;
                }
                break;
        }
    }
}