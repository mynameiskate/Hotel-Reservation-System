import {
    push
} from 'connected-react-router';
import queryString from 'query-string';
import {
    dateFormats
} from '../constants/dateFormats';

class HistoryActions {
    static pushUrl(link, query) {
        return dispatch => {
            dispatch(push(`${link}?${query}`));
        }
    }

    static getPageQuery(page = 1) {
        return queryString.stringify({
            page
        });
    }

    static getQueryFromParams(params) {
        return queryString.stringify(params);
    }

    static getQuery(moveInDate, moveOutDate, adults, page = 1) {
        const params = {
            page
        };

        if (moveInDate) {
            params.moveInDate = moveInDate.format(dateFormats.REQUEST_DATE_FORMAT);
        }

        if (moveOutDate) {
            params.moveOutDate = moveOutDate.format(dateFormats.REQUEST_DATE_FORMAT);
        }

        if (adults) {
            params.adults = adults;
        }

        return this.getQueryFromParams(params);
    }
}

export default HistoryActions;