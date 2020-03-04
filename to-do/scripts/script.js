var xBtn = document.querySelectorAll('.list__delete');
var ul = document.querySelector('.list');
var check = document.querySelectorAll('.list__checkmark');
var label = document.querySelectorAll('.list__checklabel');
var arrow = document.querySelector('.input__arrow');
var formfield = document.querySelector('.input__formfield');
var form = document.querySelector('.input__line');

var listElements = [];


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
    }
});

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


