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
  ['./img/sweep.jpg', 'Sweep', 'sweep'],
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
};


var content = document.getElementById('content');

var voteForAnImage = function(event){
  if(event.target.className === 'product'){
    // console.log('Done');
    totalVotesOnPage++;
    console.log(totalVotesOnPage);
    setStateToLocalStorage();
    //---------NEED TO GET TO WORK----------------//
    // product[event.target.id].totalVotes++;
    // PRODUCTS[event.target.id].totalVotes++;
    // console.log(totalVotes);
    // console.log(PRODUCTS[event.target.id]);
    if(totalVotesOnPage === 5){
      content.removeEventListener('click', voteForAnImage);
      console.log(totalVotesOnPage + ' votes completed');
      resultList();
      setStateToLocalStorage();
    }
  }
};

content.addEventListener('click', voteForAnImage);

//Generating Random Picture and attaching it to the body
var displayRandomImage = function(productsArray){
  var newImage = Math.floor(Math.random() * productsArray.length);
  console.log(newImage);
  // };

  //   //stackoverflow - https://stackoverflow.com/questions/14004318/show-random-image-from-array-in-javascript
  var randomImage = productsArray[newImage];
  lastCycleImage.push(randomImage[0]);

  console.log(lastCycleImage);
  //create empty array, push randomimage path into an array and use array.protoype find to get the index number

  var imageOne = document.getElementById('imgOne');
  imageOne.setAttribute('src', lastCycleImage);

  var imageTwo = document.getElementById('imgTwo');
  imageTwo.setAttribute('src', './img/boots.jpg');

  var imageThree = document.getElementById('imgThree');
  imageThree.setAttribute('src', lastCycleImage);

};

displayRandomImage(productSrc);

// var getNextImages = function(){
//   for(var i = 0; i < 3; i++){
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

//-------------
//JSON
//-------------

var STATE_KEY = 'counterState';
var counterState = {};
// 1. What to put in local storage
// totalViews - totalVotes - totalVotesOnPage - CurrentCycle - PreviousCyle

//2. When to update local storage
// totalViews - totalVotes - totalVotesOnPage


function setStateToLocalStorage(){
  localStorage.setItem(STATE_KEY, JSON.stringify(counterState));
}

// function renderVotes(){
//   totalVotesOnPage = counterState.totalVotesOnPage;
//   lastCycleImage = counterState.lastCycleImage;
// }

function getStateFromLocalStorage(){
  if(localStorage[STATE_KEY]){
    var rawState = localStorage.getItem(STATE_KEY);
    counterState = JSON.parse(rawState);
  }
}
setStateToLocalStorage();
renderVotes();
