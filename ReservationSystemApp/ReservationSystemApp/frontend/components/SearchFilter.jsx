import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import Select from 'react-select';
//import { isRequired, maxLength, minLength } from './validationRules.js';

const SearchFilter = (props) => {
    const { sendRequest, handleSubmit, onCancelClick, 
            invalid, pristine, submitting, locations,
            selectedCity, selectedCountry, 
            onCountrySelect, onCitySelect } = props;
    let city = selectedCity;

    const getOptions = (list, property) => {
        return (list) ?
                list.map(obj => { 
                    let option = obj[property];
                    return ({   value: option,
                                label: option });
                })
                : [];
    }

    const getFilteredOptions = (list, filterProp, filterValue, property) => {
        if (!list) {
            return [];
        }
        else {
            let filteredList = list.filter(obj => obj[filterProp] === filterValue);
            return getOptions(filteredList, property);
        }       
    }

    return (
        <form onSubmit={handleSubmit(sendRequest)}>           
            <Field name='name' label='Name' component={InputField} /> 
            <Select
                options={getOptions(locations, 'country')}
                isSearchable={true}
                onChange={country => onCountrySelect(country.value)}
            />      
            <Select
                options={getFilteredOptions(locations, 'country', selectedCountry, 'city')}
                onChange={city => onCitySelect(city.value)}
                isSearchable={true}
            /> 
            <button type='submit'
                    disabled={pristine || submitting}>
                Submit
            </button>
            <button type='button' onClick={onCancelClick}>Cancel</button>
        </form>
    );
}

export default reduxForm({ 
    form: 'searchFilterForm'
})(SearchFilter)