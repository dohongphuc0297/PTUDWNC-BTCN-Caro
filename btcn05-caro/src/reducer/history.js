import * as types from "../actions/types";
import { Size } from '../GameConfig';

const INITIAL_STATE =
    [
        {
            id: null,
            squares: Array((Size * Size)).fill(null),
            index: null
        }
    ];

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.CLICK:
            return state.slice(0, action.value.history.index).concat(action.value.history.value);
        case types.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
