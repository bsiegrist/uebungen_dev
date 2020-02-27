var xBtn = document.querySelectorAll('.list__delete');
var ul = document.querySelector('.list');
var check = document.querySelectorAll('.list__checkmark');
var label = document.querySelectorAll('.list__checklabel');

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