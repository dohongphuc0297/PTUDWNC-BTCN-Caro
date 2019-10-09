import * as types from "../actions/types";

const INITIAL_STATE = {
    stepNumber: 0,
    xIsNext: true,
    dir: "desc",
    winner: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
