import _ from 'lodash';
import {saveSettings,savedState,getObjectKeysById} from '../utils/Utils';
import AppActions from './AppActions';

var RelayListActions = class {

    deleteRelay(number,mode) {
        var self = this;
        return (dispatch,getState) => {
            if (mode == 1) {
                dispatch(AppActions.showDeleteRelayAlertDialog(number));
            } else if (mode == 2) {
                var state = getState();
                var relay_list = _.cloneDeep(state.RelayList.relays);
                var relay_indexes = getObjectKeysById(number,relay_list);
                if (relay_indexes && relay_indexes.length) {
                    var relay_index = relay_indexes[0];
                    relay_list.splice(relay_index,1);
                    dispatch(AppActions.updateMode('relay_list'));
                    saveSettings({relays:relay_list}, function () {
                        dispatch(AppActions.loadState())
                    });
                }
            }
        }
    }

    switchRelay(number) {
        return (dispatch) => {
            var mode = 'ON';
            if (savedState.status[number-1]==1) {
                mode = 'OFF';
            }
            fetch(savedState.settings.host+':'+savedState.settings.port+'/request/'+mode+'/'+number).then(function() {
                dispatch(AppActions.loadState());
            },function(err) {
            });
        }
    }
};

export default new RelayListActions();