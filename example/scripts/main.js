'use strict';

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var canvasSobel = document.getElementById('canvas-sobel');
var contextSobel = canvasSobel.getContext('2d');

var fileInput = document.getElementById('file');

fileInput.onchange = function(event) {
  var url = window.URL.createObjectURL(event.target.files[0]);
  loadImage(url);
};

function loadImage(src) {
  var image = new Image();
  image.src = src;
  image.onload = drawImage;
}

function drawImage(event) {
  var image = event.target;
  var w = image.width;
  var h = image.height;

  canvas.width = canvasSobel.width = w;
  canvas.height = canvasSobel.height = h;

  context.drawImage(image, 0, 0);
  var imageData = context.getImageData(0, 0, w, h);

  var sobelData = Sobel(imageData);
  var sobelImageData = sobelData.toImageData();
  contextSobel.putImageData(sobelImageData, 0, 0);
}

loadImage('images/valve.png');
