export function spliceItemRandomly(array) {
    return array.splice(getRandomInt(0, array.length), 1)[0];
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function isPowerOfTwo(num) {
    return (num & (num - 1)) == 0;
}

export function findNextHigherPowerOfTwo(num) {
    var nextPowerOfTwo = 1;
    while (nextPowerOfTwo <= num) {
        nextPowerOfTwo *= 2;
    }
    return nextPowerOfTwo;
}
