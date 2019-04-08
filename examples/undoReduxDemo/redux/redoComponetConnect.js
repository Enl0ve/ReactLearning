import RedoComponent from '../components/redoComponent'
import {ActionCreators} from 'redux-undo'
import {connect} from 'react-redux'
import {increase, decrease} from '../Actions/redoActions'

const mapStateToProps = (state) => ({values: state.present});
const mapDispatchToProps = (dispatch) => ({
    onIncrease() {
        dispatch(increase());
    },
    onDecrease() {
        dispatch(decrease());
    },
    onUndo() {
        dispatch(ActionCreators.undo());
    },
    onRedo() {
        dispatch(ActionCreators.redo());
    }
})
const RedoComponentConnect =  connect(mapStateToProps, mapDispatchToProps)(RedoComponent);
export default RedoComponentConnect;