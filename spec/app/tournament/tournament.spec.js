import {Tournament} from "../../../app/tournament/tournament";
import {Player} from "../../../app/tournament/player";

describe('class Tournament', function() {

    var player = new Player("Spiderman", 5);
    var tournament = new Tournament();

    beforeEach( function() {
        tournament = new Tournament();
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

    it('should need to add some ghost players having only 3 players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);

        expect( tournament.needGhostPlayers() ).toBe(true);
    });

    it('should not need any ghost player having a 2^n-number of players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);

        expect( tournament.needGhostPlayers() ).toBe(false);

        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);

        expect( tournament.needGhostPlayers() ).toBe(true);

        tournament.addPlayer(player);
        tournament.addPlayer(player);

        expect( tournament.needGhostPlayers() ).toBe(false);
    });

    it('should add 1 ghost player generating a tournament with 3 players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        expect( tournament.players.length ).toEqual(4);
    });

    it('should add 3 ghost player generating a tournament with 5 players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        expect( tournament.players.length ).toEqual(8);
    });

    it('generating a tournament with 2 players should create 1 match', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        expect(tournament.matches.length).toEqual(1);
    });

    it('generating a tournament with 4 players should create 3 matches', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        expect(tournament.matches.length).toEqual(3);
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

        expect(tournament.matches[0].round).toEqual(3);
    });

    it('should have a round 2 match with two round 1 parents if it has 4 players', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        expect(tournament.matches[0].round).toEqual(2);
        expect(tournament.matches[0].parents[0].round).toEqual(1);
        expect(tournament.matches[0].parents[1].round).toEqual(1);
        expect(tournament.matches[0].parents[0].parents.length).toEqual(0);
        expect(tournament.matches[0].parents[1].parents.length).toEqual(0);
    });

    it('should pair up players in all round 1 matches', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        tournament.matches.forEach( function(match) {
            if (match.round == 1) {
                expect(match.players.length).toEqual(2);
            } else {
                expect(match.players.length).toEqual(0);
            }
        });
    });

    it('should have every round 1 match two players after generating', function() {
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.addPlayer(player);
        tournament.generate();

        tournament.matches.forEach( function(match) {
            if (match.round == 1) {
                expect(match.players[0] instanceof Player).toBe(true);
            }
        });
    });
});
