

function getMarsGround (totalRows, totalCols) {
    let martianGround = document.getElementById("martian-ground");
    let battlefield   = document.createElement("table");
    let battlefieldBody = document.createElement("tbody");

    battlefield.setAttribute('cellspacing', '0');
    battlefield.setAttribute('cellpadding', '0');

    for (let rowNumber = 0; rowNumber < (totalRows + 1); rowNumber++) {
        let row = document.createElement("tr");

        for (let colNumber = 0; colNumber < (totalCols + 1); colNumber++) {
            let cel = document.createElement("td");
            cel.setAttribute('id', rowNumber + '-' + colNumber)
            cel.setAttribute('class', 'mars-ground');
            row.appendChild(cel);
        }
        battlefieldBody.appendChild(row);
    }

    battlefield.appendChild(battlefieldBody);
    martianGround.appendChild(battlefield);
    battlefield.setAttribute("border", "2");
}

function getStartPosition (rowNumber, colNumber) {
    let x = getRandomRowPosition(rowNumber);
    let y = getRandomColPosition(colNumber);

    document.getElementById(x + '-' + y).classList.add('rover');
}

function getRandomRowPosition (rowNumber) {
    return Math.floor(Math.random() * rowNumber);
}

function getRandomColPosition (colNumber) {
    return Math.floor(Math.random() * colNumber);
}

function getObstacles (rowNumber, colNumber) {
    for (let obsNumber = 0; obsNumber < rowNumber; obsNumber ++) {
        let x = getRandomRowPosition(rowNumber);
        let y = getRandomColPosition(colNumber);
        let cel = document.getElementById(x + '-' + y);

        if (checkIfHasClass(cel)) {
            cel.classList.add('obstacle');
        } else {
            obsNumber -= 1;
        }
    }
}

function getElon (rowNumber, colNumber) {
    let x = getRandomRowPosition(rowNumber);
    let y = getRandomColPosition(colNumber);
    let cel = document.getElementById(x + '-' + y);

    if (checkIfHasClass(cel)) {
        cel.classList.add('elon');
    } else {
       getElon(rowNumber, colNumber)
    }
}

function checkIfHasClass (cel) {
    return cel.classList.contains('rover') === false &&
        cel.classList.contains('obstacle') === false &&
        cel.classList.contains('elon') === false;
}

function sendCommand () {
    let button = document.querySelector('#send-command');

    button.addEventListener('click',() => {
        let fullCommand = cleanCommand(document.querySelector('#command').value);

        if (isValidCommand(fullCommand)) {
            getSplitedCommand(fullCommand).forEach(command => makeMove(command));
        }
    });
}

function cleanCommand (command) {
    return command.replace(/ /g, "").toUpperCase();
}

function isValidCommand (command) {
    return command.match(/^[FfBbRrLl]+$/g) !== null;
}

function getSplitedCommand (command) {
    return command.replace(/ /g, '').split('');
}

function makeMove (command) {
    let rover = document.querySelector('.rover');
    let roverInitialPosition = rover.id;

    let currentX = roverInitialPosition.split('-')[0];
    let currentY = roverInitialPosition.split('-')[1];
    let x = currentX;
    let y = currentY;

    switch (command) {
        case 'F':
            x = parseInt(currentX) - 1;
            break;
        case 'R':
            y = parseInt(currentY) + 1;
            break;
        case 'L':
            y = parseInt(currentY) - 1;
            break;
    }

    let newPosition = document.getElementById(x + '-' + y);

    if (newPosition && newPosition.classList.contains('obstacle') === false) {
        rover.classList.remove('rover');
        newPosition.classList.add('rover');
    } else if (newPosition.classList.contains('elon')) {
            console.log('Elon Wins!!')
    } else {
        console.log('obstacle!');
    }
}


export default {
    getMarsGround,
    getStartPosition,
    getObstacles,
    sendCommand,
    getRandomRowPosition,
    getRandomColPosition,
    isValidCommand,
    cleanCommand,
    getElon
}