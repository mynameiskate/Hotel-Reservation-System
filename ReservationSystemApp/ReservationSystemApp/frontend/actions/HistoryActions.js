import {
    push
} from 'connected-react-router';
import queryString from 'query-string';

class HistoryActions {
    static pushUrl(link, query) {
        return dispatch => {
            dispatch(push(`${link}?${query}`));
        }
    }

    static getQuery(moveInDate, moveOutDate, adults, page = 1) {
        const params = {
            page
        };

        if (moveInDate) {
            params.moveInDate = moveInDate.format('YYYY/MM/DD');
        }

        if (moveOutDate) {
            params.moveOutDate = moveOutDate.format('YYYY/MM/DD');
        }

        if (adults) {
            params.adults = adults;
        }

        const query = queryString.stringify(params);
        return query;
    }
}

export default HistoryActions;