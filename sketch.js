/**
 * sketch.js
 * 12/Dec/2021
 * Author: Victor Peralta
 *      victor.peralta.gomez@gmail.com
 *  class Sketh
 */
export class Sketch {
    #GRID_SIZE_PIXELS = 640;
    #gridRows = 16;
    constructor() {
        this.#addEventListeners();
    }

    createGrid() {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.innerHTML = '';
        gridContainer.style.width = this.#GRID_SIZE_PIXELS;
        gridContainer.style.height = this.#GRID_SIZE_PIXELS;
        for (let rowIndex = 0; rowIndex < this.#gridRows; rowIndex++) {
            let rowElement = document.createElement('div');
            rowElement.classList.add('grid-row');
            for (let columnIndex = 0; columnIndex < this.#gridRows; columnIndex++) {
                let columnElement = document.createElement('div');
                columnElement.classList.add('grid-cell');
                columnElement.id = `${rowIndex}-${columnIndex}`;
                columnElement.style.width = `${Math.ceil(this.#GRID_SIZE_PIXELS / this.#gridRows)}px`;
                columnElement.style.height = `${Math.ceil(this.#GRID_SIZE_PIXELS / this.#gridRows)}px`;
                rowElement.appendChild(columnElement);
            }
            gridContainer.appendChild(rowElement);
        }
    }

    #addEventListeners() {
        const gridContainer = document.getElementById('grid-container');
        gridContainer.addEventListener('mouseover', (e) => {
            let currentColor = e.target.style.backgroundColor;
            if (currentColor == "") {
                e.target.style.backgroundColor = this.#getRandomColor();
            }
            else {
                e.target.style.backgroundColor = this.#getDarker(currentColor);
            }
        });
        const resetButton = document.getElementById('reset-button');
        resetButton.addEventListener('click', () => {
            let newValue = window.prompt("Enter new grid size (maximum value 100", this.#gridRows);
            if (isNaN(newValue) || newValue > 100 || newValue < 1) alert("Invalid Value");
            else {
                this.#gridRows = newValue;
                this.createGrid();
            }
        });
    }

    #getDarker(color) {
        let colorValues = color.substring(4, color.length - 1).split(',');
        let red = Math.floor(colorValues[0] - (colorValues[0] * .1));
        let green = Math.floor(colorValues[1] - (colorValues[1] * .1));
        let blue = Math.floor(colorValues[2] - (colorValues[2] * .1));
        red < 1 ? red = 0 : red;
        green < 1 ? green = 0 : green;
        blue < 1 ? blue = 0 : blue;
        return `rgb(${red},${green},${blue})`;
    }

    #getRandomColor() {
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        return `rgb(${red},${green},${blue})`;
    }
}
