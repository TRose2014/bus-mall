'use strict';
console.log('Hello World');

var productSrc = [
  './img/bag.jpg',
  './img/banana.jpg',
  './img/bathroom.jpg',
  './img/boots.jpg',
  './img/breakfast.jpg',
  './img/bubblegum.jpg',
  './img/chair.jpg',
  './img/cthulhu.jpg',
  './img/dog-duck.jpg',
  './img/dragon.jpg',
  './img/pen.jpg',
  './img/pet-sweep.jpg',
  './img/scissors.jpg',
  './img/shark.jpg',
  './img/sweep.jpg',
  './img/tauntaun.jpg',
  './img/unicorn.jpg',
  './img/usb.gif',
  './img/water-can.jpg',
  './img/wine-glass.jpg'
];

var product = [];
var totalVotes = 0;
var totalViews = 0;

function Product(imgSrcPath, name, HTMLid){
  this.imgSrcPath = imgSrcPath;
  this.name = name;
  this.totalVotes = this.totalViews = 0;
  this.HTMLid = HTMLid;
  product[this.HTMLid] = this;
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

};

var resultList = function(){
  document.getElementById('resultList').style.visibility = 'visible';
};


var content = document.getElementById('content');

var voteForAnImage = function(event){
  if(event.target.className === 'product'){
    console.log('Done');
    totalVotes++;
    product[event.target.id];
    console.log(totalVotes);
    if(totalVotes === 5){
      content.removeEventListener('click', voteForAnImage);
      console.log(totalVotes + ' votes completed');
      resultList();
    }
  }
};
content.addEventListener('click', voteForAnImage);

var newImage = 0;
//Generating Random Picture and attaching it to the body
var displayRandomImage = function(productsArray){
  var newImage = Math.floor(Math.random() * productsArray.length);
  
  //stackoverflow - https://stackoverflow.com/questions/14004318/show-random-image-from-array-in-javascript
  var randomImage = productsArray[newImage];
  console.log(randomImage);
  var randomImageString = '<img src="'+ randomImage + '" alt = "test">';
  // document.write(randomImageString); document.close();
  console.log('<img src="'+ randomImage);
};

//create empty array, push randomimage path into an array and use array.protoype find to get the index number

var imageOne = document.getElementById('imgOne');
imageOne.setAttribute('src', productSrc[6]);

var imageTwo = document.getElementById('imgTwo');
imageTwo.setAttribute('src', productSrc[8]);

var imageThree = document.getElementById('imgThree');
imageThree.setAttribute('src', productSrc[1]);



displayRandomImage(productSrc);
