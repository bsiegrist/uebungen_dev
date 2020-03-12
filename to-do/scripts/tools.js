function removeElement(x){
    x.parentNode.removeChild(x);
};

function delegate(cssClass, myfunction){
    return function(event){
        if (event.target.matches(cssClass)){
            myfunction(event);
        };
    };
};



export {removeElement, delegate};