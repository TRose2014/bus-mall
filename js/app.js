'use strict';

var productSrc = [
  ['./img/bag.jpg', 'Star Wars Luggage', 'bag'],
  ['./img/banana.jpg', 'Banana Slicer', 'banana'],
  ['./img/bathroom.jpg', 'Ipad Stand with toilet paper holder', 'bathroom'],
  ['./img/boots.jpg', 'Boots', 'boots'],
  ['./img/breakfast.jpg', 'Breakfast', 'breakfast'],
  ['./img/bubblegum.jpg', 'Bubblegum', 'bubblegum'],
  ['./img/chair.jpg', 'Chair', 'chair'],
  ['./img/cthulhu.jpg', 'Cthulhu', 'cthulhu'],
  ['./img/dog-duck.jpg', 'Dog-Duck', 'dog-duck'],
  ['./img/dragon.jpg', 'Dragon', 'dragon'],
  ['./img/pen.jpg', 'Pen', 'pen'],
  ['./img/pet-sweep.jpg', 'Pet-Sweep', 'pet-sweep'],
  ['./img/scissors.jpg', 'Scissors', 'scissors'],
  ['./img/shark.jpg', 'Shark', 'shark'],
  ['./img/sweep.png', 'Sweep', 'sweep'],
  ['./img/tauntaun.jpg', 'Tauntaun', 'tauntaun'],
  ['./img/unicorn.jpg', 'Unicorn', 'unicorn'],
  ['./img/usb.gif', 'USB', 'usb'],
  ['./img/water-can.jpg', 'Water-Can', 'water-can'],
  ['./img/wine-glass.jpg', 'wine-glass', 'wine-glass']
];

var PRODUCTS = {};
// var product = [];
var totalVotesOnPage = 0;
// var totalViews = 0;
var lastCycleImage = [];
var currentCycle = [];

function Product(imgSrcPath, name, HTMLid){
  this.imgSrcPath = imgSrcPath;
  this.name = name;
  this.totalVotes = this.totalViews = 0;
  this.HTMLid = HTMLid;
  // product[this.HTMLid] = this;
  PRODUCTS[this.HTMLid] = this;
}

Product.prototype.calculatePercentage = function(){
  return this.totalVotes / this.totalViews;
};
Product.prototype.render = function(parentId){
  var parent = document.getElementById(parentId);
  var img = document.getElementById('img');
  img.setAttribute('id', this.HTMLid);
  img.setAttribute('src', this.imgSrcPath);
  img.setAttribute('class', 'product');
  parent.appendChild(img);

};


//Makes List Visible after so many clicks
var resultList = function(){
  document.getElementById('resultList').style.visibility = 'visible';
  document.getElementById('myChart').style.visibility = 'visible';
};


var content = document.getElementById('content');

var voteForAnImage = function(event){
  if(event.target.className === 'product'){
    // console.log('Done');
    totalVotesOnPage++;
    console.log(totalVotesOnPage);
    selectionState.totalVotesOnPage = totalVotesOnPage;
  
    displayRandomImage(productSrc);
    // PRODUCTS[event.target.id].totalVotes++;
    
    if(totalVotesOnPage === 5){
      content.removeEventListener('click', voteForAnImage);
      console.log(totalVotesOnPage + ' votes completed');
      resultList();
    }
  }
  setStateToLocalStorage();
};

content.addEventListener('click', voteForAnImage);

//Generating Random Picture and attaching it to the body
var displayRandomImage = function(productsArray){
  for(var i = 0; i < 3; i++){
    var newImage = Math.floor(Math.random() * productsArray.length);
    var randomImage = productsArray[newImage];
    console.log(randomImage);
    lastCycleImage.push(randomImage[0]);
    console.log(newImage);
  }

  //   //stackoverflow - https://stackoverflow.com/questions/14004318/show-random-image-from-array-in-javascript
  // var randomImage = productsArray[newImage];
  // lastCycleImage.push(randomImage[0]);

  console.log(lastCycleImage);
  //create empty array, push randomimage path into an array and use array.protoype find to get the index number

  //have img paths being pushed into empty array one by one until it hits 5
  //use function to shift 3 images out of array. Still need to have images appear at the same time
  
  var imageOne = document.getElementById('imgOne');
  imageOne.setAttribute('src', lastCycleImage[0]);

  var imageTwo = document.getElementById('imgTwo');
  imageTwo.setAttribute('src', lastCycleImage[1]);

  var imageThree = document.getElementById('imgThree');
  imageThree.setAttribute('src', lastCycleImage[2]);

  selectionState.currentCycle = currentCycle;
  selectionState.lastCycleImage = lastCycleImage;

};

// var getNextImages = function(){
//   for(var i = 0; i < 4; i++){
//     var randomIndex = displayRandomImage();
//     while(lastCycleImage.includes(randomIndex)){
//       randomIndex = displayRandomImage();
//     }
//     lastCycleImage.push(displayRandomImage());
//   }
// };
// if (lastCycleImage > 3){
//   lastCycleImage.shift()*3;
// }
// for(var i = 0; i < productSrc.length; i++){
//   var randomProduct = new Product(productSrc[i][0], productSrc[i][1], productSrc[i][2]);
//   randomProduct.render('imgOne');
// }

//---------------------------
//
// Chart
//
//---------------------------

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Bathroom', 'Shark', 'Unicorn', 'Dragon', 'Pen'],
    datasets: [{
      label: '# of Votes',
      data: [3, 4, 2, 5, 1],
      backgroundColor: [
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
      ],
      borderWidth: 1

    }]
  },
});

//-------------
//JSON
//-------------

var STATE_KEY = 'voteState';
var selectionState = {
  totalVotesOnPage: 0,
  lastCycleImage: [],
  currentCycle: [],
};
// 1. What to put in local storage
// totalViews - totalVotes - totalVotesOnPage - currentCycle - PreviousCyle

//2. When to update local storage
// totalViews - totalVotes - totalVotesOnPage


function setStateToLocalStorage(){
  localStorage.setItem(STATE_KEY, JSON.stringify(selectionState));
}

// function renderVotes(){
//   counterState.totalVotesOnPage = totalVotesOnPage;
//   counterState.lastCycleImage = lastCycleImage;
// }

function getStateFromLocalStorage(){
  if(localStorage[STATE_KEY]){
    var rawState = localStorage.getItem(STATE_KEY);
    selectionState = JSON.parse(rawState);
  }
}
setStateToLocalStorage();
// renderVotes();
