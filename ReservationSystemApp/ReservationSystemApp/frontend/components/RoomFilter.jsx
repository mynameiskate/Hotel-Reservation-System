import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import Select from 'react-select';
import InputRange from 'react-input-range';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-input-range/lib/css/index.css';

import SelectService from '../services/SelectService.js';

const RoomFilter = (props) => {
    const { onCancel, adultsAmount, onAdultsChange} = props;
    const personOptions = SelectService.getNumericOptions(10);

    return (
        <div>
            <h3>Adults</h3>
            <Select
                value = {personOptions.find(o => o.value == adultsAmount) || {}} 
                options={personOptions}
                onChange={adults => onAdultsChange(adults.value)}
            />
            <h3>Price per night</h3>
            <InputRange
                maxValue={20}
                minValue={0}
                value={6}
                onChange={value => {} } />
            <button type='button' onClick={onCancel}>Reset filter</button>
        </div>
    );
}

export default reduxForm({ 
    form: 'searchFilterForm'
})(RoomFilter)