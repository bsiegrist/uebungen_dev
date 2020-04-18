'use strict';

const delegate = (cssClass, myfunction) => {
  return event => {
    if (event.target.matches(cssClass)) {
      myfunction(event);
    }
  };
};

const getFetch = (target, getFunction) => {
  fetch(target).then(response => {
    return response.json();
  }).then(answer => {
    getFunction(answer);
  });
};

const postFetch = (target, todos, postFunction) => {
  fetch(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todos)
  }).then(response => response.json()).then(answer => {
    postFunction(answer);
  }).catch(error => console.error('Error:', error));
};

const ul = document.querySelector('.list');
const formfield = document.querySelector('.input__formfield');
const form = document.querySelector('.input__line');
const counter = document.querySelector('.counter p');
const filterShowAll = document.querySelector('#showAll');
const filterShowToDos = document.querySelector('#showToDos');
const filterShowDone = document.querySelector('#showDone');
let toDoList = [];

if (localStorage.getItem('list')) {
  toDoList = JSON.parse(localStorage.getItem('list'));
} else {
  getFetch('http://localhost:3002/todos', function (response) {
    toDoList = response;
    renderList(toDoList);
    console.log('infos from get with fetch');
  });
}

function renderList(filteredList) {
  ul.innerHTML = "";
  filteredList.forEach(element => {
    let newLi = document.createElement('li');
    newLi.innerHTML = `<div class="list__checkbox">
                              <input type="checkbox" class="list__checkmark" id="todo-${element.id}">
                              <label class="list__label" for="todo-${element.id}"></label>
                           </div>
                           <p class="list__item-name">${element.todoText}</p>
                           <div class="list__sort">
                              <img src="img/arrow-up.svg" alt="button up" class="list__sort-up">
                              <img src="img/arrow-down.svg" alt="button down" class="list__sort-down">
                           </div>
                           <div class="list__delete">
                              <img src="img/cross.svg" alt="delete-button">
                           </div>`;
    newLi.classList.add('list__item');
    newLi.id = element.id;
    ul.appendChild(newLi);

    if (element.done === true) {
      newLi.classList.add('list__item--done');
      document.querySelector(`#todo-${element.id}`).checked = true;
    }
  }); //counter

  let toDoListOpen = toDoList.filter(element => {
    return element.done === false;
  });
  counter.innerText = `${toDoListOpen.length} items left`;
}

function renderListFilter() {
  //create new list depending on filter
  if (filterShowToDos.classList.contains('filters__button--active')) {
    let toDoListOpen = toDoList.filter(element => {
      return element.done === false;
    });
    renderList(toDoListOpen);
  } else if (filterShowDone.classList.contains('filters__button--active')) {
    let toDoListDone = toDoList.filter(element => {
      return element.done === true;
    });
    renderList(toDoListDone);
  } else {
    renderList(toDoList);
  }
}

function saveList() {
  localStorage.setItem('list', JSON.stringify(toDoList));
  postFetch('http://localhost:3002/todos', toDoList, function (response) {
    console.log('post with fetch works!');
  });
}

ul.addEventListener('click', delegate('.list__delete img', event => {
  let getID = parseInt(event.target.parentNode.parentNode.id); // img  >  div list delete  >  li

  let getIndex = toDoList.findIndex(element => {
    return element.id === getID;
  });
  toDoList.splice(getIndex, 1);
  saveList();
  renderListFilter();
})); //Style toggeln

ul.addEventListener('click', delegate('.list__checkbox input', event => {
  let getID = parseInt(event.target.parentNode.parentNode.id); //input  >  div list checkbox  >  li

  let getIndex = toDoList.findIndex(element => {
    return element.id === getID;
  });
  toDoList[getIndex].done = !toDoList[getIndex].done;
  saveList();
  renderListFilter();
})); //up-Button mit module delegate

ul.addEventListener('click', delegate('.list__sort-up', event => {
  let getID = parseInt(event.target.parentNode.parentNode.id); // img  >  div list sort  >  li

  let getIndex = toDoList.findIndex(element => {
    return element.id === getID;
  });
  let change = toDoList.splice(getIndex, 1);
  toDoList.splice(getIndex - 1, 0, change[0]);
  saveList();
  renderListFilter();
})); //down-Button mit module delegate

ul.addEventListener('click', delegate('.list__sort-down', event => {
  let getID = parseInt(event.target.parentNode.parentNode.id); // img  >  div list sort  >  li

  let getIndex = toDoList.findIndex(element => {
    return element.id === getID;
  });
  let change = toDoList.splice(getIndex, 1);
  toDoList.splice(parseInt(getIndex) + 1, 0, change[0]);
  saveList();
  renderListFilter();
})); //text eingeben und neues li erstellen

form.addEventListener('submit', event => {
  //standard stoppen
  event.preventDefault(); //push to list

  toDoList.push({
    'todoText': formfield.value,
    'done': false,
    'id': Date.now()
  }); //formularfeld leeren

  formfield.value = ""; //speichern

  saveList(); //create new list depending on filter

  renderListFilter();
}); //filterbuttons

filterShowAll.addEventListener('click', () => {
  filterShowAll.classList.add('filters__button--active');
  filterShowToDos.classList.remove('filters__button--active');
  filterShowDone.classList.remove('filters__button--active');
  renderList(toDoList);
});
filterShowToDos.addEventListener('click', () => {
  filterShowAll.classList.remove('filters__button--active');
  filterShowToDos.classList.add('filters__button--active');
  filterShowDone.classList.remove('filters__button--active');
  let toDoListOpen = toDoList.filter(element => {
    return element.done === false;
  });
  renderList(toDoListOpen);
});
filterShowDone.addEventListener('click', () => {
  filterShowAll.classList.remove('filters__button--active');
  filterShowToDos.classList.remove('filters__button--active');
  filterShowDone.classList.add('filters__button--active');
  let toDoListDone = toDoList.filter(element => {
    return element.done === true;
  });
  renderList(toDoListDone);
}); //Liste aufbauen lassen bei reload

renderList(toDoList);
