'use strict';
/* global $ */

function getDogImage(num) {
  fetch('https://dog.ceo/api/breeds/image/random/' + num)
    .then(response => response.json())
    .then(responseJson => 
      displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
}

function displayResults(responseJson) {
  

  let allImg = '';

 

  for(let x=0; x<responseJson.message.length;x++){ 
    console.log(responseJson.message[x]);
    allImg += `<img src="${responseJson.message[x]}" class="results-img">`;
  
  }

  $('.results-img').replaceWith(allImg);
  $('.results').removeClass('hidden');
}


function displayBreed(responseJson) {
  
  //replace the existing image with the new one
  console.log(responseJson.status);
  if(responseJson.status === 'success')
  {
    let allImg =   `<img src="${responseJson.message}" class="results-img">`;

    $('.results-hidden').html(allImg);
    //display the results section
    $('.results').removeClass('hidden');}
  else{
    alert('Something went wrong. Try again later.');
  }
}

function watchForm() {
  $('.dog').submit(event => {
    event.preventDefault();
    const pickNum = $('.js-dog-count').val();
    //console.log(pickNum);
    getDogImage(pickNum);
  });
}



function watchBreedForm() {
  $('.breed').submit(event => {
    event.preventDefault();
    const breedName = $('.js-breed-name').val();
    
    //console.log(pickNum);
    getBreedImage(breedName);
  });
}

function getBreedImage(breedName) {
  if(fetch)
    fetch('https://dog.ceo/api/breed/'+ breedName +'/images/random')
      .then(response => response.json())
      .then(responseJson => 
        displayBreed(responseJson));
  
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
  watchBreedForm();
});