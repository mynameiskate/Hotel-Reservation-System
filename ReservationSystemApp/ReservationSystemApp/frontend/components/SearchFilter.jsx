import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import Select from 'react-select';
import SelectService from '../services/SelectService.js';

const SearchFilter = (props) => {
    const { onCancel, locations, selectedCity, selectedCountry, 
            onCountrySelect, onCitySelect } = props;
    const countryOptions = SelectService.getOptions(locations, 'country', 'countryId');
    const cityOptions = SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'city');
console.log(selectedCity);
console.log(cityOptions);
console.log(cityOptions.find(c => c.value == selectedCity));
    return (
        <div>
            <Field name='name' label='Name' component={InputField} /> 
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
            <button type='button' onClick={onCancel}>Reset filter</button>
        </div>
    );
}

export default reduxForm({ 
    form: 'searchFilterForm'
})(SearchFilter)