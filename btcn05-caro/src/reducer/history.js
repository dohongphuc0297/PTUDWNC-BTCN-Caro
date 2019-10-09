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
        case types.RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
