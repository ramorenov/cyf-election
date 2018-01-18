// Importing the functions from what you did in part 1.
const {
  candidatesObjToArray,
  filterInvalidVoters,
  runElection,
  getWinner,
  winnerMessage
} = require("./election");

/**
 * 1 - Write a Voter class modelling a member of the population who votes in the election.
 */

class Voter {
  constructor(name, age, votingCard) {
    this.name = name;
    this.age = age;
    this.votingCard = votingCard;
  }
}
/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */

class candidate extends Voter {
  constructor(name, age, votingCard, party, numVotes) {
    this.party = party;
    this.numVotes = numVotes;
    super(name, age, votingCard);
  }
}
/**
 * 3 - Write an Election class which models the election.
 */
class Election {
  constructor(validVoters, candidate, winner) {
    this.validVoters;
    this.candidates;
    this.winner;
  }
  runElection() {
    this.candidates = runElection(this.winner);
  }
  getWinner() {
    this.winner = getWinner(this.candidates);
  }
  printWinnerMessage() {
    return winnerMessage(this.winner);
  }
}

// Include your votingPopulation array here.
let votingPopulation = [
  new voter("Jane Finnegan", 19, [1, 3]),
  new Voter("Norman Beracha", 35, [3, 4]),
  new Voter("Salome Kadek", 22, [2, 1, 3]),
  new Voter("Wei Li", 19, [1, 2]),
  new Voter("Sam MacKinnon", 59, [1, 4])
];

// Include your candidates object here.
let candidates = {
  1: new candidate("Tamara Faiza", 46, [1, 1], "Pizza Party", 0),
  2: new candidate("Aylin Duke", 39, [2, 2], "Foam Party", 0),
  3: new candidate("Clay Roderick", 54, [3, 4], "Flat Earth Party", 0),
  4: new candidate("Nour al-Din", 32, [4, 1], "Pizza Party", 0)
};

let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);

let election = new Election(validVoters, candidates);

election.runElection(); // Example of how runElection() can be called.

console.log(election.printWinnerMessage()); // Example of how the winner message can be printed.
function addCandidate(name) {
  console.info(name);
}

function addCandidateFromInput() {
  const candidateNameTxt = document.querySelector("#CandidateName");
  console.info(candidateNameTxt);
  //const newCandidate = new candidate()
  const selectCandidate = document.querySelector("#selectCandidate");
  const newCandy = document.createElement("option");
  newCandy.text = candidateNameTxt.value;

  selectCandidate.add(newCandy);
  candidateNameTxt.value = "";
}

function init() {
  // load items to list
  
  // add all the event listeners
  const addCandidateBtn = document.getElementById("addCandidate");
  addCandidateBtn.addEventListener("click", addCandidateFromInput);

  console.info("loaded");
}
