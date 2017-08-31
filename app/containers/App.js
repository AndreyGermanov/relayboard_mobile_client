import {connect} from 'react-redux';
import RelayBoard from '../components/RelayBoard';
import {switchRelay,deleteRelay} from '../actions/Actions';

const mapStateToProps = (state,ownProps) => {
    return {
        relays: state.relays,
        status: state.status,
        loaded: state.loaded,
        store: ownProps.store
    }
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onSwitchRelay: (number) => {
            dispatch(switchRelay(number));
        },
        onDeleteRelay: (number,mode) => {
            dispatch(deleteRelay(number,mode))
        },
        onEditRelay: (number) => {
            console.log(number);
        }
    }
};

export default App = connect(mapStateToProps,mapDispatchToProps)(RelayBoard);