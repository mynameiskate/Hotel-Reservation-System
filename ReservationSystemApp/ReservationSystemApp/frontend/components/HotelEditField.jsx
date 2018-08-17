import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import InputField from './InputField';
import { isRequired, maxLength, isNumber, maxValue } from '../constants/validationRules';
import SelectService from '../services/SelectService';

const HotelEditField = (props) => {
    const { hotel, handleSubmit, sendRequest, onCancelClick, locations,
        onCitySelect, onCountrySelect, invalid, pristine, submitting,
        selectedCity, selectedCountry, onNameChange } = props;

        const countryOptions = SelectService.getOptions(locations, 'country', 'countryId');
        const cityOptions = SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'cityId');
    return (
        <form onSubmit={handleSubmit(sendRequest)}>
            <Field name='name' label='Name' component={InputField}
                validate={[isRequired, maxLength(20)]} defaultValue={hotel.name}
            />
            <Field name='stars' label='Stars' component={InputField}
                validate={[isNumber, maxValue(5)]} defaultValue={hotel.stars}
            />
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
            <Field name='address' label='Address' component={InputField}
                   defaultValue={hotel.location ? hotel.location.address : ''}
                   validate={isRequired}
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
    form: 'hotelEditForm'
})(HotelEditField)

