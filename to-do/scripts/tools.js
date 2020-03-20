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


const get = (target, getFunction) => {
    let request = new XMLHttpRequest();
    request.open('GET', target, true);

    request.onload = function(){
        if (request.status >= 200 && request.status < 400){
            let giveBackJS = JSON.parse(request.responseText);
            getFunction(giveBackJS);
        } else {
        console.log('Server hat einen Fehler gemeldet');
        }
    };

    request.send();
};


const post = (target, todos, postFunction) => {
    let request = new XMLHttpRequest();
    request.open('POST', target, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) { 
            let giveBackJS = JSON.parse(request.responseText);
            postFunction(giveBackJS);
        } else {
        console.log('Server meldet fehler');
        }
    };

    let requestData = JSON.stringify(todos); // Daten die übermittelt werden
    request.send(requestData)
};



export {removeElement, delegate, post, get};