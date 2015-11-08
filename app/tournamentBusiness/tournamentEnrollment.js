import bootstrap from "bootstrap";
import $ from "jquery";
import {Tournament} from "../tournament/tournament";
import * as tournamentProgress from "./tournamentProgress";
import * as tournamentAlerts from "./tournamentAlerts";

var tournament = new Tournament();

export function init() {
    $("#buttonAdd").click(addPlayerIfValid);
    $("#buttonCreate").click(generateTournament);
}

function addPlayerIfValid() {
    var player = getPlayerDataFromForms();
    var validationResult = tournament.validatePlayer(player);

    if (validationResult.success) {
        addPlayerAndRefreshTable(player);
    } else {
        tournamentAlerts.showValidationError(validationResult);
    }
}

function getPlayerDataFromForms() {
    return {
        name: $("#fieldName").val(),
        rank: $("#fieldRank").val()
    };
}

function addPlayerAndRefreshTable(player) {
    tournament.addPlayer(player);
    updateTable();
}

function updateTable() {
    clearFields();
    refreshHTMLTableWithSortedPlayers();
}

function clearFields() {
    $("#fieldName").val("");
    $("#fieldRank").val("");
}

function refreshHTMLTableWithSortedPlayers() {
    $("#playerListBody").empty();
    tournament.players.forEach( function(player) {
        $("#playerListBody").append(
            `<tr><td>${player.name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td><td>${player.rank}</td></tr>`
        );
    })
}

function generateTournament() {
    if (tournament.players.length > 1) {
        tournament.generate();
        closeEnrollment();
        tournamentProgress.init(tournament);

    } else {
        tournamentAlerts.showNotEnoughPlayers();
    }
}

function closeEnrollment() {
    $("#newPlayerRowContainer").collapse("hide");
    $("#buttonCreateContainer").collapse("hide");
}
