let lastInput = "";
let currentTimer;

function handleInput(event) {
    let input = event.currentTarget.value;
    input.length >= 3 ? timer(input, 500) : undefined;
    lastInput = input;
}

// Timer pour éviter trop de chargements
function timer(input, delay) {
    clearTimeout(currentTimer);
    currentTimer = setTimeout(
        () => { input.includes(lastInput) ? recipesInputUpdate() : recipesInputReload() },
        delay
    )
}