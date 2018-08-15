import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import InputField from './InputField';
import SelectService from '../services/SelectService';
import { dateFormats } from '../constants/dateFormats';

const HotelFilter = (props) => {
    const { onCancel, locations, selectedCity, selectedCountry,
            onCountrySelect, onCitySelect, onNameChange, moveInDate,
            moveOutDate, setMoveInDate, setMoveOutDate, dateError,
            adultsAmount, onAdultsChange } = props;

    const countryOptions = SelectService.getOptions(locations, 'country', 'countryId');
    const cityOptions = SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'cityId');
    const personOptions = SelectService.getNumericOptions(10);
    const city = cityOptions.find(c => c.value == selectedCity);
    return (
        <div>
            <Field name='name' label='Name' onChange={e => onNameChange(e.target.value)}
                component={InputField} />
            <h3>Destination country</h3>
            <Select
                value = {countryOptions.find(c => c.value == selectedCountry) || {}}
                options={countryOptions}
                isSearchable={true}
                onChange={country => onCountrySelect(country)}
            />
            <h3>Destination city</h3>
            <Select
                value = {cityOptions.find(c => c.value == selectedCity) || {}}
                options={cityOptions}
                onChange={city => onCitySelect(city)}
                isSearchable={true}
            />
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
            <button type='button' onClick={onCancel}>Reset filter</button>
        </div>
    );
}

export default reduxForm({
    form: 'searchFilterForm'
})(HotelFilter)
