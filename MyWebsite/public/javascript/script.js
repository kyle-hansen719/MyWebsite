'use strict'

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

//Pokemon Logic
let pokemonName;
let totalScore = 0;
let totalPokemon = 1;
let hasScored = false;

const getPokemon = () => {
    let request = new XMLHttpRequest;
    request.open('GET', `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 893) + 1}`)
    request.send();

    //shows loading gif and clears submission box
    document.querySelector('#loading').src = '/images/loading.gif';
    document.querySelector('#pokemonBox').value = '';

    request.onload = () => {
        let data = JSON.parse(request.responseText);

        document.querySelector('#pokemonImg').src = data.sprites.front_default;

        let name = data.species.name;
        let upperName = name[0].toUpperCase() + name.slice(1)
        pokemonName = upperName.replace('-', ' ');
        document.querySelector('#loading').src = '';

        hasScored = false;
    }
}
getPokemon();

//checks if the submission is a new correct answer and upticks score
const UpScore = () => {
    if (!hasScored) {
        totalScore++;
        document.querySelector('#score').innerHTML = `Score: ${totalScore}`;
    }
}

//gets a new pokemon for new pokemon button
document.querySelector("#pokemonButton").addEventListener('click', () => {
    document.querySelector('#response').innerHTML = '';
    getPokemon();

    //changes total pokemon number
    totalPokemon++;
    document.querySelector('#totalPokemon').innerHTML = `Pokemon: ${totalPokemon}`;
});

//checks whether the submission is correct
document.querySelector('#anotherButton').addEventListener('click', () => {
    if (document.querySelector('#pokemonBox').value.toLowerCase() == pokemonName.toLowerCase()) {
        document.querySelector('#response').innerHTML = 'Correct';
        UpScore();
        hasScored = true;
    }
    else {
        document.querySelector('#response').innerHTML = 'Wrong';
    }
});

//adds enter to click submit button
document.querySelector('#pokemonBox').addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        event.preventDefault();
        document.querySelector('#anotherButton').click();
    }
});

