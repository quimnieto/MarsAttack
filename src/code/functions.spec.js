import {describe,jest, test} from "@jest/globals";
import functions from "./functions";
import messages from "./messages";

describe('TEST RANDOMS AND COMMAND VALIDATION', () => {
    test('get random row position in range [0 - 150]', async () => {
        let rowPosition = functions.getRandomRowPosition(150);
        expect(rowPosition).toBeGreaterThanOrEqual(0);
        expect(rowPosition).toBeLessThanOrEqual(150);
    });

    test('get random col position in range [0 - 150]', async () => {
        let colPosition = functions.getRandomColPosition(150);
        expect(colPosition).toBeGreaterThanOrEqual(0);
        expect(colPosition).toBeLessThanOrEqual(150);
    });

    test('isValidCommand should return true', async () => {
        expect(functions.isValidCommand('FFFFFRRRRLLL')).toBe(true);
    });

    test('isValidCommand should return false', async () => {
        expect(functions.isValidCommand('FFFFFRRRRLL%&L')).toBe(false);
    });

    test('cleanCommand should return upper case command without spaces', async () => {
        expect(functions.cleanCommand('ff   lLR rr')).toEqual('FFLLRRR');
    });
});

describe('TEST MARS BUILDING WITH ROVERS START POSITION AND OBSTACLES', () => {
    getTestElements();
    functions.generateMarsGround(100 , 100);

    let randomRow = functions.getRandomRowPosition(100);
    let randomCol = functions.getRandomColPosition(100);

    test('Check min, max and random cel contains mars-ground class', async () => {
        expect(document.getElementById("0-0").classList.contains("mars-ground")).toBe(true);
        expect(document.getElementById("100-100").classList.contains("mars-ground")).toBe(true);
        expect(document.getElementById(randomRow + "-" + randomCol).classList.contains("mars-ground"))
            .toBe(true);
    });

    test('Check rover start position in mars', async () => {
        functions.getRoverStartPosition(100, 100);
        let roverId = document.querySelector('.rover').id;
        let x = parseInt(roverId.split('-')[0]);
        let y = parseInt(roverId.split('-')[1]);

        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThanOrEqual(100);

        expect(y).toBeGreaterThanOrEqual(0);
        expect(y).toBeLessThanOrEqual(100);
    });

    test('Check number of obstacles', async () => {
        functions.getObstacles(100, 100);
        expect(document.querySelectorAll('.obstacle').length).toBe(100);
    })
});

describe('TEST ROVERS MOVEMENTS', () => {
    test('Error message when rover finds an obstacle', async () => {
        clearMars();
        let roverCel = document.getElementById('5-5');
        roverCel.setAttribute('class', 'rover');

        let obstacleCel = document.getElementById('5-6');
        obstacleCel.setAttribute('class', 'obstacle');

        document.querySelector('#command').setAttribute('value', 'R');
        document.querySelector('#send-command').click();

        let consoleText = document.getElementById('console').value;
        expect(consoleText).toBe('Error: ' + messages.OBSTACLE_MESSAGE);
    });

    test('Error message when rover finds limit area', async () => {
        clearMars();

        let roverCel = document.getElementById('0-0');
        roverCel.setAttribute('class', 'rover');

        document.querySelector('#command').setAttribute('value', 'F');
        document.querySelector('#send-command').click();

        let consoleText = document.getElementById('console').value;
        expect(consoleText).toBe('Error: ' + messages.OBSTACLE_MESSAGE);
    })

    test('Message when rover finds Elon', async () => {
        clearMars();

        let roverCel = document.getElementById('5-5');
        roverCel.setAttribute('class', 'rover');

        let elonCel = document.getElementById('5-6');
        elonCel.setAttribute('class', 'elon');

        document.querySelector('#command').setAttribute('value', 'R');
        document.querySelector('#send-command').click();

        let consoleText = document.getElementById('console').value;
        expect(consoleText).toBe(messages.ELON_MESSAGE);
    })
});

function getTestElements () {
    document.body.innerHTML =
        '<div id="martian-ground"></div>' +
        '<button id="send-command">Send Command</button>' +
        '<input type="text" id="command" name="command">' +
        '<textarea id="console" class="form-input" rows="10" cols="28" disabled="" style="color: red;"></textarea>';
}

function clearMars () {
    document.body.innerHTML = '';
    getTestElements();
    functions.generateMarsGround(100 , 100);
    functions.sendCommand();
}
