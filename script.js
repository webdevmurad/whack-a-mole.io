const square = document.querySelectorAll('.square'),
    mole = document.querySelectorAll('.mole'),
    timeLeft = document.querySelector('#time-left'),
    btnGame = document.querySelector('.newGame');

let score = document.querySelector('#score');

let result = 0;
let currentTime = timeLeft.textContent;

function randomSquare() {
    square.forEach(className=> {
        className.classList.remove('mole')
    })

    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');

    hitPosition = randomPosition.id;
    console.log(hitPosition);
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition) {
            result = result + 1
            score.textContent = result
        }
    })
})


function moveMole() {
    let timerId = null
    timerId = setInterval(randomSquare, 1000);
}

moveMole();


function countDown() {
    currentTime--
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerId);
        alert('Game Over! Твой счет:' + result);
    }

}

let timerId = setInterval(countDown, 1000);