import { push } from 'connected-react-router';
import  moment from 'moment';

class HelperActions {
    static pushUrl(link, query) {
        return dispatch => {
            dispatch(push(`${link}?${query}`));
        }
    }

    static handleError = function(response) {
        if (!response.ok) {
            throw Error(response.status)
        }
        return response;
    }

    static stringToMoment(strDate) {
        let date =  strDate ? moment(strDate, 'YYYY/MM/DD') : null;
        return date;
    }
}

export default HelperActions;