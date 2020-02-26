var xBtn = document.querySelectorAll('.list__delete');
var ul = document.querySelector('.list');

//x-Button für entfernen
for (var i = 0; i < xBtn.length; i++){
    xBtn[i].addEventListener('click', deleteListItem);
}

function deleteListItem(event){
    var li = event.currentTarget.parentNode;
    ul.removeChild(li);
}