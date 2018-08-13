import moment from 'moment';
import 'moment-duration-format';

import {
    dateFormats
} from '../constants/dateFormats.js';

class MomentExtensions {
    static stringToMoment(strDate) {
        return strDate ? moment(strDate, dateFormats.REQUEST_DATE_FORMAT) : null;
    }

    static formatTime(timeStr) {
        return timeStr ? moment.duration(`${timeStr}:00`).format(dateFormats.MOVE_IN_TIME_FORMAT) : null;
    }
}

export default MomentExtensions;