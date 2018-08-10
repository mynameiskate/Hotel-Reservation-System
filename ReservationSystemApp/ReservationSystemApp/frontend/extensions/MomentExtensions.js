import moment from 'moment';

import {
    dateFormats
} from '../constants/dateFormats.js';

class MomentExtensions {
    static stringToMoment(strDate) {
        return strDate ? moment(strDate, dateFormats.REQUEST_DATE_FORMAT) : null;
    }
}

export default MomentExtensions;