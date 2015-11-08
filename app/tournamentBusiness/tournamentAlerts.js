import bootstrap from "bootstrap";
import $ from "jquery";

export function showNotEnoughPlayers() {
    showCustomAlert(
        "Not enough players",
        "The tournament cannot be arrange with less than 2 players."
    );
}

export function showValidationError(validationResult) {
    showCustomAlert(
        "Not a valid player",
        validationResult.error
    )
}

export function showMatchNotFinished() {
    showCustomAlert(
        "The match has not even started yet!",
        "Please be patient."
    );
}

export function showWinner(player) {
    showCustomAlert(
        "Holy cats!",
        "player.name won the tournament!"
    )
}

export default function showCustomAlert(title, msg) {
    $("#alertTitle").empty();
    $("#alertMessage").empty();

    $("#alertTitle").append(title);
    $("#alertMessage").append(msg);

    $("#alertModal").modal("show");
}
