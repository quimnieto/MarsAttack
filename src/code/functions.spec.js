import {describe, jest, test} from "@jest/globals";
import functions from "./functions";

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
    functions.getMarsGround(100 , 100);

    let randomRow = functions.getRandomRowPosition(100);
    let randomCol = functions.getRandomColPosition(100);

    test('Check min, max and random cel contains mars-ground class', async () => {
        expect(document.getElementById("0-0").classList.contains("mars-ground")).toBe(true);
        expect(document.getElementById("100-100").classList.contains("mars-ground")).toBe(true);
        expect(document.getElementById(randomRow + "-" + randomCol).classList.contains("mars-ground"))
            .toBe(true);
    });

    test('Check rover start position in mars', async () => {
        functions.getStartPosition(100, 100);
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

    document.body.innerHTML = '';
    getTestElements();
    functions.getMarsGround(100 , 100);
    functions.sendCommand();

    test('Send command and check limit', async () => {
        let cell = document.getElementById('5-5');
        cell.setAttribute('class', 'rover');
        document.querySelector('#command').setAttribute('value', 'FFFFFFFFF');
        document.querySelector('#send-command').click();

        let roverNewPosition = document.querySelector('.rover').id;
        let newX = roverNewPosition.split('-')[0];
        let newY = roverNewPosition.split('-')[1];

        expect(parseInt(newX)).toBe(0);
        expect(parseInt(newY)).toBe(5);
    })
});

function getTestElements () {
    document.body.innerHTML =
        '<div id="martian-ground"></div>' +
        '<button id="send-command">Send Command</button>' +
        '<input type="text" id="command" name="command">';
}
