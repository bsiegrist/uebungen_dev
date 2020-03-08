const ul = document.querySelector('.list');
const formfield = document.querySelector('.input__formfield');
const form = document.querySelector('.input__line');
let list = [];

//create List from Local Storage
function renderList(){
    ul.innerHTML = "";
    if (localStorage.getItem('list')){
        list = JSON.parse(localStorage.getItem('list'));
    } else {
        list = ['Milch', 'Brot'];
    }
    list.forEach((element, index) => {
        let newLi = document.createElement('li');
        newLi.innerHTML = `<div class="list__checkbox">
                              <input type="checkbox" class="list__checkmark" id=" ${element} ">
                              <label class="list__label" for=" ${element} "></label>
                           </div>
                           <p class="list__item-name"> ${element} </p>
                           <div class="list__delete">
                              <img src="img/cross.svg" alt="delete-button">
                           </div>`;
        newLi.classList.add('list__item');
        newLi.id = index;
        ul.appendChild(newLi);
    })
};

//x-Button delegation-Ansatz
ul.addEventListener('click', function(event){
    if (event.target && event.target.matches('.list__delete img')){
        let li = event.target.parentNode.parentNode;
        li.parentNode.removeChild(li);
        let getID = li.id
        list.splice(getID, 1);
        localStorage.setItem('list', JSON.stringify(list));
        renderList();
    }
});

//Style für erledigt toggeln mit delegate Ansatz
ul.addEventListener('click', function(event){
    if (event.target.matches('.list__checkbox input')){
        let doneItem = event.target.parentNode.parentNode;
        doneItem.classList.toggle('list__item--done');
        }
});

//text eingeben und neues li erstellen
form.addEventListener('submit', function(){
    event.preventDefault(); 
    //push to list
    list.push(formfield.value);
    formfield.value = "";
    localStorage.setItem('list', JSON.stringify(list));
    //create new list
    renderList();
});

//Liste aufbauen lassen
renderList();

