const removeElement = (x) => {
    x.parentNode.removeChild(x);
};

const delegate = (cssClass, myfunction) => {
    return (event) => {
        if (event.target.matches(cssClass)){
            myfunction(event);
        };
    };
};

const getFetch = (target, getFunction) => {
    fetch(target).then((response) => {
        return response.json();
    }).then((answer) => { 
        getFunction(answer);
      });
  }

const postFetch = (target, todos, postFunction) => {
    fetch(target, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todos),
    })
    .then(response => response.json())
    .then((answer) => {
        postFunction(answer);
    })
    .catch(error => console.error('Error:', error));
  };


export {removeElement, delegate, postFetch, getFetch};