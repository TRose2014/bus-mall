'use strict';

//Global Variables

var PRODUCTS = {};
var lastPageImages = [ ];
var totalVotes = 0;
var totalViews = 0;
var container = document.getElementById('content');
var RESULTLABELS = [];
var RESULTDATAVOTES = [];
var chartData = [];

var productSrc = [
  ['./img/bag.jpg', 'bag', 'bag'],
  ['./img/banana.jpg', 'banana', 'banana'],
  ['./img/bathroom.jpg', 'bathroom', 'bathroom'],
  ['./img/boots.jpg', 'boots', 'boots'],
  ['./img/breakfast.jpg','breakfast', 'breakfast'],
  ['./img/bubblegum.jpg', 'bubblegum', 'bubblegum'],
  ['./img/chair.jpg', 'chair ', 'chair'], 
  ['./img/cthulhu.jpg', 'cthulhu', 'cthulhu'],
  ['./img/dog-duck.jpg', 'dog-duc', 'dog-duc'],
  ['./img/dragon.jpg', 'dragon', 'dragon'],
  ['./img/pen.jpg', 'pen', 'pen'],
  ['./img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep'],
  ['./img/scissors.jpg', 'scissors', 'scissors'],
  ['./img/shark.jpg', 'shark', 'shark'],
  ['./img/sweep.png', 'sweep', 'sweep'],
  ['./img/tauntaun.jpg', 'tauntaun', 'tauntaun'],
  ['./img/unicorn.jpg', 'unicorn', 'unicorn'],
  ['./img/usb.gif', 'usb', 'usb'],
  ['./img/water-can.jpg', 'water-can', 'water-can'],
  ['./img/wine-glass.jpg', 'wine-glass', 'wine-glass'],
];

// ---------------------------------------------------------------
//                   Define Functions
// -----------------------------------------------------------------

function Product(imgFilePath, name, HTMLid){
  this.imgFilePath = imgFilePath;
  this.name = name;
  this.HTMLid = HTMLid;
  this.totalVotesOnPage = 0;
  this.totalViews = 0;

  PRODUCTS[this.HTMLid] = this;
}

Product.prototype.getPercentClicked = function(){
  return this.totalVotesOnPage / this.totalViews;
};

Product.prototype.render = function(parentId){

  var parent = document.getElementById(parentId);
  var img = document.createElement('img');

  img.setAttribute('id', this.HTMLid);
  img.setAttribute('src', this.imgFilePath);
  img.setAttribute('class', 'product');

  parent.appendChild(img);
};


function randomlySelectNewImages(){
  for(var i = 0; i < 3; i++){
    var randomIndex = getRandom();

    while(lastPageImages.includes(randomIndex)){
      randomIndex = getRandom();
    }
    lastPageImages.push(randomIndex);
  }
  
  if(lastPageImages.length === 6){
    lastPageImages.shift(); 
    lastPageImages.shift();
    lastPageImages.shift();
  }
}

function addCurrentSetOfImages(){

  for (var i = 0; i < 3; i++) {
    if (totalVotes > 1){
      var parent = document.getElementById(`fig${i}`);

      var child = parent.firstElementChild;
      if(child){child.remove();}

      var productToRender = lastPageImages[i];
    

      var newIdName = PRODUCTSARRAY[productToRender].HTMLid;
      var newImgPath = PRODUCTSARRAY[productToRender].imgFilePath;
     
    
      var newChild = document.createElement('img');
      newChild.setAttribute('class', 'product');
      newChild.setAttribute('id', newIdName);
      newChild.setAttribute('src', newImgPath);
      parent.appendChild(newChild);
      addViewsOfProduct();
    }
  }
}

var createProducts = function(){
  // Generate Objects for Products
  for(var i = 0; i < productSrc.length; i++){
    new Product(productSrc[i][0], productSrc[i][1], productSrc[i][2]);
  }
};

createProducts();



