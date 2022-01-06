document.querySelector("body").ondragstart = () => {return false}; // Empêche les images d'être déplacées

function dropdownOpen(dropdown) {
    const currentDropdown = dropdown;
    const dropdownOptions = currentDropdown.querySelector(".dropdownOptions");

     if ( !currentDropdown.classList.contains("dropdownOpen") ) {
        dropdownClose();
        currentDropdown.classList.add("dropdownOpen");
        dropdownOptions.style.width = dropdownOptions.offsetWidth + "px"; // Empêche le décalage d'un pixel coupé
        currentDropdown.style.width = dropdownOptions.offsetWidth + "px";
     }
}

function dropdownToggle(dropdown) {
    const currentDropdown = dropdown;
    const dropdownOptions = currentDropdown.querySelector(".dropdownOptions");

    if ( !currentDropdown.classList.contains("dropdownOpen") ) {
        dropdownClose();
        currentDropdown.classList.add("dropdownOpen");
        dropdownOptions.style.width = dropdownOptions.offsetWidth + "px"; // Empêche le décalage d'un pixel coupé
        currentDropdown.style.width = dropdownOptions.offsetWidth + "px";
    } else {
        dropdownClose();
    }
}

function dropdownClose() {
    const dropdownCurrentlyOpen = document.querySelectorAll(".dropdownOpen");

    for (let i = 0; i < dropdownCurrentlyOpen.length; i++) {
        dropdownCurrentlyOpen[i].classList.remove("dropdownOpen");
        dropdownCurrentlyOpen[i].style.width = "";
    }
}

function generateDropdownList(list) {
    console.log("----------------------------------------------------------");
    const listItems = list.length / 3;
    const generatedList = document.createDocumentFragment();

    for (let i = 1; i < 4; i++) {
        console.log("I = "+i+"------");
        var ul = document.createElement("ul")
        // Formule pour savoir combien mettre d'objets à la ul
        var currentListItems = i===1 ? Math.ceil(listItems) :
        i===2 ? Math.round(listItems) :
        Math.floor(listItems); 

        for (let j = (i - 1) * currentListItems; j < i * currentListItems - 1; j++) {
            console.log("J = "+j);
            var li = document.createElement("li");
                  li.textContent = list[j];
            ul.appendChild(li);
        }
        
        generatedList.appendChild(ul);
    }

    return generatedList;
}

async function getDropdownsLists() {
    const ingredients = document.querySelector(".dropdown.ingredient");
    const appliance = document.querySelector(".dropdown.appliance");
    const utensil = document.querySelector(".dropdown.utensil");

    ingredients.querySelector(".dropdownOptions").appendChild(generateDropdownList(listOfIngredients));
    appliance.querySelector(".dropdownOptions").appendChild(generateDropdownList(listOfAppliances));
    utensil.querySelector(".dropdownOptions").appendChild(generateDropdownList(listOfUtensils));

}