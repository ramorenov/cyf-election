(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

 class Voter{
    constructor(name, age, votingCard){
        this.name = name;
        this.age = age;
        this.votingCard = votingCard;    
    }
     
}

/**
 * 2 - Write a Candidate class modelling a candidate in the election. Candidates are also voters (they can vote for themselves, or anyone else).
 * However they have some extra properties.
 */

class Candidate extends Voter{

    constructor(name, age, votingCard, party, numVotes){
        super(name, age, votingCard);
        this.party = party;
        this.numVotes = 0;
    }
}

/**
 * 3 - Write an Election class which models the election.
 */

class Election{

    constructor(validVoters, candidates){
        this.validVoters = validVoters;
        this.candidates = candidates;
        this.winner = null;
    }

    runElection(){
        return runElection(this.validVoters, this.candidates);
    }

    getWinner(){
        this.winner = getWinner(this.candidates);
        return this.winner;
    }

    printWinnerMessage(){
         return winnerMessage(this.getWinner());
    }
}

// Include your votingPopulation array here.
let votingPopulation = [
    new Voter('Jane Finnegan', 19, [1,3]), 
    new Voter('Norman Beracha', 35, [3,4]), 
    new Voter('Salome Kadek', 22, [2, 1, 3]), 
    new Voter('Wei Li', 19, [1,2]), 
    new Voter('Sam MacKinnon', 59, [1,4])
];
 
// Include your candidates object here.
let candidates = {
	1: new Candidate('Tamara Faiza', 46, [1,1], 'Pizza Party', 0),
	2: new Candidate('Aylin Duke', 39, [2,2], 'Foam Party', 0),
	3: new Candidate('Clay Roderick', 54, [3,4], 'Flat Earth Party', 0),
	4: new Candidate('Nour al-Din', 32, [4,1], 'Pizza Party', 0)
}

let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));
// console.log(allVoters);

let validVoters = filterInvalidVoters(allVoters); 

let election = new Election(validVoters, candidates);

election.runElection(); // Example of how runElection() can be called.
election.getWinner();

let candidatesArr = candidatesObjToArray(candidates); // convert candidates object to array

// fonction: to create html tag
function createTag(tag){
    let createTag = document.createElement(tag);
    return createTag;
}

// fonction: create and insert h1 title
function titleH(className, tag, text, table){
    let selectClass = document.querySelector('.' + className);
    let tagItem = createTag(tag);
    tagItem.innerHTML = text;
    selectClass.appendChild(tagItem);
    tableTag(table, selectClass);
}

// function: create table 
function tableTag( arr, parent){
    let tableTag = document.createElement('table');
    tableTag.classList.add('table');
    parent.appendChild(tableTag);
    let trTag = document.createElement('tr');
    var tdObj = [];

    for(var d in arr){
        var arrTh = [];
        for (var j in arr[d]){
            arrTh.push(j);   
        }
        tdObj.push(arr[d]);   
    }

    for (let i = 0; i < arrTh.length; i++){
        let thTag = document.createElement('th');
        tableTag.appendChild(trTag);
        trTag.appendChild(thTag);
        thTag.innerHTML = arrTh[i];
        if(arrTh[i] === 'age' || arrTh[i] === 'votingCard'){
            thTag.style.display = 'none';
        }   else if(arrTh[i] === 'numVotes'){
            thTag.innerHTML = 'Score';
        }
    }

    // create table row and column contain
    for (let j = 0; j < tdObj.length; j++){
        let trTa = document.createElement('tr');
        tableTag.appendChild(trTa);
        for (key in tdObj[j]){
            let tdTag = document.createElement('td');
            trTa.appendChild(tdTag);
            tdTag.innerHTML = tdObj[j][key];
            if(key === 'age' || key === 'votingCard'){
                tdTag.style.display = 'none';
            }   else if(key === 'party'){
                tdTag.classList.add('party');                
            }    
        }
    }
}

// function: convert array to object
function arrToObj(arr){
    var obj = {};
    arr.forEach((element, index) => {
        obj[index] = element;
    });
return obj;
}


let voterObj = arrToObj(votingPopulation);
titleH('candidate', 'h1', 'CANDIDATES', candidates);
titleH('voter', 'h1', 'VOTERS', voterObj);

let btnResult = document.querySelector('.btn-result');
let resultClass = document.querySelector('.result');
btnResult.addEventListener('click', displayWinner);

// function: display name of the winner and his score
function displayWinner(){
    let theWinnerIs = election.printWinnerMessage();
    let resultTag = document.createElement('div');
    let resultP = document.querySelector('.result-p');
    resultClass.appendChild(resultTag);
    resultTag.innerHTML = theWinnerIs;
    resultTag.classList.add('results');          
    if(resultTag.innerHTML ===  'Tamara Faiza has won the election with 3.5 votes!'){
       removeBtn()
       resultP.style.display = 'none';
    }
}

