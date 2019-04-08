import React, {Component} from 'react'
import ReacDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import { reducer } from './Actions/redoActions'
import undoable from 'redux-undo'
import RedoComponentConnect from './components/redoComponetConnect'

//undoable(reducer:object|array, congig:{...}:object)
const store = createStore(undoable(reducer, {
    limit: 1, //limit the size of array of past and future
}));

const render = () => ReacDOM.render(
    <Provider store={store}>
        <RedoComponentConnect/>
    </Provider>,
    document.getElementById('root')
);

render();

store.subscribe(render);