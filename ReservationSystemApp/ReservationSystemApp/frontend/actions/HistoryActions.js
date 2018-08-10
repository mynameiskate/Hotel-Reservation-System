import {
    push
} from 'connected-react-router';

class HistoryActions {
    static pushUrl(link, query) {
        return dispatch => {
            dispatch(push(`${link}?${query}`));
        }
    }
}

export default HistoryActions;