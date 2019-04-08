import {createAction, combineActions, handleAction} from 'redux-actions'

const increase = createAction('increase');
const decrease = createAction('decrease');

const compositionActions = combineActions(increase, decrease);

const initialState = 0;
const reducer = handleAction(compositionActions,{
    next(state, action){
        switch(action.type) {
            case 'increase':
                return state + 1;
            case 'decrease':
                if(state == 0)
                    return 0;
                return state - 1;
            default:
                return;
        }
    },
    throw(state) { return state;}
}, initialState);

export {reducer, increase, decrease}

