import _ from 'lodash';
import Store from '../store/Store';
import AppActions from './AppActions';

var RelayListActions = class {

    constructor() {
        this.types = {
            UPDATE_STATUS: 'UPDATE_STATUS'
        }
    }

    deleteRelay(number,mode) {
        var self = this;
        return (dispatch,getState) => {
            if (mode == 1) {
                dispatch(AppActions.showDeleteRelayAlertDialog(number));
            } else if (mode == 2) {
                var state = getState();
                var relay_list = _.cloneDeep(Store.settings.relays);
                var relay_indexes = Store.getObjectKeysById(number);
                if (relay_indexes && relay_indexes.length) {
                    var relay_index = relay_indexes[0];
                    relay_list.splice(relay_index,1);
                    dispatch(AppActions.updateMode('relay_list'));
                    Store.saveSettings({relays:relay_list}, function () {
                        dispatch(AppActions.loadState())
                    });
                }
            }
        }
    }

    switchRelay(number) {
        var self = this;
        return (dispatch) => {
            Store.switchRelay(number, function (status) {
                dispatch(self.updateStatus(status));
            });
        }
    }

    updateStatus(status) {
        return {
            type: this.types.UPDATE_STATUS,
            status: status
        }
    }
};

export default new RelayListActions();