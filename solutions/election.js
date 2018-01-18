/**
 * 1 - Convert candidates object to array
 */
function candidatesObjToArray(candidates) {
    return Object.keys(candidates)
        .map(candidateId => candidates[candidateId]);
}

function filterInvalidVoters(voters) {

    function validVote(voter) {
        if (voter.votingCard.length !== 2
            || (new Set(voter.votingCard)).size !== voter.votingCard.length) return false;

        return true;
    }

    return voters.filter(voter => validVote(voter));
}

/**
* 3 - Add up all the votes cast by the voting population
*/
function runElection(voters, candidates) {
    voters.forEach(voter => {
        let vote = voter.votingCard;
        let weight = 1;

        vote.forEach(candidateId => {
            console.log(candidateId);
            candidates[candidateId].numVotes += weight;
            weight /= 2;
        });
    });

    return candidates;
}

/**
* 4 - After an election has been run, return the winner
*/
function getWinner(candidates) {
    let highestNumVotes = 0;
    let currentCandidate = '';

    Object.keys(candidates).forEach(candidateId => {

        if (currentCandidate === null) return;

        let numVotes = candidates[candidateId].numVotes;

        if (highestNumVotes < numVotes) {
            highestNumVotes = numVotes;
            currentCandidate = candidates[candidateId];
        } else if (highestNumVotes === numVotes) {
            currentCandidate = null;
        }
    });

    return currentCandidate;
}

/**
* 5 - Return a message including the name of the winner, and how many votes
* he/she received
*/
function winnerMessage(winner) {
    if (winner === null) {
        return 'The election was a draw!'
    }
    return winner.name + ' has won the election with ' + winner.numVotes + ' votes!';
}

// A sample population of a small number of voters, stored as an array
let votingPopulation = [
    {name: 'Jane Finnegan', age: 19, votingCard:[1,3]},
    {name: 'Norman Beracha', age: 35, votingCard: [3,4]},
    {name: 'Salome Kadek', age: 22, votingCard: [2,1,3]},
    {name: 'Wei Li', age: 19, votingCard: [1,2]},
    {name: 'Sam MacKinnon', age: 59, votingCard: [1,4]}
];

// The election candidates, stored as an object where each object key is the candidate ID, and the object
// value is the candidate object itself.
let candidates = {
    1: {name: 'Tamara Faiza', age: 46, votingCard: [1,1], party: 'Pizza Party', numVotes: 0},
    2: {name: 'Aylin Duke', age: 39, votingCard: [2,2], party: 'Foam Party', numVotes: 0},
    3: {name: 'Clay Roderick', age: 54, votingCard: [3,4], party: 'Flat Earth Party', numVotes: 0},
    4: {name: 'Nour al-Din', age: 32, votingCard: [4,1], party: 'Pizza Party', numVotes: 0}
};

module.exports = {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage
}


