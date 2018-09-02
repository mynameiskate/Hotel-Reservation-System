import React from 'react';
import { reduxForm } from 'redux-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

import SelectService from '../../services/SelectService';
import { dateFormats } from '../../constants/dateFormats';

const RoomFilter = (props) => {
    const { moveInDate, moveOutDate, setMoveInDate,
            setMoveOutDate, dateError, adultsAmount, onAdultsChange } = props;

    const personOptions = SelectService.getNumericOptions(10);

    return (
        <div className="roomFilter">
        <div className="selectFieldBlock">
            <div className="datePickerBlock">
                        <label className="filterLabel">Move in date</label>
                        <DatePicker
                            className="datePicker"
                            dateFormat = {dateFormats.CALENDAR_DISPLAY_FORMAT}
                            selected = {moveInDate}
                            onChange={date => setMoveInDate(date)}
                        />
            </div>
            <div className="datePickerBlock">
                <label>Move in date</label>
                <DatePicker
                    className="datePicker"
                    dateFormat =  {dateFormats.CALENDAR_DISPLAY_FORMAT}
                    selected = {moveOutDate}
                    onChange={date => setMoveOutDate(date)}
                />
            </div>
            </div>
            <div className="selectBlock">
                <label>Adults</label>
                <Select
                    classNamePrefix="custom-select"
                    value = {personOptions.find(o => o.value == adultsAmount) || {}}
                    options={personOptions}
                    onChange={adults => onAdultsChange(adults.value)}
                />
            </div>
            {dateError && <label>{dateError}</label>}
        </div>
    );
}

export default reduxForm({
    form: 'roomFilterForm'
})(RoomFilter)
