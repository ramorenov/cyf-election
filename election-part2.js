
const {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage,
} = require('./election');

//document.getElementById('fetchMe').addEventListener('click',fetchData);


const fetch = require('node-fetch');
let candidates = {
    // 1 :new Candidate ('Tamara Faiza',46, [1,1], 'Pizza Party'),
    // 2 :new Candidate ('Aylin Duke', 39,[2,2],  'Foam Party'),
    // 3 :new Candidate('Clay Roderick',54, [3,4],  'Flat Earth Party'),
    // 4 :new Candidate( 'Nour al-Din',32, [4,1], 'Pizza Party')
};
let votingPopulation = [
    new Voter('Jane Finnegan', 19, [1,3]),
    new Voter('Norman Beracha', 35, [3,4]),
    new Voter('Salome Kadek', 22, [2,1,3]),
    new Voter('Wei Li', 19, [1,2]),
    new Voter('Sam MacKinnon', 59, [1,4])
    ];
function fetchElectionData() {
    fetch("http://www.mocky.io/v2/5a55224b2d000088425b1ed8")
        .then(response => response.json())
        .then(data =>addVoters())
        .then(data =>candidates())
        .then(filterInvalidVoters() )
        .then(runElection())
        .then(getWinner())
        .then(winnerMessage())
        .catch(err => console.log(err));
        };

function addVoters(data){
    data.voters.forEach(person => {
        votingPopulation.push(new Voter(person.name, person.age, person.votingCard));
    })
}
        


function candidates(data){
    data.candidates.forEach(candidates => {
        candidates.push(new Candidate(candidates.name, candidates.age, candidates.votingCard,candidates.party));
    })
}        
       

        fetchElectionData();



/**
 * 1 - Write a Voter class modelling a member of the population 
 * who votes in the election.
 */
class Voter {
    constructor(name,age,votingCard){
        this.name = name;
        this.age = age;
        this.votingCard = votingCard
    }
}



/**
 * 2 - Write a Candidate class modelling a candidate 
 * in the election. Candidates are also voters (they 
 * can vote for themselves, or anyone else).
 * However they have some extra properties.
 */

class Candidate extends Voter {
	constructor(name, age, votingCard, party) {
		super(name,age,votingCard);
        this.party = party;
        this.numVotes= 0;
	}
};


/**
 * 3 - Write an Election class which models the election.
 */
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




let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);

let election = new Election(validVoters, candidates);

election.runElection(); // Example of how runElection() can be called.

console.log(election.printWinnerMessage()); // Example of how the winner message can be printed.


