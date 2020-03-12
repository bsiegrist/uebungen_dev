function delegate(cssClass, myfunction){
    return function(event){
        if (event.target.matches(cssClass)){
            myfunction(event);
        };
    };
};



export {delegate};