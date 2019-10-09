import * as types from "../actions/types";

const INITIAL_STATE = {
    stepNumber: 0,
    xIsNext: true,
    dir: "desc",
    winner: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.CLICK:
            return {
                ...state,
                stepNumber: action.value.board.stepNumber,
                xIsNext: action.value.board.xIsNext,
                winner: action.value.board.winner
            };
        case types.JUMP_TO:
            console.log(action);
            return {
                ...state,
                stepNumber: action.value.stepNumber,
                xIsNext: action.value.xIsNext,
                winner: action.value.winner
            };
        case types.TOOGLE:
            return {
                ...state,
                dir: state.dir === "asc" ? "desc" : "asc"
            };
        case types.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