// function: remove btn
function removeBtn() {
    var btnRemove = document.querySelector('.btn-result');
    resultClass.appendChild(btnRemove);
    btnRemove.removeEventListener('click', displayWinner);
    resultClass.removeChild(btnRemove);
}

// ### Stretch goals

let submitBtn = document.querySelectorAll('.btn-submit')[1];
let submitBtn2 = document.querySelectorAll('.btn-submit')[0];
submitBtn.addEventListener('click', addVoter);
submitBtn.addEventListener('click', (event) => event.preventDefault());

// function: add new voter
function addVoter(){
    let table = document.querySelectorAll('.table')[1];
    let tr = createTag('tr');
    let td = createTag('td');
    table.appendChild(tr);
    tr.appendChild(td);
    let voterName = document.querySelectorAll('.name')[1].value;
    let voterAge = document.querySelectorAll('.age')[1].value.split(",")
    let voterCard = document.querySelectorAll('.card')[1].value;
    td.innerHTML = voterName;
    let newVoter = new Voter(voterName, voterAge, voterCard);
    votingPopulation.push(newVoter);
    return votingPopulation;
}

// submitBtn2.addEventListener('click', (event) => event.preventDefault());
// submitBtn2.addEventListener('click', addCandidate);

// function addCandidate(){
//     let table2 = document.querySelectorAll('.table')[0];
//     let candidateName = document.querySelectorAll('.name')[0].value;
//     let candidateAge = document.querySelectorAll('.age')[0].value.split(",")
//     let candidateParty = document.querySelector('.party').value;
//     let candidateCard = document.querySelectorAll('.card')[0].value;
//     let newCandidateArr = [];
//     let newCandidate = {5:new Candidate(candidateName, candidateAge, candidateParty, candidateCard)};
//     console.log(candidatesArr); 
//     newCandidateArr.push(newCandidate)
//     for (var i = 0; i < newCandidateArr.length; i++){
//         let tr = createTag('tr');
//         let td = createTag('td');
//         table2.appendChild(tr);
//         tr.appendChild(td);
//         for(key in newCandidateArr[i]){
//             td.innerHTML = candidateName;
//             td.innerHTML = candidateParty;
//         }
//     }
//     candidatesArr.push(newCandidate);   
//     console.log(candidatesArr);
//     return candidatesArr;
// }                                           not yet finish



// Part3
let allCandidates, allVoter, fetchVoters;
let fetchCandidates = [ ];
let btnpart3 = document.querySelector('.btn-part3');
btnpart3.addEventListener('click', fetchElectionData)
function fetchElectionData (){
    fetch('http://www.mocky.io/v2/5a55224b2d000088425b1ed8')
    .then(res => res.json())
    .then(data => getAllVoters(data))
    .then(voterValid => filterInvalidVoters(voterValid))
    .then(dat => runElection(dat, candidates))
    .then(results => getWinner(results))
    .then(winnerName => winnerMessage(winnerName))
    .catch(err => console.log(err))
}
  
function getAllVoters(voter){

    voter.voters.forEach(person => {
        fetchVoters = new Voter(person.name, person.age, person.votingCard)
        votingPopulation.push(fetchVoters);
      })

    voter.candidates.forEach(person => {
        let x = (new Candidate (person.name, person.age, person.votingCard, person.party, person.id));
        fetchCandidates.push(x)
      })

    allNewCandidatesObject(fetchCandidates);
    allVoter = votingPopulation.concat(candidatesObjToArray(candidates));
    let filter = filterInvalidVoters(allVoter);
    let run = runElection(filter, candidates)
    let win = getWinner(run)
    titleH('candidate', 'h1', 'CANDIDATES', candidates);
    titleH('voter', 'h1', 'VOTERS', arrToObj(votingPopulation));
    let message = winnerMessage(win);
    displayWin(message)

    return allVoter;
  }

  
// function: display name of the winner and his score
function displayWin(theWinnerIs){
    let resultTag = document.createElement('div');
    let resultP = document.querySelector('.result-3');
    resultClass.appendChild(resultTag);
    resultTag.innerHTML = theWinnerIs;
    resultTag.classList.add('results');          
    if(resultTag.innerHTML ===  theWinnerIs){
       removeBtn3()
       resultP.style.display = 'none';
    }
}

function removeBtn3() {
    var btnRemove3 = document.querySelector('.btn-part3');
    resultClass.appendChild(btnRemove3);
    btnRemove3.removeEventListener('click', displayWin);
    resultClass.removeChild(btnRemove3);
}

  // create function to convert fetchCandidate array to an object 
