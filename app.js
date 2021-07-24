'use strict'
const hoursArray = ['1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM'];
function randumNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
let shopsArray = [];
function ShopsLocation(name, maxC, minC, avgC) {
    this.name = name,
        this.maxC = maxC,
        this.minC = minC,
        this.avgC = avgC,
        this.cookiesPh = [],
        this.total = 0,
        shopsArray.push(this)
}


ShopsLocation.prototype.getRandomCTotal = function () {
    for (let i = 0; i < hoursArray.length; i++) {
        this.cookiesPh.push(Math.floor(this.avgC * randumNum(this.maxC, this.minC)));
        this.total += this.cookiesPh[i];

    }
}
function renderRandom (){
for (let i = 0; i < shopsArray.length; i++) {
    shopsArray[i].getRandomCTotal(); 
}
}
function renderTable (){
let section = document.getElementById('table');
let table = document.createElement('table');
section.appendChild(table);
let tableHeader = document.createElement('tr');
table.appendChild(tableHeader);
let LocationName = document.createElement('th');
tableHeader.appendChild(LocationName);
tableHeader.setAttribute('class', 'bold')
LocationName.textContent = 'Locations';
for (let i = 0; i < hoursArray.length; i++) {
    let hoursWork = document.createElement('th');
    tableHeader.appendChild(hoursWork);
    hoursWork.textContent = hoursArray[i];
};
let tableTotal = document.createElement('th');
tableHeader.appendChild(tableTotal);
tableTotal.textContent = 'Total';
for (let i = 0; i < shopsArray.length; i++) {
    let tableRows = document.createElement('tr');
    table.appendChild(tableRows);
    let tableLocationName = document.createElement('th');
    tableRows.appendChild(tableLocationName);
    tableLocationName.textContent = shopsArray[i].name;
    let tableTotalResult = document.createElement('th');
    let total_ = 0
    for (let j = 0; j < hoursArray.length; j++) {
        let tableRandomC = document.createElement('th');
        tableRows.appendChild(tableRandomC);
        tableRandomC.textContent = parseFloat(shopsArray[i].cookiesPh[j]);
        total_+=  parseInt(shopsArray[i].cookiesPh[j])
        tableRows.appendChild(tableTotalResult); 
        tableTotalResult.textContent = total_;
    }
    
}
}

let form = document.getElementById('form');
form.addEventListener('submit', handler);

function handler(event){
    event.preventDefault();

    let newName = event.target.name.value;
    console.log(newName); 
    let newMin =parseInt( event.target.min.value);
    let newMax =parseInt( event.target.max.value);
    let newAvg =parseFloat(event.target.avg.value);
    console.log(newAvg);
    new ShopsLocation(newName, newMin, newMax, newAvg);

    table.textContent = ' ';
    renderRandom ();
    renderTable ();
    let convArray = JSON.stringify(shopsArray);
    localStorage.setItem('key', convArray);
}




let savedShopsArray = JSON.parse(localStorage.getItem('key'))

if(savedShopsArray){
for (let i = 0; i < savedShopsArray.length; i++) {
   let reIns = new ShopsLocation(savedShopsArray[i].name, savedShopsArray[i].maxC, savedShopsArray[i].minC, savedShopsArray[i].avgC);
}
}else{
    new ShopsLocation('Amman', 2, 15, 1.7);
    new ShopsLocation('Zarqa', 8, 18, 1.3);
}

renderRandom ();
renderTable ();