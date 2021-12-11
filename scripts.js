let gridRows = 16;
const GRID_SIZE_PIXELS = 640;
createGrid();
addEventListeners();

function addEventListeners() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.addEventListener('mouseover', (e) => {
        let currentColor = e.target.style.backgroundColor;
        if (currentColor == "") {
            e.target.style.backgroundColor = getRandomColor();
        }
        else {
            e.target.style.backgroundColor = getDarker(currentColor);
        }
    });
    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', () => {
        let newValue = window.prompt("Enter new grid size (maximum value 100", 16);
        if (isNaN(newValue) || newValue > 100 || newValue < 0) alert("Invalid Value");
        else {
            gridRows = newValue;
            createGrid();
        }
    });
}
function getDarker(color) {
    let colorValues = color.substring(4, color.length - 1).split(',');
    let red = Math.floor(colorValues[0] - (colorValues[0] * .1));
    let green = Math.floor(colorValues[1] - (colorValues[1] * .1));
    let blue = Math.floor(colorValues[2] - (colorValues[2] * .1));
    red < 1 ? red = 0 : red;
    green < 1 ? green = 0 : green;
    blue < 1 ? blue = 0 : blue;
    return `rgb(${red},${green},${blue})`;
}
function getRandomColor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgb(${red},${green},${blue})`;
}
function createGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    console.log(gridContainer);
    gridContainer.style.width = GRID_SIZE_PIXELS;
    gridContainer.style.height = GRID_SIZE_PIXELS;
    for (let rowIndex = 0; rowIndex < gridRows; rowIndex++) {
        let rowElement = document.createElement('div');
        rowElement.classList.add('grid-row');
        for (let columnIndex = 0; columnIndex < gridRows; columnIndex++) {
            let columnElement = document.createElement('div');
            columnElement.classList.add('grid-cell');
            columnElement.id = `${rowIndex}-${columnIndex}`;
            columnElement.style.width = `${Math.ceil(GRID_SIZE_PIXELS / gridRows)}px`;
            columnElement.style.height = `${Math.ceil(GRID_SIZE_PIXELS / gridRows)}px`;
            rowElement.appendChild(columnElement);
        }
        gridContainer.appendChild(rowElement);
    }
}