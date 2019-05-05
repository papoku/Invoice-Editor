/* Reducer file here */

import { combineReducers } from 'redux';
import { UPDATE_ROW, FETCH_ROW } from '../actions/types';

const INITIAL_STATE = { data: [], message: '', error: ''};

function fetchRow(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_ROW:
            return { ...state, data: action.payload };
        default:
    }
    return state;
}

function updateRow(state = INITIAL_STATE, action) {
    switch (action.type) {
        case UPDATE_ROW:
            return { ...state, data: action.payload };
            //break;
        default:
    }
    return state;
}

// combine all your reducer if multiple created
const rootReducer = combineReducers({
    table: fetchRow,
    updatedRow: updateRow
  });

export default rootReducer;