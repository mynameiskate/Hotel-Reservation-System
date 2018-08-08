import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import Select from 'react-select';
import SelectService from '../services/SelectService.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HotelFilter = (props) => {
    const { onCancel, locations, selectedCity, selectedCountry, 
            onCountrySelect, onCitySelect, onNameChange, moveInTime,
            moveOutTime, setMoveInTime, setMoveOutTime, dateError} = props;
    const countryOptions = SelectService.getOptions(locations, 'country', 'countryId');
    const cityOptions = SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'city');

    return (
        <div>
            <Field name='name' label='Name' onChange={e => onNameChange(e.target.value)}
                component={InputField} /> 
            <Select
                value = {countryOptions.find(c => c.value == selectedCountry) || {}} 
                options={countryOptions}
                isSearchable={true}
                onChange={country => onCountrySelect(country)}
            />
            <Select
                value = {cityOptions.find(c => c.value == selectedCity) || {}}
                options={cityOptions}
                onChange={city => onCitySelect(city)}
                isSearchable={true}
            /> 
            <DatePicker
                dateFormat = "DD/MM/YYYY"
                selected = {moveInTime}
                onChange={date => setMoveInTime(date)}
            />
            <DatePicker
                dateFormat = "DD/MM/YYYY"
                selected = {moveOutTime}
                onChange={date => setMoveOutTime(date)}
            />
            {dateError && <h2>{dateError}</h2>}
            <button type='button' onClick={onCancel}>Reset filter</button>
        </div>
    );
}

export default reduxForm({ 
    form: 'searchFilterForm'
})(HotelFilter)