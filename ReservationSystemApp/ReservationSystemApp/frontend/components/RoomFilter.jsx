import React from 'react';
import { reduxForm } from 'redux-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import SelectService from '../services/SelectService';
import { dateFormats } from '../constants/dateFormats';

const RoomFilter = (props) => {
    const { moveInDate, moveOutDate, setMoveInDate,
            setMoveOutDate, dateError, adultsAmount, onAdultsChange } = props;

    const personOptions = SelectService.getNumericOptions(10);

    return (
        <div>
            <h3>Move in date</h3>
            <DatePicker
                dateFormat = {dateFormats.CALENDAR_DISPLAY_FORMAT}
                selected = {moveInDate}
                onChange={date => setMoveInDate(date)}
            />
            <h3>Move in date</h3>
            <DatePicker
                dateFormat =  {dateFormats.CALENDAR_DISPLAY_FORMAT}
                selected = {moveOutDate}
                onChange={date => setMoveOutDate(date)}
            />
            <h3>Adults</h3>
            <Select
                value = {personOptions.find(o => o.value == adultsAmount) || {}}
                options={personOptions}
                onChange={adults => onAdultsChange(adults.value)}
            />
            {dateError && <h3>{dateError}</h3>}
        </div>
    );
}

export default reduxForm({
    form: 'roomFilterForm'
})(RoomFilter)
