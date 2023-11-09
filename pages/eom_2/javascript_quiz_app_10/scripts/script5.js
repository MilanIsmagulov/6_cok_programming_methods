const anwserArr = [['Языки программирования позволяют описывать переходы между состояниями компьютера с помощью операторов'],['Основано на хорошо организованной топологии программ, отказе от глобальных данных и безусловных переходов, разделении программы на модули с ясным назначением и интерфейсом'], ['Каждый модуль имеет определенное назначение и интерфейс с внешней средой'],['Использует классы для структурирования кода и обмена сообщениями между объектами для взаимодействия задач']]; //Ответы в правильном порядке
const text = ["Императивное программирование", "Структурное программирование", "Модульное программирование", "Объектно-ориентированное программирование"]

const list = document.getElementById('list');
let listItems = [];
let dragStartIndex;

function reloadWindow(){
    window.location.reload();
}



let numberOfQuestion = 10; 
let numberOfQuestionSum = 10;

let textOfQuestionPlace = document.querySelector('#question_number_1')

textOfQuestionPlace.innerHTML = '<p>' + '<span>' + numberOfQuestion +  '. ' + '</span>'  + 'Соотнесите название метода программирования и его описание.' + '</p>'

let stepMarkerPlace = document.querySelector('.step_marker');
console.log("stepMarkerPlace")
for (let i = 0; i < numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button_blue.svg";
    stepMarkerPlace.appendChild(markers);
}

for (let i = 0; i < numberOfQuestionSum-numberOfQuestion; i++){
    let markers = document.createElement('img');
    markers.src = "./content/radio_button.svg";
    stepMarkerPlace.appendChild(markers);
}

let stepPlaceDescription = document.querySelector('.number_description');
stepPlaceDescription.innerHTML = numberOfQuestion + '/' + numberOfQuestionSum;




createList2()

function createList2() {
    [...anwserArr]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((item, index) => {
        const listItem = document.createElement('li');

        listItem.setAttribute('id', index);
        listItem.innerHTML = `
    <div class="number">${text[index]} <img src="./content/marker_blue.png" alt="1"></div>
    <div class="item" draggable="true">${item} </div>
  `;
        listItems.push(listItem);
        list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('id');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('id');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.item');
    const itemTwo = listItems[toIndex].querySelector('.item');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

let checkAnwserButton = document.querySelector('#check_button_1')
let reloadButton = document.querySelector('#check_button_2')
let nextButton = document.querySelector('#check_button_3')
checkAnwserButton.classList.remove('disabled_button')
reloadButton.classList.add('disabled_button')
nextButton.classList.add('disabled_button')


localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: true}));
function checkAnwser5() {
    checkAnwserButton.classList.add('disabled_button')
    reloadButton.classList.remove('disabled_button')
    nextButton.classList.remove('disabled_button')
    listItems.forEach((item, index) => {
        const itemName = item.querySelector('.item').innerText.trim()
        
        if (itemName !== anwserArr[index].join(',')) {
            item.classList.add('incorrect')
            localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: false}));

        } else {
            
            item.classList.remove('incorrect')
            item.classList.add('correct')
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.item');
    const dragListItems = document.querySelectorAll('.list li');

    draggables.forEach((draggable) => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach((item) => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

let openPopUpButton = document.querySelector('#open_popup_button')
let closePopUpButton = document.querySelector('#close_popup_button_1')
let popUpWindow = document.querySelector('#popup1')


openPopUpButton.addEventListener('click', function(){
    popUpWindow.classList.remove('close')
})

closePopUpButton.addEventListener('click', function(){
    popUpWindow.classList.add('close')
})

localStorage.setItem('answer_' + numberOfQuestion, JSON.stringify({questionPlace: true}));