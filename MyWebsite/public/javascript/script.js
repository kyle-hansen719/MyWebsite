window.onload = () => {
    console.log('javascript loaded');

    //text animation
    let counter = 0;
    let letterArray = [];
    let isFinished = false;
    let animationBox = document.querySelector('#animation-text');
    let myString = animationBox.innerHTML;
    const Write = () => {
        if (counter < myString.length && !isFinished) {
            letterArray.push(myString[counter]);
            animationBox.innerHTML = letterArray.join("");
            counter++;
        }
        else if (counter == myString.length) {
            setTimeout(() => {
                isFinished = true;
                letterArray.pop(myString[counter]);
                animationBox.innerHTML = letterArray.join("");
                counter--;
            }, 1000);
        }
        else if (counter > 1 && isFinished) {
            letterArray.pop(myString[counter]);
            animationBox.innerHTML = letterArray.join("");
            counter--;
        }
        else {
            isFinished = false;
        }
    }
    setInterval(Write, 50);
}