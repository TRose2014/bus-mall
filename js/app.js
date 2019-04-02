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

}


var content = document.getElementById('content');

var voteForAnImage = function(event){
  if(event.target.className === 'product'){
    product[event.target.id].totalVotes++;
    if(totalVotes === 25){
      console.log('Done');
    }
  }
};
content.addEventListener('click', voteForAnImage);


//Generating Random Picture and attaching it to the body
var displayRandomImage = function(productsArray){
  var newImage = Math.floor(Math.random() * productsArray.length);
  
  //stackoverflow - https://stackoverflow.com/questions/14004318/show-random-image-from-array-in-javascript
  var randomImage = productsArray[newImage];
  var randomImageString = '<img src="'+ randomImage + '" alt = "test">';
  document.write(randomImageString); document.close();
  console.log('<img src="'+ randomImage);
};

displayRandomImage(productSrc);
