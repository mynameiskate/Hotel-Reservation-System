import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import InputField from './InputField';
import SelectService from '../services/SelectService';

const HotelFilter = (props) => {
    const { locations, selectedCity, selectedCountry,
            onCountrySelect, onCitySelect, onNameChange } = props;

    const countryOptions = SelectService.getOptions(locations, 'country', 'countryId');
    const cityOptions = SelectService.getFilteredOptions(locations, 'countryId', selectedCountry, 'city', 'cityId');

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
        </div>
    );
}

export default reduxForm({
    form: 'searchFilterForm'
})(HotelFilter)
