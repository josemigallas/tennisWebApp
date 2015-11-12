import {Tournament} from "../../../app/tournament/tournament";
import {Player} from "../../../app/tournament/player";

describe('class Tournament', function() {

    var spiderman = new Player("Spiderman", 1);
    var batman = new Player("Batman", 3);
    var theThing = new Player("The Thing", 5);

    var tournament;

    beforeEach( function() {
        tournament = new Tournament();
    });

    function setMockedTournament(players) {
        while (players--) {
            tournament.addPlayer(spiderman);
        }
    }

    it('should return false when searching for a non-enrolled player', function() {
        expect( tournament.existsPlayer(spiderman) ).toBeUndefined();
    });

    it('should return a validation error when validating a player who is already enrolled', function() {
        tournament.addPlayer(spiderman);
        var validationResult = tournament.validatePlayer(spiderman);

        expect( validationResult.error ).toEqual("Player already enrolled");
    });

    it('should return an unsuccessful validation when validating a player who is already enrolled', function() {
        tournament.addPlayer(spiderman);
        var validationResult = tournament.validatePlayer(spiderman);

        expect( validationResult.success ).toBe(false);
    });

    it('should not return any validation error when validating a player who is not yet enrolled', function() {
        tournament.addPlayer(spiderman);
        var validationResult = tournament.validatePlayer(batman);

        expect( validationResult.error ).toEqual("");
    });

    it('should return a successful validation when validating a player who is not yet enrolled', function() {
        tournament.addPlayer(spiderman);
        var validationResult = tournament.validatePlayer(batman);

        expect( validationResult.success ).toBe(true);
    });

    it('should create 1 match generating with 2 players', function() {
        tournament.addPlayer(spiderman);
        tournament.addPlayer(batman);
        tournament.generate();

        expect( tournament.matches.length ).toEqual(1);
    });

    it('should create 3 match generating with 4 players', function() {
        setMockedTournament(4)
        tournament.generate();

        expect( tournament.matches.length ).toEqual(3);
    });

    it('should order its players by rank after adding a new player', function() {
        tournament.addPlayer(theThing);

        expect( tournament.players[0].rank ).toEqual(5);

        tournament.addPlayer(batman);

        expect( tournament.players[0].rank ).toEqual(3);
        expect( tournament.players[1].rank ).toEqual(5);

        tournament.addPlayer(spiderman);

        expect( tournament.players[0].rank ).toEqual(1);
        expect( tournament.players[1].rank ).toEqual(3);
        expect( tournament.players[2].rank ).toEqual(5);
    });

    it('should have 3 rounds if it has 8 players', function() {
        setMockedTournament(8);
        tournament.generate();

        expect( tournament.getRounds() ).toEqual(3);
    });

    it('should have two round 1 matches with a round 2 child if it has 4 players', function() {
        setMockedTournament(4);
        tournament.generate();

        expect( tournament.matches[0].round ).toEqual(1);
        expect( tournament.matches[0].nextMatch.round ).toEqual(2);
        expect( tournament.matches[1].round ).toEqual(1);
        expect( tournament.matches[1].nextMatch.round ).toEqual(2);
    });

    it('should have a final match between Spiderman and Batman if The Thing is defeated during first round', function() {
        tournament.addPlayer(theThing);
        tournament.addPlayer(spiderman);
        tournament.addPlayer(batman);
        tournament.generate();

        // Tournament generated:
        // Round 1:
        //      match[0]:(batman[0] vs theThing[1])
        //      match[1]:(spiderman[0] vs ...[1])
        //
        //      Round 2:
        //          match[2]:(...[0] vs ...[1])
        tournament.matches[0].setWinner(0);
        tournament.matches[1].setWinner(0);

        expect( tournament.matches[2].players[0].name ).toEqual(batman.name);
        expect( tournament.matches[2].players[1].name ).toEqual(spiderman.name);
    });
});
