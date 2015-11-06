import $ from "jquery";
import {Tournament} from "./tournament";

var tournament = new Tournament();

export function init() {
    $("#buttonAdd").click(addPlayerIfValid);
    $("#buttonCreate").click(generateTournament);
}

function addPlayerIfValid() {
    var player = getPlayerDataFromForms();
    var validationResult = tournament.validatePlayer(player);

    if (validationResult.success) {
        tournament.addPlayer(player);
        updateTable(player);
    } else {
        window.alert(validationResult.error);
    }
}

function getPlayerDataFromForms() {
    return {
        name: $("#fieldName").val(),
        rank: $("#fieldRank").val()
    };
}

function updateTable(player) {
    clearFields();
    addPlayerToHTMLTable(player);
}

function clearFields() {
    $("#fieldName").val("");
    $("#fieldRank").val("");
}

function addPlayerToHTMLTable(player) {
    $("#playerListBody").append(
        `<tr><td>${player.name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td><td>${player.rank}</td></tr>`
    );
}

function generateTournament() {
    if (tournament.players.length > 1) {
        tournament.generate();
        closeEnrollment();

    } else {
        window.alert("Too few players!");
    }
}

function closeEnrollment() {
    $("#buttonAdd").off();
    $("#buttonCreate").off();
}
