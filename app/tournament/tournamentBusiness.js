import $ from "jquery";
import * as tournament from "./tournament";
import * as player from "./player";

var mTournament = new tournament.Tournament();

export function init() {
    $("#buttonAdd").click(addPlayerIfValid);
    $("#buttonCreate").click(generateTournament);
}

function addPlayerIfValid() {
    var info = getPlayerInfo();

    try {
        var newPlayer = new player.Player(info.name, info.rank);
        mTournament.addPlayer(newPlayer);
        updateTable(newPlayer);

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
    $("#playerListBody").append(newRow(player));
}

var newRow = (player) => `<tr><td>${player.name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td><td>${player.rank}</td></tr>`;

function generateTournament() {
    try {
        mTournament.generate();
        closeEnrollment();

    } catch (e) {
        window.alert("Too few players!");
    }
}

function closeEnrollment() {
    $("#buttonAdd").off();
    $("#buttonCreate").off();
}
