'use strict';

//Global Variables

var PRODUCTS = {};
var lastPageImages = [ ];
var totalVotesOnPage = 0;
var content = document.getElementById('content');
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
  this.totalVotes = this.totalViews = 0;


  PRODUCTS[this.HTMLid] = this;
}

Product.prototype.getPercentClicked = function(){
  return this.totalVotes / this.totalViews;
};

Product.prototype.render = function(parentId){

  var parent = document.getElementById(parentId);
  var img = document.createElement('img');

  img.setAttribute('id', this.HTMLid);
  img.setAttribute('src', this.imgFilePath);
  img.setAttribute('class', 'product');

  parent.appendChild(img);
};

//Gets random Index
var getRandom = function(){
  return Math.floor(Math.random() * productSrc.length);
};


var getThreeRandomImages = function(){
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
};

var displayCurrentImages = function(){

  for (var i = 0; i < 3; i++) {
    if (totalVotesOnPage > 1){
      var parent = document.getElementById(`fig${i}`);
      var child = parent.firstElementChild;

      if(child){child.remove();}

  
      var newIdName = PRODUCTSARRAY[lastPageImages[i]].HTMLid;
      var newImgPath = PRODUCTSARRAY[lastPageImages[i]].imgFilePath;


      var newChild = document.createElement('img');
      newChild.setAttribute('class', 'product');
      newChild.setAttribute('id', newIdName);
      newChild.setAttribute('src', newImgPath);
      parent.appendChild(newChild);
      addViewsOfProduct();
    }
  }
};


function addViewsOfProduct() {
  for (var i = 0; i < 3; i++){
    var productIndex = lastPageImages[i];

  }
}

//Displays Ol for results
var resultList = function(){
  document.getElementById('myChart').style.visibility = 'visible';

  var productItem = document.getElementById('result');
  var productItemOl = document.getElementById('resultList');

  for(var i = 0; i < productSrc.length; i++){
    var li = document.createElement('li');

    //---Having issues with totalVotes not calculating. As of now have getRandom() generating totalVotes
   
    // li.textContent = `${PRODUCTS[productSrc[i][1]].totalVotes} votes for ${PRODUCTS[productSrc[i][1]].name}`;
    li.textContent = `${getRandom()} votes for ${PRODUCTS[productSrc[i][1]].name}`;
    productItemOl.appendChild(li);


    productItem.style.visibility = 'visible';
    productItemOl.style.visibility = 'visible';
  }

  // document.getElementById('myChart').style.visibility = 'visible';
};


var voteForAnImage = function(event){
  event.preventDefault();

  if(event.target.className === 'product'){
    totalVotesOnPage++;
  
    // selectionState.totalVotesOnPage = totalVotesOnPage;
  
    getThreeRandomImages();
    displayCurrentImages();

    //----Having issues with gettin totalVotes
    // PRODUCTS[event.target.id].totalVotes++;
    
    if(totalVotesOnPage === 5){
      content.removeEventListener('click', voteForAnImage);
      console.log(totalVotesOnPage + ' votes completed');
      displayResults();
    }
  }
  // setStateToLocalStorage();
};


// Generates new Products - IIFE
(function createProducts(){
  for(var i = 0; i < productSrc.length; i++){
    new Product(productSrc[i][0], productSrc[i][1], productSrc[i][2]);    new Product(productSrc[i][0], productSrc[i][1], productSrc[i][2]);
  }
})();

var displayResults = function(){
  resultList();
  // displayBarChart();
};

//---------------------------------
//
//              Chart
//
//----------------------------------


var keys = Object.keys(PRODUCTS);
var dataSets = [];
var labels = [];

for(var i = 0; i < keys.length; i++){
  dataSets.push(getRandom());
  labels.push(PRODUCTS[keys[i]].name);
}

console.log(dataSets);
console.log(labels);


var displayBarChart = function(){
  var ctx = document.getElementById('myChart').getContext('2d');
  
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of Votes',
        data: dataSets,
        backgroundColor: [
          'rgb(255, 150, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 2, 255)',
          'rgb(255, 150, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 2, 255)',
          'rgb(255, 150, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 2, 255)',
          'rgb(255, 150, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 206, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 2, 255)',
        ],
        borderColor: [
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
        ],
        borderWidth: 1

      }]
    },
    options: {
      scales: {
    
      }

    }
  });
};

displayBarChart();

// --------------------------------------------------------------
//                        Run Script
// --------------------------------------------------------------

content.addEventListener('click', voteForAnImage);

var PRODUCTSARRAY = Object.values(PRODUCTS);


