"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomArray() {
    const randomArray = [];
    for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 165);
        randomArray.push(randomNumber);
    }
    return randomArray;
}
exports.default = getRandomArray;
