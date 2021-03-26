// const CANVAS = document.getElementById("martian-floor");
// let CONTEXT = CANVAS.getContext('2d');

function getMarsFloor () {
    let floor = document.getElementById("martian-floor");
    let tabla   = document.createElement("table");
    let tblBody = document.createElement("tbody");

    for (let i = 0; i < 100; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 100; j++) {
            let cel = document.createElement("td");
            cel.setAttribute('id', i + '-' + j)
            row.appendChild(cel);
        }
        tblBody.appendChild(row);
    }

    tabla.appendChild(tblBody);
    floor.appendChild(tabla);
    tabla.setAttribute("border", "2");
}

function getStartPosition () {
    let x = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 100);
    document.getElementById(x + '-' + y).classList.add('rover');
}

function getCommand () {
    let button = document.querySelector('.button');

    button.addEventListener('click',(event) => {
        let commandList = getSplitedCommand(document.querySelector('#command').value);
        commandList.forEach(command => makeMove(command));
    });
}

function isValidCommand (command) {
    return true;

}

function getSplitedCommand (command) {
    return command.replace(/ /g, '').split('');
}

function makeMove (command) {
    if (isValidCommand(command) === true) {
        let rover = document.querySelector('.rover');
        let roverInitialPosition = rover.id;

        let x = roverInitialPosition.split('-')[0];
        let y = roverInitialPosition.split('-')[1];

        switch (command) {
            case 'F':
                x = parseInt(x) - 1;
                break;
            case 'R':
                y = parseInt(y) + 1;
                break;
            case 'L':
                y = parseInt(y) - 1;
                break;
        }

        let id = x + '-' + y;
        rover.classList.remove('rover');
        document.getElementById(id).classList.add('rover');
    } else {
        alert('COMMAND ERROR');
    }
}


export default {
    getMarsFloor,
    getStartPosition,
    getCommand
}