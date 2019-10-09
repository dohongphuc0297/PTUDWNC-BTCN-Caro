import { createStore } from "redux";
import Reducers from '../reducer/index';

export default () => {
    // Create store with reducers and initial state
    const initialState = {};
    const store = createStore(initialState, Reducers);

    return store;
};