export function getAndRemoveItemRandomlyFromArray(array) {
    var randomIndex = getRandomInt(0, array.length);
    return array.splice(randomIndex, 1)[0];
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
