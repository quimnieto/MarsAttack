import functions from './code/functions';

const ROW_NUMBER = 10;
const COL_NUMBER = 10;

functions.generateMarsGround(ROW_NUMBER, COL_NUMBER);
functions.getRoverStartPosition(ROW_NUMBER, COL_NUMBER);
functions.getObstacles(ROW_NUMBER, COL_NUMBER);
functions.getElonPosition(ROW_NUMBER, COL_NUMBER);
functions.sendCommand();