document.addEventListener('DOMContentLoaded',() => {
  console.log('Jscript Loaded');

  const submitButton = document.querySelector('#new-item-form');
  submitButton.addEventListener('submit',formSubmission);

  const savedList = document.querySelector('#savedList');

  const button = document.querySelector('#button');
  button.addEventListener('click',buttonClicked);

  setInterval(updateFunc, 500);

});

const waveLetters = function(word){

  let firstCapFound = false;
  let upperCount = 0;
  let upperIndexPos = 0;

  // console.log('Word', word);

  newText = word.split('').map(function(letter,index){

    if (letter === letter.toUpperCase() && letter !== " "){
      upperIndexPos = index;
      upperCount += 1;
    }
    return letter;

  });
  // console.log(upperCount, upperIndexPos);

  if(upperIndexPos >= (newText.length-1)){
    newText[0] = newText[0].toUpperCase();
    newText[newText.length-1] = newText[newText.length-1].toLowerCase();
  } else {
    newText[upperIndexPos] = newText[upperIndexPos].toLowerCase();
    newText[upperIndexPos+1] = newText[upperIndexPos+1].toUpperCase();
  }
  return newText.join('');
};

const updateFunc = (event) => {

  const pageHeaderText = document.querySelector('h1');
  const listHeader = document.querySelector('h2');
  const paragraph = document.querySelector('#text-paragraph');
  const listOfItems = document.querySelectorAll('.itemList');

  // console.log("list of items",listOfItems);

  let headT = pageHeaderText.textContent;
  let listHeaderText = listHeader.textContent;
  let paragraphText = paragraph.textContent;

  headT = headT.split(' ');
  listHeaderText = listHeaderText.split(' ');
  paragraphText = paragraphText.split(' ');


  pageHeaderText.textContent = headT.map(function(word){
    return word = waveLetters(word);
  }).join(' ');

  paragraph.textContent = paragraphText.map(function(word){
    return word = waveLetters(word);
  }).join(' ');

  listHeader.textContent = listHeaderText.map(function(word){
    return word = waveLetters(word);
  }).join(' ');

  if(listOfItems.length > 0){

    for(let item of listOfItems){
      const mainListing = item.querySelector('h2');
      const secondListing = item.querySelectorAll('h3');

      let mainLText = mainListing.textContent;
      mainLText = mainLText.split(' ');

      mainListing.textContent = mainLText.map(function(word){
        return word = waveLetters(word);
      }).join(' ');

      let textToChange = secondListing[1].textContent;
      textToChange = textToChange.split(' ');

      secondListing[1].textContent = textToChange.map(function(word){
        return word = waveLetters(word);
      }).join(' ');

    }

    // const mainListing = listOfItems[0].querySelector('h2');
    // const secondListing = listOfItems[0].querySelectorAll('h3');
    //
    // let textToChange = secondListing[1].textContent;
    // textToChange = textToChange.split(' ');
    //
    // secondListing[1].textContent = textToChange.map(function(word){
    //   return word = waveLetters(word);
    // }).join(' ');
    //
    // let mainLText = mainListing.textContent;
    // mainLText = mainLText.split(' ');
    //
    // mainListing.textContent = mainLText.map(function(word){
    //   return word = waveLetters(word);
    // }).join(' ');
  }

  // console.log("join the output",newText.join(' '));
  // pageHeaderText.textContent = headT.join(' ');
  // listHeader.textContent = listHeaderText.join(' ');
}


const buttonClicked = (event) => {
  const savedList = document.querySelector('#savedList');
  const listItems = document.querySelectorAll('.itemList');

  for (let item of listItems){
    savedList.removeChild(item);
  }
};

const formSubmission = (event) => {
  event.preventDefault();

  const species = document.querySelector('#species');
  const height = document.querySelector('#height');
  const diet = document.querySelector('#diet');

  const savedList = document.querySelector('#savedList');
  const newItemList = document.createElement('li');
  newItemList.classList.add('itemList');
  const newItemDiv = document.createElement('div');

  const newItemSpecies = document.createElement('h2');
  newItemSpecies.textContent = `Species: ${species.value}`;

  const newItemHeight = document.createElement('h3');
  newItemHeight.textContent = `Height: ${height.value}`;

  const newItemDiet = document.createElement('h3');
  newItemDiet.textContent = `Diet: ${diet.value}`;

  savedList.appendChild(newItemList);

  newItemList.appendChild(newItemSpecies);
  newItemList.appendChild(newItemHeight);
  newItemList.appendChild(newItemDiet);
};
