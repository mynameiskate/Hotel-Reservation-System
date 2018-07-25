import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import Select from 'react-select';
//import { isRequired, maxLength, minLength } from './validationRules.js';

const SearchFilter = (props) => {
    const { sendRequest, handleSubmit, onCancelClick, 
            invalid, pristine, submitting, countries, cities,
            selectedCountry, selectedCity } = props;
    return (
        <form onSubmit={handleSubmit(sendRequest)}>           
            <Field name='name' label='Name' component={InputField} /> 
            <Select
                value={selectedCountry}
                options={countries}
                isSearchable={true}
            />      
            <Select
                value={selectedCity}
                options={cities}
                isSearchable={true}
            /> 
            <button type='submit'
                    disabled={invalid || pristine || submitting}>
                Submit
            </button>
            <button type='button' onClick={onCancelClick}>Cancel</button>
        </form>
    );
}

export default reduxForm({ 
    form: 'searchFilterForm'
})(SearchFilter)