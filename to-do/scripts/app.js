import * as Tools from './tools.js';

const ul = document.querySelector('.list');
const formfield = document.querySelector('.input__formfield');
const form = document.querySelector('.input__line');
const counter = document.querySelector('.counter p')

let toDolist = [];


if (localStorage.getItem('list')){
    toDolist = JSON.parse(localStorage.getItem('list'));
} ;


//create List from Local Storage
function renderList(){
    ul.innerHTML = "";
    toDolist.forEach((element, index) => {
        let newLi = document.createElement('li');
        newLi.innerHTML = `<div class="list__checkbox">
                              <input type="checkbox" class="list__checkmark" id="todo-${index}">
                              <label class="list__label" for="todo-${index}"></label>
                           </div>
                           <p class="list__item-name">${element}</p>
                           <div class="list__delete">
                              <img src="img/cross.svg" alt="delete-button">
                           </div>`;
        newLi.classList.add('list__item');
        newLi.id = index;
        ul.appendChild(newLi);
    })
    counter.innerText = `${toDolist.length} items left`;
};

//x-Button mit module delegate
ul.addEventListener('click',Tools.delegate('.list__delete img', (event) => {
    Tools.removeElement(event.target.parentNode.parentNode);
    let getID = event.target.parentNode.parentNode.id
    toDolist.splice(getID, 1);
    localStorage.setItem('list', JSON.stringify(toDolist));
    renderList();
}));

//Style toggeln mit module delegate
ul.addEventListener('click', Tools.delegate('.list__checkbox input', (event) => {
    let doneItem = event.target.parentNode.parentNode;
    doneItem.classList.toggle('list__item--done');
}));

//text eingeben und neues li erstellen
form.addEventListener('submit', (event) => {
    //standard stoppen
    event.preventDefault(); 
    //push to list
    toDolist.push(formfield.value);
    //formularfeld leeren
    formfield.value = "";
    //speichern in localStorage
    localStorage.setItem('list', JSON.stringify(toDolist));
    //create new list
    renderList();
});

//Liste aufbauen lassen
renderList();
