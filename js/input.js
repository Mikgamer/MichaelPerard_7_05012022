let lastInput = "";
let currentTimer;

function handleInput(event) {
    let input = event.currentTarget.value;
    input.includes(lastInput) ? recipesInputUpdate() : recipesTagUpdate();
    lastInput = input;
}