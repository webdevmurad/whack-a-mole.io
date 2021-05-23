const square = document.querySelectorAll('.square'),
    mole = document.querySelectorAll('.mole'),
    timeLeft = document.querySelector('#time-left'),
    btnGame = document.querySelector('.newGame'),
    gameMenu = document.querySelector('.game-menu'),
    gameStart = document.querySelector('.game-start'),
    gameContent = document.querySelector('.game-content'),
    selectLevel = document.querySelector('#standard-select'),
    modal = document.querySelector('#myModal'),
    modalInput = document.querySelector('.modal__input'),
    modalClose = document.querySelector('.modal__close'),
    btnNewGame = document.querySelector('.game-new'),
    saveResultBtn = document.querySelector('.modal__button'),
    recordTable = document.querySelector('.game-record__table');

let score = document.querySelector('#score');

let result = 0;
let currentTime = timeLeft.textContent;
let timerIdInterval = null;
let timerId = null;
let levelGame = null;

let easyArr = [],
    mediumArr = [],
    hardArr = [],
    staticArr = null;

function randomSquare() {
    square.forEach(className=> {
        className.classList.remove('mole')
    })

    let randomPosition = square[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');

    hitPosition = randomPosition.id;
}

square.forEach(id => {
    id.addEventListener('mouseup', () => {
        if(id.id === hitPosition) {
            result = result + 1
            score.textContent = result
            console.log(score);
            console.log(result)
        }
    })
})


function moveMole(timer, level, arrLevel) {
    levelGame = null;
    staticArr = null;
    levelGame = level;
    staticArr = arrLevel;
    timerIdInterval = null;
    indicateRecords(levelGame);
    timerId = setInterval(randomSquare, timer);
    timerIdInterval = setInterval(countDown, 1000);
    gameMenu.style.display = 'none';
    gameContent.style.display = 'flex';
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime;

    if (currentTime === 0) {
        clearInterval(timerIdInterval);
        clearClassMole();
        clearInterval(timerIdInterval);
        clearInterval(timerId);
        modal.style.display = 'flex';
    }

}

gameStart.onclick = () => {
    modalInput.classList.remove('error')
    score.innerHTML = '0';
    result = 0;
    switch(selectLevel.value) {
        case 'easy':
            moveMole(1000, 'easy', easyArr);
            break;
        case 'medium':
            moveMole(800, 'medium', mediumArr);
            break;
        case 'hard':
            moveMole(600, 'hard', hardArr);
            break;
    }
}

btnNewGame.onclick = () => {
    gameMenu.style.display = 'flex';
    gameContent.style.display = 'none';
    timeLeft.innerHTML = 10;
    score.innerHTML = '0';
    result = 0;
    currentTime = timeLeft.textContent;
    clearInterval(timerIdInterval);
    clearInterval(timerId);
    clearClassMole();
}

modalClose.onclick = () => {
    modal.style.display = 'none';
    modalInput.classList.remove('error');
}


saveResultBtn.onclick = () => {
    if(modalInput.value === '') {
        modalInput.classList.add('error');
    } else {
        modalInput.classList.remove('error');
        staticArr.unshift({'name': modalInput.value, 'value': Number(score.innerHTML)});
        modalInput.innerHTML = '';
        localStorage.setItem(levelGame, JSON.stringify(staticArr));
    }
    clearClassMole();
    modal.style.display = 'none';
}


function clearClassMole() {
    square.forEach(className=> {
        className.classList.remove('mole');
    })
}

function indicateRecords(localName) {
    recordTable.innerHTML = '';
    if(localStorage.getItem(localName)) {
        JSON.parse(localStorage.getItem(localName)).sort(function(a,b) {
            return a.value - b.value;
        }).map(record => {
            recordTable.innerHTML += convertToHtml(record);
        })
    } else {
        recordTable.innerHTML = `<div class="game-record">
            <p>Нет рекордов</p>
        </div>`;
    }
}

function convertToHtml(record) {
    return `<div class="game-record">
        <p>${record.name}</p>
        <p>${record.value}</p>
    </div>`
}