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
    const listItems = list.length / 3;
    const generatedList = document.createDocumentFragment();

    for (let i = 1; i < 4; i++) {
        var ul = document.createElement("ul")
        // Formule pour savoir combien mettre d'objets à la ul
        var currentListItems = i===1 ? Math.ceil(listItems) :
        i===2 ? Math.round(listItems) :
        Math.floor(listItems); 

        for (let j = (i - 1) * currentListItems; j < i * currentListItems - 1; j++) {
            var li = document.createElement("li");
                li.setAttribute("onclick", "addDropdownFilter(event)")
                li.textContent = list[j];
            ul.appendChild(li);
        }
        
        generatedList.appendChild(ul);
    }

    return generatedList;
}

function createDropdownFilterCard(text, type) {
    const filter = document.createElement("span");
          filter.classList.add("filter", type);
          filter.textContent = text;
        const img = document.createElement("img");
              img.src = "assets/icons/delete.svg"
              img.alt = "";
              img.setAttribute("onclick", "removeDropdownFilter(event)")
        filter.appendChild(img);
    return filter;
}

function addDropdownFilter(event) {
    const target = event.currentTarget;
    const text = target.textContent;
    const type = target.parentNode.parentNode.parentNode.dataset.type;
    const selectedFilters = document.querySelector(".filtersSelected");
    
    if (!dropdownFilterList.has(text)) {
        dropdownFilterList.add(text);
        selectedFilters.appendChild(createDropdownFilterCard(text, type));
    }

    if (dropdownFilterList.size>0) {
        selectedFilters.style.display = "flex";
    } else { selectedFilters.style.display = ""; }
}

function removeDropdownFilter(event) {
    const target = event.currentTarget;
    const text = target.parentNode.textContent;
    const selectedFilters = document.querySelector(".filtersSelected");

    if (dropdownFilterList.has(text)) {
        dropdownFilterList.delete(text);
        target.parentNode.outerHTML = "";
    }

    if (dropdownFilterList.size>0) {
        selectedFilters.style.display = "flex";
    } else { selectedFilters.style.display = ""; }
}

async function getDropdownsLists() {
    const ingredients = document.querySelector(".dropdown.ingredient .dropdownOptions");
    const appliance = document.querySelector(".dropdown.appliance .dropdownOptions");
    const utensil = document.querySelector(".dropdown.utensil .dropdownOptions");

    ingredients.appendChild(generateDropdownList(listOfIngredientsFiltered));
    appliance.appendChild(generateDropdownList(listOfAppliancesFiltered));
    utensil.appendChild(generateDropdownList(listOfUtensilsFiltered));
}