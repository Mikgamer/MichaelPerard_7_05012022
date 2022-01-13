let lastInput = "";
let currentTimer;

function handleInput(event) {
    let input = event.currentTarget.value;
    if (input.includes(lastInput)) {
        recipesInputUpdate();
    } else {
        recipesTagUpdate();
    }
    lastInput = input;
}