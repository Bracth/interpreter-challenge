import interpreterReducer, { ActionTypes } from "./reducer.js";

const Modes = { positionMode: 0, inmediateMode: 1 };
export const Errors = {
  ERROR_ALL_ELEMENTS_NOT_INTS:
    "Error, all elements in the list needs to be integers",
  ERROR_NOT_VALID_OPCODE: "Error, not valid opcode",
};

export default async function interpreter(intList) {
  // Check if all the elements are integers, if not return error
  if (isAnyNotInteger(intList)) return Errors.ERROR_ALL_ELEMENTS_NOT_INTS;

  let i = 0;
  let result = [...intList];
  while (i < result.length) {
    const instruction = result[i].toString().padStart(5, "0");

    const action = getAction(result, instruction, i);

    // Check if is valid action opcode if not return error
    if (!action) return Errors.ERROR_NOT_VALID_OPCODE;

    // Stop interpreter if actiontype stop
    if (action.type.name === ActionTypes[99].name) break;

    // Get the new result and index
    const newState = await interpreterReducer({ result, i }, action);
    result = newState.result;
    i = newState.i;
  }

  return result;
}

function isAnyNotInteger(intList) {
  // We return true if at list one element in the list is not a integer
  return intList.some((int) => !Number.isInteger(int));
}

function getAction(intList, instruction, i) {
  // Get opcode from the last digit in instruction
  const opcode = parseInt(instruction.slice(3));
  const action = {};

  // Get action type and action payload from the instruction
  action.type = getActionType(opcode);

  // iF action type undefined we return null, is not a valid opcode
  if (!action.type)
    return null;

  action.payload = getActionPayload(intList, action.type.params, instruction, i);

  return action;
}

function getActionType(opcode) {
  // We check if the opcode is in the list, if not is not a valid opcode and we need to return an error
  const actionType = ActionTypes[opcode];

  return actionType;
}

function getActionPayload(intList, numbersOfParams, instruction, interpreterIndex) {

  const params = []

  for (let i = 1; i <= numbersOfParams; i++) {
    const mode = parseInt(instruction[3 - i]);

    // If is the last param we return the destination
    if (i === numbersOfParams)
      params.push(getDestination(intList, interpreterIndex + i))

    else
      params.push(getParam(intList, interpreterIndex + i, mode))
  }

  return params;
}

function getParam(intList, position, mode) {
  const param = intList[position];

  return mode === Modes.positionMode ? intList[param] : param;
}

function getDestination(intList, position) {
  const param = intList[position];

  return param;
}
