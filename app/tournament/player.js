export class Player {
    constructor(name, rank) {
        this.name = name;
        this.rank = rank;
    }
}

export function validatePlayer(player) {
    var validationResult = { error: [] };

    if (!player.name) {
        validationResult.error.push("Name cannot be empty.");
    }

    if (player.rank < 1) {
        validationResult.error.push("Rank has to be greater than 0.");
    }

    validationResult.success = validationResult.error.length === 0;

    return validationResult;
}
