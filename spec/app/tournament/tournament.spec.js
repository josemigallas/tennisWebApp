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

    function setMockedTournament(playersCount) {
        while (playersCount--) {
            tournament.addPlayer(new Player(`player${playersCount}`, playersCount));
        }
    }

    it('should return false when searching for a non-enrolled player', function() {
        expect( tournament.existsPlayer(spiderman) ).toBe(false);
    });

    it('should return true when searching for an enrolled player', function() {
        tournament.addPlayer(spiderman);

        expect( tournament.existsPlayer(spiderman) ).toBe(true);
    });

    it('should return a validation error when validating a player who is already enrolled', function() {
        tournament.addPlayer(spiderman);
        var validationResult = tournament.validatePlayer(spiderman);

        expect( validationResult.error.pop() ).toEqual("Player already enrolled");
        expect( validationResult.success ).toBe(false);
    });

    it('should not return any validation error when validating a player who is not yet enrolled', function() {
        tournament.addPlayer(spiderman);
        var validationResult = tournament.validatePlayer(batman);

        expect( validationResult.error.pop() ).toBeUndefined;
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

    it('should order its players by rank after generating', function() {
        tournament.addPlayer(new Player("playerRank5", 5));

        expect( tournament.players[0].rank ).toEqual(5);

        tournament.addPlayer(new Player("playerRank3", 3));

        expect( tournament.players[0].rank ).toEqual(5);
        expect( tournament.players[1].rank ).toEqual(3);

        tournament.addPlayer(new Player("playerRank1", 1));

        expect( tournament.players[0].rank ).toEqual(5);
        expect( tournament.players[1].rank ).toEqual(3);
        expect( tournament.players[2].rank ).toEqual(1);

        tournament.generate();

        expect( tournament.players[0].rank ).toEqual(1);
        expect( tournament.players[1].rank ).toEqual(3);
        expect( tournament.players[2].rank ).toEqual(5);
    });

    it('should have 3 rounds if it has 8 players', function() {
        setMockedTournament(8);
        tournament.generate();

        expect( tournament.getNumberOfRounds() ).toEqual(3);
    });

    it('should have two round 1 matches with a round 2 child if it has 4 players', function() {
        setMockedTournament(4);
        tournament.generate();

        var leftMatch = tournament.matches[0];
        var rightMatch = tournament.matches[1];

        expect( leftMatch.round ).toEqual(1);
        expect( leftMatch.nextMatch.round ).toEqual(2);

        expect( rightMatch.round ).toEqual(1);
        expect( rightMatch.nextMatch.round ).toEqual(2);
    });

    it('should have a final match between Spiderman and Batman if The Thing is defeated during first round', function() {
        tournament.addPlayer(theThing);
        tournament.addPlayer(spiderman);
        tournament.addPlayer(batman);
        tournament.generate();

        tournament.matches[0].setWinner(0);
        tournament.matches[1].setWinner(0);

        expect( tournament.matches[2].players[0].name ).toEqual(batman.name);
        expect( tournament.matches[2].players[1].name ).toEqual(spiderman.name);
    });
});
