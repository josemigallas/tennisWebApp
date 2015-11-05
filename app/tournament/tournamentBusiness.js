import $ from "jquery";
import {Tournament} from "./tournament";
import {Player} from "./player";

var tournament = new Tournament();

export function init() {
    $("#buttonAdd").click(addPlayerIfValid);
    $("#buttonCreate").click(generateTournament);
}

function addPlayerIfValid() {
    var info = getPlayerInfo();

    try {
        var player = new Player(info.name, info.rank);
        tournament.addPlayer(player);
        updateTable(player);

    } catch (e) {
        window.alert("Not a valid player");
    }
}

function getPlayerInfo() {
    return {
        name: $("#fieldName")[0].value,
        rank: $("#fieldRank")[0].value
    }
}

function updateTable(player) {
    clearFields();
    addPlayerToTable(player);
}

function clearFields() {
    $("#fieldName")[0].value = "";
    $("#fieldRank")[0].value = "";
}

function addPlayerToTable(player) {
    $("#playerListBody").append(composeHTMLTableRowForPlayer(player));
}

var composeHTMLTableRowForPlayer = function(player) {
    return `<tr><td>${player.name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td><td>${player.rank}</td></tr>`;
}

function generateTournament() {
    try {
        tournament.generate();
        closeEnrollment();

    } catch (e) {
        window.alert("Too few players!");
    }
}

function closeEnrollment() {
    $("#buttonAdd").off();
    $("#buttonCreate").off();
}
