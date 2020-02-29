var xBtn = document.querySelectorAll('.list__delete');
var ul = document.querySelector('.list');
var check = document.querySelectorAll('.list__checkmark');
var label = document.querySelectorAll('.list__checklabel');
var arrow = document.querySelector('.input__arrow');
var formfield = document.querySelector('.input__formfield');
var form = document.querySelector('.input__line');

//x-Button für entfernen
for (var i = 0; i < xBtn.length; i++){
    xBtn[i].addEventListener('click', deleteListItem);
}

function deleteListItem(event){
    var li = event.currentTarget.parentNode;
    ul.removeChild(li);
}

//Style für erledigt toggeln
for (var i = 0; i < check.length; i++){
    check[i].addEventListener('click', function(event){
        var x = event.target;
        x.parentNode.parentNode.classList.toggle('list__item--done');
    })
}

//text eingeben und neues li erstellen
form.addEventListener('submit', addLi);

function addLi(){
    event.preventDefault(); 

    //new LI
    var newLi = document.createElement('li');
    newLi.classList.add('list__item');
    newLi.innerHTML = '<div class="list__checkbox"><input type="checkbox" class="list__checkmark" id="newID"><label class="list__label" for="newID"></label></div><p class="list__item-name">newID</p><div class="list__delete"><img src="img/cross.svg" alt="delete-button"></div>';
    ul.appendChild(newLi);
}


/*
//new LI
var newLi = document.createElement('li');
newLi.classList.add('list__item');
ul.appendChild(newLi);

//new Checkbox
var newDivCheckbox = document.createElement('div');
newDivCheckbox.classList.add('list__checkbox');
newLi.appendChild(newDivCheckbox);
var newCheckmark = document.createElement('input');
newCheckmark.setAttribute('type', 'checkbox');
newCheckmark.classList.add('list__checkmark');
newLi.appendChild(newCheckmark);
newCheckmark.setAttribute('id', 'XYZ');//hinzufügen individuelle ID?
var newLabel = document.createElement('label');
newCheckmark.setAttribute('for', 'XYZ');//hinzufügen individuelle ID?
newCheckmark.classList.add('list__label');
newLi.appendChild(newLabel);

//new item
var newLiItem = document.createElement('p');
newLiItem.classList.add('list__item-name');
newLiItem.innerText = "XYZ" //hinzufügen individueller Text
newLi.appendChild(newLiItem);

//new Delete
var newDelete = document.createElement('div');
newDivCheckbox.classList.add('list__delete');
newLi.appendChild(newDelete);
var newX = document.createElement('img');
newX.setAttribute('src', 'img/cross.svg');
newX.setAttribute('alt', 'delete-button');
newDelete.appendChild(newX);
*/