const fetch = require('node-fetch');

// Importing the functions from what you did in part 1.
const {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage,
} = require('./election');


/**
 * 1 - Write a Voter class modelling a member of the population who votes in the election.
 */
class Voter {
    constructor(name, age, vote) {
        this.name = name;
        this.age = age;
        this.votingCard = vote;
    }
}


/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */
class Candidate extends Voter {
    constructor(name, age, party, vote) {
        super(name, age, vote);
        this.party = party;
        this.numVotes = 0;
    }
}


/**
 * 3 - Write an Election class which models the election.
 */
class Election {
    constructor(voters, candidates) {
        this.voters = voters;
        this.candidates = candidates;
        this.winner = null;
    }

    // After an election has been run, get the winner and store in this.winner.
    // This method is private and shouldn't be accessed outside the class.
    getWinner() {
        this.winner = getWinner(this.candidates);
    }

    // Tally up all the votes from the population of voters stored in this.voters. For each iteration of a voter, a new loop is required
    // to iterate over the votes cast by the voter. For two adjacent votes in the array, the right vote has half the weight of the left.
    runElection() {
        this.candidates = runElection(this.voters, this.candidates);
        this.getWinner();
    }
}

let votingPopulation = [];
let candidates = {};

function fetchVoterData() {
    return fetch("http://www.mocky.io/v2/5a55224b2d000088425b1ed8")
        .then(response => response.json())
        .catch(err => console.log(err));
}

fetchVoterData().then(data => {
    data["voters"].forEach(voter => {
        votingPopulation.push(new Voter(voter["name"], voter["age"], voter["votingCard"]));
    });
    data["candidates"].forEach(candidate => {
        candidates[candidate["id"]] = new Candidate(candidate["name"], candidate["age"], candidate["party"], candidate["votingCard"]);
    });

    let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

    let validVoters = filterInvalidVoters(allVoters);

    let election = new Election(validVoters, candidates);

    election.runElection(); // Example of how runElection() can be called.

    console.log(election.voters);

    console.log(election.winner);
});
