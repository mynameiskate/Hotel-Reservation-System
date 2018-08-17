import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import InputField from './InputField';
import { isRequired, maxLength } from '../constants/validationRules';
import SelectService from '../services/SelectService';

const HotelEditForm = (props) => {
    const { handleSubmit, sendRequest, onCancelClick, locations, hotelName,
        onCitySelect, onCountrySelect, invalid, pristine, submitting, stars,
        selectedCity, selectedCountry, onNameChange, address,
        onAddressChange, onStarsChange } = props;

        const countryOptions = SelectService.getOptions(locations, 'country', 'countryId');  ///!!
        const cityOptions = SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'cityId');
        const starOptions = SelectService.getNumericOptions(5);
    return (
        <form onSubmit={handleSubmit(sendRequest)}>
            <Field name='name' label='Name' component={InputField}
                validate={[isRequired, maxLength(20)]}
                onChange={e => onNameChange(e.target.value)}
                value={hotelName}
            />
            <label>Stars</label>
            <Select
                value = {starOptions.find(o => o.value == stars) || {}}
                options={starOptions}
                onChange={stars => onStarsChange(stars.value)}
            />
            <label>Destination country</label>
            <Select
                label="Country"
                value = {countryOptions.find(c => c.value == selectedCountry) || {}}
                options={countryOptions}
                isSearchable={true}
                onChange={country => onCountrySelect(country)}
            />
            <label>Destination city</label>
            <Select
                value = {cityOptions.find(c => c.value == selectedCity) || {}}
                options={cityOptions}
                onChange={city => onCitySelect(city)}
                isSearchable={true}
            />
            <Field name='address' label='Address' component={InputField}
                   value={hotelName}
                   onChange={e => onAddressChange(e.target.value)}
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
})(HotelEditForm)

