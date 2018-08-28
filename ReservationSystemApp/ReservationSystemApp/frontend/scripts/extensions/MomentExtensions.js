import moment from 'moment';
import 'moment-duration-format';

import {
    dateFormats
} from '../constants/dateFormats';

class MomentExtensions {
    static stringToMoment(strDate) {
        return strDate ? moment(strDate, dateFormats.REQUEST_DATE_FORMAT) : null;
    }

    static timeMomentToStr = (time) => {
        return time ? moment.utc(time.as('milliseconds')).format(dateFormats.TIMER_FORMAT).toString() : null;
    }

    static formatTime(timeStr) {
        return timeStr ? moment.duration(`${timeStr}:00`).format('mm:ss', {
            forceLength: true,
            trim: false
        }) : null;
    }
}

export default MomentExtensions;