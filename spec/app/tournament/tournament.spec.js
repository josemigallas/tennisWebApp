import * as player from "../../../app/tournament/player";
import * as tournament from "../../../app/tournament/tournament";

describe('class Tournament', function() {
    it('adding a second players with same name should throw an error', function() {
        var mPlayer = new player.Player("pepe", 2);
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(mPlayer);
        expect( function() {mTournament.addPlayer(mPlayer)} ).toThrow(new tournament.TournamentError(`Duplicate player: "${player.name}".`));
    });

    it('generating a tournament with less than 2 players throw an error', function() {
        var mTournament = new tournament.Tournament();
        expect( function() {mTournament.generate()} ).toThrow(new tournament.TournamentError(`Too few players: ${mTournament.players.length}`));

        mTournament.addPlayer(new player.Player("Spiderman", 1));
        expect( function() {mTournament.generate()} ).toThrow(new tournament.TournamentError(`Too few players: ${mTournament.players.length}`));
    });

    it('a total of 3 players should not be a proper number', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        expect(mTournament.hasProperNumberOfPlayers()).toEqual(false);
    });

    it('a total of 4 players should not be a proper number', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        expect(mTournament.hasProperNumberOfPlayers()).toEqual(true);
    });

    it('generating a tournament with 4 players should not add any ghost player', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        mTournament.generate();
        expect(mTournament.players.length).toEqual(4);
    });

    it('generating a tournament with 3 players should add 1 ghost player', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.generate();
        expect(mTournament.players.length).toEqual(4);
    });

    it('generating a tournament with 5 players should add 3 ghost player', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        mTournament.addPlayer(new player.Player("Sandman", 1));
        mTournament.generate();
        expect(mTournament.players.length).toEqual(8);
    });

    it('generating a tournament with 2 players should create 1 matches', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.generate();
        expect(mTournament.matches.length).toEqual(1);
    });

    it('generating a tournament with 4 players should create 3 matches', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        mTournament.generate();
        expect(mTournament.matches.length).toEqual(3);
    });

    it('should have 3 rounds if it has 8 players', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        mTournament.addPlayer(new player.Player("Thor", 1));
        mTournament.addPlayer(new player.Player("The Thing", 1));
        mTournament.addPlayer(new player.Player("Sandman", 1));
        mTournament.addPlayer(new player.Player("Hiro Nakamura", 1));
        mTournament.generate();
        expect(mTournament.rounds).toEqual(3);
    });

    it('should have a round 2 match with two round 1 parents if it has 4 players', function() {
        var mTournament = new tournament.Tournament();
        mTournament.addPlayer(new player.Player("Spiderman", 1));
        mTournament.addPlayer(new player.Player("Batman", 1));
        mTournament.addPlayer(new player.Player("Ironman", 1));
        mTournament.addPlayer(new player.Player("Wolverine", 1));
        mTournament.generate();
        expect(mTournament.matches[0].round).toEqual(2);
        expect(mTournament.matches[0].parents[0].round).toEqual(1);
        expect(mTournament.matches[0].parents[1].round).toEqual(1);
        expect(mTournament.matches[0].parents[0].parents.length).toEqual(0);
        expect(mTournament.matches[0].parents[1].parents.length).toEqual(0);
    });
});
