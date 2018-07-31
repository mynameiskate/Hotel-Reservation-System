import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import Select from 'react-select';
import SelectService from '../services/SelectService.js';

const SearchFilter = (props) => {
    const { sendRequest, handleSubmit, onCancelClick, 
            locations, selectedCity, selectedCountry, 
            onCountrySelect, onCitySelect } = props;

    /*const getOptions = (list, labelProperty, valueProperty = null) => {
        if (!valueProperty) {
            valueProperty = labelProperty;
        }

        return (list) ?
                list.map(obj => { 
                    return ({   value: obj[valueProperty],
                                label: obj[labelProperty] });
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
    }*/

    return (
        <form onSubmit={handleSubmit(sendRequest)}>           
            <Field name='name' label='Name' component={InputField} /> 
            <Select
                options={SelectService.getOptions(locations, 'country', 'countryId')}
                isSearchable={true}
                onChange={country => onCountrySelect(country.value, country.label)} 
            />      
            <Select
                options={SelectService.getFilteredOptions(locations, 'countryId', selectedCountry.id, 'city')}
                onChange={city => onCitySelect(city.value)}
                isSearchable={true}
            /> 
            <button type='submit'>
                Submit
            </button>
            <button type='button' onClick={onCancelClick}>Cancel</button>
        </form>
    );
}

export default reduxForm({ 
    form: 'searchFilterForm'
})(SearchFilter)