var xBtn = document.querySelectorAll('.list__delete');
var ul = document.querySelector('.list');
var check = document.querySelectorAll('.list__check');
var label = document.querySelectorAll('.list__checkbox');

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
        if (x.checked == true){
            x.parentNode.parentNode.classList.add('.list__item--done');
            console.log(x.parentNode.lastChild);
        } else {
            x.parentNode.parentNode.classList.remove('.list__item--done');
            console.log(x.parentNode.parentNode);
        }
    })
}