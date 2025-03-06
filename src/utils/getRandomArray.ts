function getRandomArray(): number[] {
    const randomArray: number[] = [];
    for (let i = 0; i < 10; i++) {
        const randomNumber = Math.floor(Math.random() * 165);
        randomArray.push(randomNumber);
    }
    return randomArray;
}

export default getRandomArray;