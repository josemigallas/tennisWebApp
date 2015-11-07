import {Tournament} from "../../../app/tournament/tournament";
import {Player} from "../../../app/tournament/player";

describe('class Tournament', function() {

    var player = new Player("Spiderman", 5);
    var tournament = new Tournament();

    beforeEach( function() {
        tournament = new Tournament();
    });

    it('should return false when searching for a non-enrolled player', function() {
        expect( tournament.existsPlayer(player) ).toBeUndefined();
    });

    it('should return a validation error when validating a player who is already enrolled', function() {
        tournament.addPlayer(player);
        var validationResult = tournament.validatePlayer(player);

        expect( validationResult.error ).toEqual("Player already enrolled");
    });

    it('should return an unsuccessful validation when validating a player who is already enrolled', function() {
        tournament.addPlayer(player);
        var validationResult = tournament.validatePlayer(player);

        expect( validationResult.success ).toBe(false);
    });

    it('should create 1 match generating with 2 players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        expect( tournament.matches.length ).toEqual(1);
    });

    it('should create 3 match generating with 4 players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        expect( tournament.matches.length ).toEqual(3);
    });

    it('should order its players by descending rank after generating', function() {
        tournament.addPlayer(new Player("Spiderman", 3));
        tournament.addPlayer(new Player("Batman", 5));
        tournament.addPlayer(new Player("The Thing", 1));

        expect( tournament.players[0].rank ).toEqual(3);
        expect( tournament.players[1].rank ).toEqual(5);
        expect( tournament.players[2].rank ).toEqual(1);

        tournament.generate();

        expect( tournament.players[0].rank ).toEqual(1);
        expect( tournament.players[1].rank ).toEqual(3);
        expect( tournament.players[2].rank ).toEqual(5);
    });

    it('should have 3 rounds if it has 8 players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        expect( tournament.matches.pop().round ).toEqual(3);
    });

    it('should have a round 2 match with two round 1 parents if it has 4 players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();
        var lastMatch = tournament.matches.pop();

        expect( lastMatch.round ).toEqual(2);
        expect( lastMatch.parents[0].round ).toEqual(1);
        expect( lastMatch.parents[1].round ).toEqual(1);
    });

    it('should have a final match between Spiderman and Batman if The Thing is defeated during first round', function() {
        var theThing = new Player("The Thing", 3);
        var spiderman = new Player("Spiderman", 1);
        var batman = new Player("Batman", 2);

        tournament.addPlayer(theThing);
        tournament.addPlayer(spiderman);
        tournament.addPlayer(batman);
        tournament.generate();

        tournament.matches[2].setWinnerFromParent(1, 0);

        var lastMatch = tournament.matches.pop();

        expect( lastMatch.players[0].name ).toEqual(spiderman.name);
        expect( lastMatch.players[1].name ).toEqual(batman.name);
    });
});
