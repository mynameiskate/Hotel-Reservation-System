import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import Select from 'react-select';
import SelectService from '../services/SelectService.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchFilter = (props) => {
    const { onCancel, locations, selectedCity, selectedCountry, 
            onCountrySelect, onCitySelect, onNameChange, startDate,
            endDate, setStartDate, setEndDate } = props;
    const countryOptions = SelectService.getOptions(locations, 'country', 'countryId');
    const cityOptions = SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'city');
    
    /*const handleInputChange = (e, callback) => {
        const date = moment( e.target.value, "YYYY-MM-DD HH:mm" );
        if( date.isValid() ) {
            callback(date);
        }
    }*/

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
                selected = {startDate}
                onChange={date => setStartDate(date)}
            />
            <DatePicker
                selected = {endDate}
                onChange={date => setEndDate(date)}
            />
            <button type='button' onClick={onCancel}>Reset filter</button>
        </div>
    );
}

export default reduxForm({ 
    form: 'searchFilterForm'
})(SearchFilter)