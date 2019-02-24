document.addEventListener('DOMContentLoaded',() => {
  console.log('Jscript Loaded');

  let interValSet = 0;

  const submitButton = document.querySelector('#new-item-form');
  submitButton.addEventListener('submit',formSubmission);

  const savedList = document.querySelector('#savedList');

  const newItemWrapperDiv = document.createElement('div');
  newItemWrapperDiv.classList.add('itemsWrapper');

  savedList.appendChild(newItemWrapperDiv);

  const button = document.querySelector('#delete-button');
  button.addEventListener('click',deleteButton);

  const rollingButton = document.querySelector('#start-rolling');
  rollingButton.addEventListener('click',function(){

    if (interValSet === 0){
      interValSet = startRolling()
    } else {
      interValSet = stopRolling(interValSet)
    }
  });
});

const deleteButton = (event) => {
  const savedList = document.querySelector('#savedList');
  const listItems = document.querySelectorAll('.itemList');

  for (let item of listItems){
    savedList.removeChild(item);
  }
};

const startRolling = () => {

  textInterval = setInterval(updateFunc, 500)
  const rollingButton = document.querySelector('#start-rolling');
  rollingButton.textContent = "Stop Rolling";
  return textInterval;
};

const stopRolling = (interValSet) => {
  clearInterval(interValSet);
  const rollingButton = document.querySelector('#start-rolling');
  rollingButton.textContent = "Start Rolling";
  return 0;
};

const waveLetters = function(word){

  let firstCapFound = false;
  let upperCount = 0;
  let upperIndexPos = 0;

  newText = word.split('').map(function(letter,index){

    if (letter === letter.toUpperCase() && letter !== " "){
      upperIndexPos = index;
      upperCount += 1;
    }
    return letter;

  });

  if(upperIndexPos >= (newText.length-1)){
    newText[0] = newText[0].toUpperCase();
    newText[newText.length-1] = newText[newText.length-1].toLowerCase();
  } else {
    newText[upperIndexPos] = newText[upperIndexPos].toLowerCase();
    newText[upperIndexPos+1] = newText[upperIndexPos+1].toUpperCase();
  }
  return newText.join('');
};

const processHeader = function(){
  const pageHeaderText = document.querySelector('h1');
  let headT = pageHeaderText.textContent;
  headT = headT.split(' ');
  pageHeaderText.textContent = headT.map(function(word){
    return word = waveLetters(word);
  }).join(' ');
};

const processParagraph = function(){
  const paragraph = document.querySelector('#text-paragraph');
  let paragraphText = paragraph.textContent;
  paragraphText = paragraphText.split(' ');

  paragraph.textContent = paragraphText.map(function(word){
    return word = waveLetters(word);
  }).join(' ');
};

const processListHeader = function(){
  const listHeader = document.querySelector('h2');
  let listHeaderText = listHeader.textContent;
  listHeaderText = listHeaderText.split(' ');
  listHeader.textContent = listHeaderText.map(function(word){
    return word = waveLetters(word);
  }).join(' ');
};

const processListItems = function(){
  const listOfItems = document.querySelectorAll('.itemList');
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
  }
};

const updateFunc = (event) => {

  processHeader();
  processParagraph();
  processListHeader();
  processListItems();
}

const layoutSetupAdd = function(item1,item2,item3){
  const newItemWrapperDiv = document.querySelector('div.itemsWrapper');
  const newItemDiv = document.createElement('div');
  newItemDiv.classList.add('itemList');

  newItemWrapperDiv.appendChild(newItemDiv);
  newItemDiv.appendChild(item1);
  newItemDiv.appendChild(item2);
  newItemDiv.appendChild(item3);

}

const createSetElement = function(elementName,string){

  const newItemSpecies = document.createElement(elementName);
  newItemSpecies.textContent = string;
  return newItemSpecies;
}

const formSubmission = (event) => {
  event.preventDefault();

  const species = document.querySelector('#species');
  const height = document.querySelector('#height');
  const diet = document.querySelector('#diet');

  newItemSpecies = createSetElement('h2',`Species: ${species.value}`);
  newItemHeight = createSetElement('h3',`Height: ${height.value}`);
  newItemDiet = createSetElement('h3',`Diet: ${diet.value}`);

  layoutSetupAdd(newItemSpecies,newItemHeight,newItemDiet);

};
