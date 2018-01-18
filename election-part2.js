const {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage,
} = require('./election');

const fetch = require('node-fetch');

class Voter {
    constructor(name,age,votingCard){
        this.name = name;
        this.age = age;
        this.votingCard = votingCard
    }
}
class Candidate extends Voter {
    constructor(name, age, votingCard, party) {
        super(name,age,votingCard);
        this.party = party;
        this.numVotes= 0;
    }
};
class Election {
    constructor(validVoters,candidates) {
        this.validVoters = validVoters;
        this.candidates = candidates;
        this.winner = " ";
    }

    runElection() {
        this.candidates = runElection(this.validVoters, this.candidates);
        this.getWinner();

    }
    getWinner() {
        this.winner = getWinner(this.candidates);
    };

    printWinnerMessage() {
        return  winnerMessage(this.winner);
    }
}

function fetchElectionData() {
    fetch("http://www.mocky.io/v2/5a55224b2d000088425b1ed8")
        .then(response => response.json())
        .then(data => {
            addVoters(data);
            createCandidates(data);
            let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));
            let validVoters = filterInvalidVoters(allVoters);
            let election = new Election(validVoters, candidates);

            election.runElection();
            console.log(election.printWinnerMessage());
        })
        .catch(err => console.log(err));
}

function addVoters(data){
    data.voters.forEach(person => {
        votingPopulation.push(new Voter(person.name, person.age, person.votingCard));
    })
}



function createCandidates(data){
    data.candidates.forEach(candidate => {
        candidates[candidate.id] = new Candidate(candidate.name, candidate.age, candidate.votingCard,candidate.party);
    })
}

let votingPopulation = [];
let candidates = {};
fetchElectionData();