import {connect} from 'react-redux';
import RelayList from '../components/RelaysList';
import RelayListActions from '../actions/RelayListActions';
import RelaySettingsActions from '../actions/RelaySettingsActions';
import AppActions from '../actions/AppActions';
import Store from '../store/Store';

const mapStateToProps = (state) => {
    return {
        relays: state.RelayList.relays,
        status: state.RelayList.status
    }     
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onSwitchRelay: (number) => {
            dispatch(RelayListActions.switchRelay(number));
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
        onNewRelay: () => {
            var state = ownProps.store.getState();
            var id = Store.findFreeId();
            dispatch(RelaySettingsActions.editRelay(null,id,''));
            dispatch(AppActions.updateMode('relay_settings'));
        }
    }
};

export default RelayListContainer = connect(mapStateToProps,mapDispatchToProps)(RelayList);