function allNewCandidatesObject(arr) {
    for (let i = 1; i <= arr.length; i++) {
        candidates[i] = new Candidate (arr[i-1].name, arr[i-1].age, arr[i-1].votingCard, arr[i-1].party, arr[i-1].numVotes);   
    }
    return candidates;
}


},{"./election":2}],2:[function(require,module,exports){
/**
 * CYF JS core 3 election project
 */

/**
 * 1 - Convert candidates object to array
 */

function candidatesObjToArray(candidates) {
    var arr = [];
    for (var i = 1; i < 5; i++) {
        arr.push(candidates[i]);
    }
    return arr;
}

function candidatesObjToArray(candidates){
    var arrOfCandidates = [];
    Object.keys(candidates).map(function(candidateId){
        arrOfCandidates.push(candidates[candidateId]);
    });
    return arrOfCandidates;
}

/**
 * 2 - Remove any voters who have voted for more than 2 people, or have voted for the same person twice.
 */

function filterInvalidVoters(voters) {
    return voters.filter(function(voter) {
        for (let i = 0; i < voter.votingCard.length; i++) {
            if (voter.votingCard.length > 2 || voter.votingCard[i] === voter.votingCard[i + 1]) {
                return false
            } else {
                return true
            }
        }
    });
}


/**
 * 3 - Add up all the votes cast by the voting population. Note that for two adjacent votes in the vote array,
 * the right vote counts for half of the left vote.
 */

// function runElection(validVoters, candidates) {
//     for (let i = 0; i < validVoters.length; i++) {
//         var voterCast = validVoters[i].votingCard;
//         for (let j = 0; j < voterCast.length; j++){
//             if (voterCast[j] === voterCast[0]) {
//                 candidates[voterCast[j]].numVotes += 1;
//             }   else {
//                 candidates[voterCast[j]].numVotes += 0.5;
//             }        
//         }
//     }
//     return candidates;
// }

function runElection(validVoters, candidates){
    for(var i = 0; i < validVoters.length; i++){
      var votingCard = validVoters[i].votingCard;
      for(let j = 0; j < votingCard.length; j++){
        if(j === 0){
          candidates[votingCard[j]].numVotes += 1;
        } else if (j === 1) {
          candidates[votingCard[j]].numVotes += 0.5;
        }
      }
    }
    return candidates;
  }  
/**
 * 4 - After an election has been run, return the winner
 *
 * Desired return value: {name: "Tamara Faiza", age: 46, party: "Pizza Party", numVotes: 3}
 */
// function getWinner(candidates) {
//     var hasMaxVote = 0;
//     var theWinner = [] ;
//     var candidatesToArray = candidatesObjToArray(candidates);
//     for (var i = 0; i < candidatesToArray.length; i++) {
//         if (candidatesToArray[i].numVotes > hasMaxVote) {
//             hasMaxVote = candidatesToArray[i].numVotes;
//             theWinner.push(candidatesToArray[i]);
//         } else if (candidatesToArray[i].numVotes === hasMaxVote){
//             theWinner.push (candidatesToArray[i]);
//         }
//     }
//     if (theWinner.length = 2){
//         return theWinner[1]
//     }else {
//         return theWinner[theWinner.length-1]
//     }
// }


function getWinner(candidates) {
    var hasMaxVote = 0;
    var theWinner;
    var candidatesToArray = candidatesObjToArray(candidates);
    for (var i = 0; i < candidatesToArray.length; i++) {
        if (candidatesToArray[i].numVotes > hasMaxVote) {
            hasMaxVote = candidatesToArray[i].numVotes;
            theWinner = candidatesToArray[i];
        } else if (candidatesToArray[i].numVotes === hasMaxVote){
            theWinner = candidatesToArray[i];
        }
    }
    return theWinner;
}

/**
 * 5 - Return a message including the name of the winner, and how many votes
 * he/she received
 */
function winnerMessage(winner) {
    return winner.name + ' has won the election with ' + winner.numVotes + ' votes!';
}

// A sample population of a small number of voters, stored as an array
let votingPopulation = [
    { name: 'Jane Finnegan', age: 19, votingCard: [1, 3] },
    { name: 'Norman Beracha', age: 35, votingCard: [3, 4] },
    { name: 'Salome Kadek', age: 22, votingCard: [2, 1, 3] },
    { name: 'Wei Li', age: 19, votingCard: [1, 2] },
    { name: 'Sam MacKinnon', age: 59, votingCard: [1, 4] }
];

// The election candidates, stored as an object where each object key is the candidate ID, and the object
// value is the candidate object itself.
let candidates = {
    1: { name: 'Tamara Faiza', age: 46, votingCard: [1, 1], party: 'Pizza Party', numVotes: 0 },
    2: { name: 'Aylin Duke', age: 39, votingCard: [2, 2], party: 'Foam Party', numVotes: 0 },
    3: { name: 'Clay Roderick', age: 54, votingCard: [3, 4], party: 'Flat Earth Party', numVotes: 0 },
    4: { name: 'Nour al-Din', age: 32, votingCard: [4, 1], party: 'Pizza Party', numVotes: 0 }
};

let allVoters = votingPopulation.concat(candidatesObjToArray(candidates));

let validVoters = filterInvalidVoters(allVoters);

candidates = runElection(validVoters, candidates);

let winner = getWinner(candidates);

module.exports = {
    candidatesObjToArray,
    filterInvalidVoters,
    runElection,
    getWinner,
    winnerMessage
}


},{}]},{},[1]);
