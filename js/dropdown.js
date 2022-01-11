document.querySelector("body").ondragstart = () => {return false}; // Empêche les images d'être déplacées

function dropdownOpen(dropdown) {
    if ( !dropdown.classList.contains("dropdownOpen") ) {
       dropdownClose();
       dropdown.classList.add("dropdownOpen");
       dropdownResize();
    }
}

function dropdownToggle(dropdown) {
    if ( !dropdown.classList.contains("dropdownOpen") ) {
        dropdownClose();
        dropdown.classList.add("dropdownOpen");
        dropdownResize();
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

function dropdownResize() {
    const dropdown = document.querySelectorAll(".dropdown");

    for (let i = 0; i < dropdown.length; i++) {
        const dropdownOptions = dropdown.item(i).querySelector(".dropdownOptions");
        dropdownOptions.style.width = "";
        dropdownOptions.style.width = dropdownOptions.offsetWidth + "px"; // Empêche le décalage d'un pixel coupé
        dropdown[i].style.width = dropdownOptions.offsetWidth + "px";
    }
}

function generateDropdownList(list) {
    const listItems = list.length / 3;
    const generatedList = document.createDocumentFragment();

    for (let i = 1; i < 4; i++) {
        var ul = document.createElement("ul")
        // Formule pour savoir combien mettre d'objets à la ul
        let currentListItems = i===1 ? Math.ceil(listItems) :
        i===2 ? Math.round(listItems) :
        Math.floor(listItems);

        for (let j = (i - 1) * currentListItems; j <= (i * currentListItems) - 1; j++) {
            var li = document.createElement("li");
                li.setAttribute("onclick", "addDropdownFilter(event)")
                li.textContent = list[j];
            ul.appendChild(li);
        }
        
        generatedList.appendChild(ul);
    }

    setTimeout(() => dropdownResize(),50);

    return generatedList;
}

function createDropdownFilterCard(text, type) {
    const filter = document.createElement("span");
          filter.classList.add("filter", type);
          filter.textContent = text[0].toUpperCase() + text.slice(1);;
          filter.dataset.type = type;
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
    
    const listType = type === "ingredient" ? listOfIngredientsSelected : 
    type === "appliance" ? listOfAppliancesSelected : 
    type === "utensil" ? listOfUtensilsSelected : "";

    if (!listType.has(text)) {
        listType.add(text);
        selectedFilters.appendChild(createDropdownFilterCard(text, type));
        recipesTagUpdate();
    }

    if (listOfIngredientsSelected.size + listOfAppliancesSelected.size + listOfUtensilsSelected.size >0) {
        selectedFilters.style.display = "flex";
    } else { selectedFilters.style.display = ""; }
}

function removeDropdownFilter(event) {
    const target = event.currentTarget;
    const text = target.parentNode.textContent[0].toLowerCase() + target.parentNode.textContent.slice(1);
    const type = target.parentNode.dataset.type;
    const selectedFilters = document.querySelector(".filtersSelected");
    
    const listType = type === "ingredient" ? listOfIngredientsSelected : 
    type === "appliance" ? listOfAppliancesSelected : 
    type === "utensil" ? listOfUtensilsSelected : "";

    if (listType.has(text)) {
        listType.delete(text);
        target.parentNode.outerHTML = "";
        recipesTagReload();
    }

    if (listOfIngredientsSelected.size + listOfAppliancesSelected.size + listOfUtensilsSelected.size >0) {
        selectedFilters.style.display = "flex";
    } else { selectedFilters.style.display = ""; }
}

async function getDropdownsLists() {
    const ingredients = document.querySelector(".dropdown.ingredient .dropdownOptions");
    const appliance = document.querySelector(".dropdown.appliance .dropdownOptions");
    const utensil = document.querySelector(".dropdown.utensil .dropdownOptions");

    ingredients.innerHTML = appliance.innerHTML = utensil.innerHTML = "";

    dropdownFilterInput();
    
    ingredients.appendChild(generateDropdownList(listOfIngredientsFilteredSearch));
    appliance.appendChild(generateDropdownList(listOfAppliancesFiltered));
    utensil.appendChild(generateDropdownList(listOfUtensilsFiltered));
}