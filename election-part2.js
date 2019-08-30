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
    return {
      name,
      age,
      votingCard
    };
  }
}

/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */
class Candidate extends Voter {
  constructor(name, age, votingCard, party, numVotes = 0) {
    super(name, age, votingCard);
    return {
      name,
      age,
      votingCard,
      party,
      numVotes
    };
  }
}

/**
 * 3 - Write an Election class which models the election.
 */

class Election {
  constructor(voters, candidates) {
    this.voters = voters;
    this.candidates = candidates;
  }
  get runElection(voters, candidates) {
    console.log(`test run election ${voters}`);
  }
  //   get getWinner();
  //   get printWinnerMessage();
}

// Include your votingPopulation array here.
let votingPopulation = [];
votingPopulation.push(new Voter("Jane Finnegan", 19, [1, 3]));
votingPopulation.push(new Voter("Norman Beracha", 35, [3, 4]));
votingPopulation.push(new Voter("Salome Kadek", 22, [2, 1, 3]));
votingPopulation.push(new Voter("Wei Li", 19, [1, 2]));
votingPopulation.push(new Voter("Sam MacKinnon", 59, [1, 4]));

//console.log(votingPopulation);
// Include your candidates object here.
let candidates = {};
candidates[1] = new Candidate("Tamara Faiza", 46, [1, 1], "Pizza Party");
candidates[2] = new Candidate("Aylin Duke", 39, [2, 2], "Foam Party");
candidates[3] = new Candidate("Clay Roderick", 54, [3, 4], "Flat Earth Party");
candidates[4] = new Candidate("Nour al - Din", 32, [4, 3], "Pizza Party");

//console.log(candidates);

let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);
console.log(validVoters);

let election = new Election(validVoters, candidates);

election.runElection(); // Example of how runElection() can be called.

console.log(election.printWinnerMessage()); // Example of how the winner message can be printed.
