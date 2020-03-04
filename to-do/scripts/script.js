var xBtn = document.querySelectorAll('.list__delete');
var ul = document.querySelector('.list');
var check = document.querySelectorAll('.list__checkmark');
var label = document.querySelectorAll('.list__checklabel');
var arrow = document.querySelector('.input__arrow');
var formfield = document.querySelector('.input__formfield');
var form = document.querySelector('.input__line');

var list = [];

//create List from Local Storage
function renderList(){
    ul.innerHTML = "";
    if (localStorage.getItem('list')){
        list = JSON.parse(localStorage.getItem('list'));
    } else {
        list = ['Milch', 'Brot'];
    }
    for (i = 0; i < list.length; i++){
        var newLi = document.createElement('li');
        newLi.innerHTML = '<div class="list__checkbox"><input type="checkbox" class="list__checkmark" id="' + i + '"><label class="list__label" for="' + i + '"></label></div><p class="list__item-name">' + list[i] + '</p><div class="list__delete"><img src="img/cross.svg" alt="delete-button"></div>';
        newLi.classList.add('list__item');
        ul.appendChild(newLi);
    }
};

//Liste aufbauen lassen
renderList();



//x-Button für entfernen klassischer Ansatz
/*
for (var i = 0; i < xBtn.length; i++){
    xBtn[i].addEventListener('click', deleteListItem);
}

function deleteListItem(event){
    var li = event.currentTarget.parentNode;
    ul.removeChild(li);
}
*/


//x-Button delegation-Ansatz
ul.addEventListener('click', function(event){
    if (event.target && event.target.matches('.list__delete img')){
        var li = event.target.parentNode.parentNode;
        li.parentNode.removeChild(li);
        var getID = event.target.parentNode.id;
        list.splice(getID, 1);
        localStorage.setItem('list', JSON.stringify(list));
        renderList();
    }
});


//Style für erledigt toggeln klassischer Ansatz
/*
for (var i = 0; i < check.length; i++){
    check[i].addEventListener('click', function(event){
        var x = event.target;
        x.parentNode.parentNode.classList.toggle('list__item--done');
    })
}
*/

//Style für erledigt toggeln mit delegate Ansatz
ul.addEventListener('click', toggle);
function toggle(event){
    if (event.target && event.target.matches('.list__checkbox input')){
    var doneItem = event.target.parentNode.parentNode;
    doneItem.classList.toggle('list__item--done');
    }
}

//text eingeben und neues li erstellen
form.addEventListener('submit', addLi);

function addLi(){
    event.preventDefault(); 
    //push to list
    list.push(formfield.value);
    console.log(list);
    formfield.value = "";
    localStorage.setItem('list', JSON.stringify(list));
    //create new list
    renderList();
}