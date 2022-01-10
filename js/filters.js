let listOfIngredientsSelected = new Set();
let listOfUtensilsSelected = new Set();
let listOfAppliancesSelected = new Set();

let recipesTagFiltered = recipes
let recipesInputFiltered = recipesTagFiltered
let recipesFiltered = recipesInputFiltered;

async function recipesTagFilter() {
    // Filtrer les données
    return recipesTagFiltered;
}

async function recipesTagUpdate() {
    await recipesTagFilter();
    getDropdownsLists();
    recipesInputReload();
}

async function recipesTagReload() {
    recipesTagFiltered = recipes;
    await recipesTagUpdate();
}

async function recipesInputFilter() {
    // Filtrer les données
    return recipesInputFiltered;
}

async function recipesInputUpdate() {
    await recipesInputFilter();
    recipesFiltered = recipesInputFiltered;
    await reloadCards();
}

async function recipesInputReload() {
    recipesInputFiltered = recipesTagFiltered;
    await recipesInputUpdate();
}






// Rechager les listes : getDropdownsLists()
// - Update listOfIngredientsFiltered, listOfAppliancesFiltered et listOfUtensilsFiltered

// Fonction pour recharger les cartes : reloadCards()

// Ordre des fonctions :
// 1. Charger selon les tags => Diminuer recipesFiltered
// 1. (Aussi) Charger selon la recherche => Dimunuer recipesFiltered
// --> Dans les 2 cas, réduire recipesFiltered pour faire moins de passages
// 2. Reload les listes et les cartes


// 2 Tableaux : comparent leurs ids et affichent ceux qui sont sur les 2 tableaux
// Ou faire pour input : quand nouveau texte = fullreload sinon lire le tableau des tags ?

// Liste Input
// Nouveau charactère = préciser sur le tableau, repasse sur lui même, si on supprime un tableau (on revien à la backup ou recharge si il n'y en a pas)
// Garder les anciens tableaux(si oui, cb de backup ?) ou tout recharger quand on efface un charactère ?

// Liste Tag
// Charger selon les options sélectionnées : nouveau tag = repasse sur le tableau, sinon faire comme pour list input