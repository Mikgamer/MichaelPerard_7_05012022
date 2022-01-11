let lastInput = "";
let currentTimer;

function handleInput(event) {
    let input = event.currentTarget.value;
    // Timer pour éviter trop de chargements
    clearTimeout(currentTimer);
    currentTimer = setTimeout(
        () => { 
            input.includes(lastInput) ? recipesInputUpdate() : recipesTagUpdate();
            lastInput = input;
        },
        500
    )
}

function handleDropdownInput(event) {
    // Timer pour éviter trop de chargements
    clearTimeout(currentTimer);
    currentTimer = setTimeout(
        () => { 
            getDropdownsLists();
        },
        500
    )
}