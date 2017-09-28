import {connect} from 'react-redux';
import RelayList from '../components/RelaysList';
import RelayListActions from '../actions/RelayListActions';
import RelaySettingsActions from '../actions/RelaySettingsActions';
import AppActions from '../actions/AppActions';
import Store from '../store/Store';

const mapStateToProps = (state) => {
    return {
        relayboards: state.RelayList.relayboards,
        currentRelayBoard: state.RelayList.currentRelayBoard
    }     
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onSwitchRelay: (relayboard_id,index) => {
            dispatch(RelayListActions.switchRelay(relayboard_id,index));
        },
        onDeleteRelay: (number, mode) => {
            dispatch(RelayListActions.deleteRelay(number, mode))
        },
        onEditRelay: (index, number, name) => {
            dispatch(RelaySettingsActions.editRelay(index, number, name));
            dispatch(AppActions.updateMode('relay_settings'));
        },
        onSettingsClick: () => {
            dispatch(AppActions.updateMode('app_settings'));
        },
        onRefreshClick: () => {
            dispatch(AppActions.loadState());
        },
        onNewRelay: () => {
            var state = ownProps.store.getState();
            var id = Store.findFreeId();
            dispatch(RelaySettingsActions.editRelay(null,id,''));
            dispatch(AppActions.updateMode('relay_settings'));
        },
        onChangeCurrentRelayboard: (id) => {
            Store.currentRelayBoard = id;
            dispatch(RelayListActions.updateCurrentRelayBoard(id))
        }

    }
};

export default RelayListContainer = connect(mapStateToProps,mapDispatchToProps)(RelayList);