function addViewsOfProduct() {
  for (var i = 0; i < 3; i++){
    var productIndex = lastPageImages[i];
  
    PRODUCTSARRAY[productIndex].totalViews++;
  
  }
}

function stopVoting(){

  if(totalVotes > 25){
    totalVotes = 0;
  }
  if(totalVotes === 25){
    container.removeEventListener('click', handleClick);

    totalVotes === 0;
    for( var i = 0; i < PRODUCTSARRAY.length; i++) {
     
      RESULTDATAVOTES.push(PRODUCTSARRAY[i].totalVotesOnPage);
      console.log(PRODUCTSARRAY);
      console.log(RESULTDATAVOTES);
      RESULTLABELS.push(PRODUCTSARRAY[i].name);
    }
    resultList();
    // renderChart();
  }
}


//Gets random Index
var getRandom = function(){
  return Math.floor(Math.random() * productSrc.length);
};

//Displays Ol for results
var resultList = function(){
  var productItem = document.getElementById('result');
  var productItemOl = document.getElementById('resultList');
  
  for(var i = 0; i < productSrc.length; i++){
    var li = document.createElement('li');
  
    li.textContent = `${RESULTDATAVOTES[i]} votes for ${RESULTLABELS[i]}`;
    productItemOl.appendChild(li);

    productItem.style.visibility = 'visible';
    productItemOl.style.visibility = 'visible';
  }

  document.getElementById('myChart').style.visibility = 'visible';
};

console.log(PRODUCTS);
var PRODUCTSARRAY = Object.values(PRODUCTS);
console.log(PRODUCTSARRAY);

// function handleClick(event) {
//   //put eventDefault

//   if(event.target.className === 'product'){
//     console.log(PRODUCTS[event.target.id]);
//     PRODUCTS[event.target.id].totalVotesOnPage++;
 
//     totalVotes++;
//     stopVoting();
//     randomlySelectNewImages();
//     addCurrentSetOfImages(event);
//     // setStateToLocalStorage();
//   }
// }


console.log(PRODUCTS);

function renderChart(){
  var canvas = document.getElementById('myChart');
  var ctx = canvas.getContext('2d');
  var chartLabels = [];
  var chartData = [];

  console.log(RESULTDATAVOTES);
  var data = {
    labels: RESULTLABELS, //RESULTSLABELS
    datasets: [{
      label: 'Votes by Product',
      data: RESULTDATAVOTES,
    
    
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255, 159, 64, 1)'
      ],
    }],
  };
  var options = {
    backgroundColor: 'rgb(64, 211, 191)',
    borderColor: 'rgb(46, 146, 133)',
    pointBackgroundColor: 'rgb(46, 135, 100)'
  };
  var myChartConfig = {
    type: 'bar',
    data: data,
    options: options
  };
  
  var barChart = new Chart(ctx, myChartConfig);
}

console.log(PRODUCTS);

function handleClick(event) {
  //put eventDefault

  if(event.target.className === 'product'){
    console.log([event.target.id]);
    // PRODUCTS[event.target.id].totalVotesOnPage++;
    console.log(event.target.id);
 
    totalVotes++;
    stopVoting();
    randomlySelectNewImages();
    addCurrentSetOfImages(event);
    // setStateToLocalStorage();
  }
}

// --------------------------------------------------------------
//                        Run Script
// --------------------------------------------------------------


var createProducts = function(){
// Generate Objects for Products
  for(var i = 0; i < productSrc.length; i++){
    new Product(productSrc[i][0], productSrc[i][1], productSrc[i][2]);
  }
};

var doEverything = function(){
  randomlySelectNewImages();
  addCurrentSetOfImages();
  // createProducts();
};

doEverything();


console.log(RESULTDATAVOTES);

container.addEventListener('click', handleClick);
console.log(PRODUCTS);

// var PRODUCTSARRAY = Object.values(PRODUCTS);


