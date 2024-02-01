import getUserInput from './userInput.js';

export const ActionTypes = {
    1: { name: "ADD_NUMBERS", params: 3 },
    2: { name: "MULTIPLY_NUMBERS", params: 3 },
    3: { name: "SAVE_INPUT", params: 1 },
    4: { name: "PRINT_NUMBER", params: 1 },
    99: { name: "STOP_INTERPRETER", params: 0 },
};

export default function interpreterReducer(prevState, action) {
    switch (action.type.name) {
        case ActionTypes[1].name:
            return addNumbers(prevState, action.payload);
        case ActionTypes[2].name:
            return multiplyNumbers(prevState, action.payload);
        case ActionTypes[3].name:
            return saveInput(prevState, action.payload);
        case ActionTypes[4].name:
            return printNumber(prevState, action.payload);
        case ActionTypes[99].name:
            return prevState;
    }
}

function addNumbers(prevState, payload) {
    const newState = { ...prevState };
    const result = payload[0] + payload[1];
    newState.result[payload[2]] = result;
    newState.i += 4;

    return newState
}

function multiplyNumbers(prevState, payload) {
    const newState = { ...prevState };
    const result = payload[0] * payload[1];
    newState.result[payload[2]] = result;
    newState.i += 4;

    return newState;
}

async function saveInput(prevState, payload) {

    const newState = { ...prevState };
    newState.i += 2;

    const input = await getUserInput()

    newState.result[payload[0]] = parseInt(input);

    return newState;
}

function printNumber(prevState, payload) {


    const newState = { ...prevState };
    newState.i += 2;

    console.log(newState.result[payload[0]])

    return newState;


}

