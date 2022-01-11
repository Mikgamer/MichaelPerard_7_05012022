let lastInput = "";
let currentTimer;

function handleInput(event) {
    let input = event.currentTarget.value;
    timer(input, 500);
}

// Timer pour éviter trop de chargements
function timer(input, delay) {
    clearTimeout(currentTimer);
    currentTimer = setTimeout(
        () => { 
            input.includes(lastInput) ? recipesInputUpdate() : recipesTagUpdate();
            lastInput = input;
        },
        delay
    )
}