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



export {removeElement, delegate};