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

// fetch data
function fetchElectionData (){
    const url = 'https://www.mocky.io/v2/5a55224b2d000088425b1ed8';
    fetch(url)
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

