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

var totalVotes = 0;
var totalViews = 0;

var content = document.getElementById('content');

var voteForAnImage = function(event){
  if(event.target.className === 'product'){
    console.log('Nice');
  }
};
content.addEventListener('click', voteForAnImage);

var displayRandomImage = function(){

};

var calculatePercentage = function(){
  var percentage = totalVotes / totalViews;
}