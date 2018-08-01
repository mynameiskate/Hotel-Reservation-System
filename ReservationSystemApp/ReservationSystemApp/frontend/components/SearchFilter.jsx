import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import Select from 'react-select';
import SelectService from '../services/SelectService.js';

const SearchFilter = (props) => {
    const { sendRequest, handleSubmit, onCancel, 
            locations, selectedCity, selectedCountry, 
            onCountrySelect, onCitySelect } = props;

    return (
        <form onSubmit={handleSubmit(sendRequest)}>           
            <Field name='name' label='Name' component={InputField} /> 
            <Select
                value = { selectedCountry.value } 
                options={SelectService.getOptions(locations, 'country', 'countryId')}
                isSearchable={true}
                onChange={country => onCountrySelect(country.value, country.label)} 
            />      
            <Select
                value = { selectedCity.value }
                options={SelectService.getFilteredOptions(locations, 'countryId', selectedCountry.id, 'city')}
                onChange={city => onCitySelect(city.value)}
                isSearchable={true}
            /> 
            <button type='submit'>
                Submit
            </button>
            <button type='button' onClick={onCancel}>Reset filter</button>
        </form>
    );
}

export default reduxForm({ 
    form: 'searchFilterForm'
})(SearchFilter)