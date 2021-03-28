import messages from './messages';

const COMMAND_FORWARD = 'F';
const COMMAND_BACKWARD = 'B';
const COMMAND_RIGHT = 'R';
const COMMAND_LEFT = 'L';
const CLASS_ROVER = 'rover';
const CLASS_OBSTACLE = 'obstacle';
const CLASS_ELON = 'elon';

function generateMarsGround (totalRows, totalCols) {
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

function getRoverStartPosition (totalRows, totalCols) {
    let x = getRandomRowPosition(totalRows);
    let y = getRandomColPosition(totalCols);

    document.getElementById(x + '-' + y).classList.add(CLASS_ROVER);
}

function getObstacles (rowNumber, colNumber) {
    for (let obsNumber = 0; obsNumber < rowNumber; obsNumber ++) {
        let x = getRandomRowPosition(rowNumber);
        let y = getRandomColPosition(colNumber);
        let cel = document.getElementById(x + '-' + y);

        if (checkIfIsVoidCel(cel)) {
            cel.classList.add(CLASS_OBSTACLE);
        } else {
            obsNumber -= 1;
        }
    }
}

function getElonPosition (rowNumber, colNumber) {
    let x = getRandomRowPosition(rowNumber);
    let y = getRandomColPosition(colNumber);
    let cel = document.getElementById(x + '-' + y);

    if (checkIfIsVoidCel(cel)) {
        cel.classList.add(CLASS_ELON);
    } else {
       getElonPosition(rowNumber, colNumber)
    }
}

function getRandomRowPosition (rowNumber) {
    return Math.floor(Math.random() * rowNumber);
}

function getRandomColPosition (colNumber) {
    return Math.floor(Math.random() * colNumber);
}

function checkIfIsVoidCel (cel) {
    return cel.classList.contains(CLASS_ROVER) === false &&
        cel.classList.contains(CLASS_OBSTACLE) === false &&
        cel.classList.contains(CLASS_ELON) === false;
}

function sendCommand () {
    let button = document.querySelector('#send-command');

    button.addEventListener('click',() => {
        let fullCommand = cleanCommand(document.querySelector('#command').value);

        try {
            if (isValidCommand(fullCommand)) {
                getSplitedCommand(fullCommand).forEach(command => makeMove(command));
            } else {
                throw new Error('Wrong command!');
            }
        } catch (e) {
            printRoversMessage(e.toString());
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

    let currentXPosition = roverInitialPosition.split('-')[0];
    let currentYPosition = roverInitialPosition.split('-')[1];
    let newXPosition = currentXPosition;
    let newYPosition = currentYPosition;

    switch (command) {
        case COMMAND_FORWARD:
            newXPosition = parseInt(currentXPosition) - 1;
            break;
        case COMMAND_BACKWARD:
            newXPosition = parseInt(currentXPosition) + 1;
            break;
        case COMMAND_RIGHT:
            newYPosition = parseInt(currentYPosition) + 1;
            break;
        case COMMAND_LEFT:
            newYPosition = parseInt(currentYPosition) - 1;
            break;
    }

    let newPosition = document.getElementById(newXPosition + '-' + newYPosition);

    if (newPosition === null) {
        throw new Error(messages.OBSTACLE_MESSAGE);
    }

    if (newPosition.classList.contains(CLASS_OBSTACLE)) {
        throw new Error(messages.OBSTACLE_MESSAGE);
    }

    if (newPosition.classList.contains(CLASS_ELON)) {
        printRoversMessage(messages.ELON_MESSAGE, false);
        newPosition.classList.remove('elon');
    }

    rover.classList.remove(CLASS_ROVER);
    newPosition.classList.add(CLASS_ROVER);
}

function printRoversMessage (message, error = true) {
    let console =  document.querySelector('#console');
    console.value = '';
    console.style.color = error === true ? 'red' : 'green';
    console.value = message;
}

export default {
    getMarsGround: generateMarsGround,
    getStartPosition: getRoverStartPosition,
    getObstacles,
    sendCommand,
    getRandomRowPosition,
    getRandomColPosition,
    isValidCommand,
    cleanCommand,
    getElon: getElonPosition
}