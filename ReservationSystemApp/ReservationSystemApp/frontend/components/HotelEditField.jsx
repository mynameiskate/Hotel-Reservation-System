import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import { isRequired, maxLength, minLength, isNumber, maxValue } from '../constants/validationRules.js';

const HotelEditField = (props) => {
    const { hotel, handleSubmit, sendRequest, onCancelClick, invalid, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit(sendRequest)}>
            <Field name='name' label='Name' component={InputField}
                validate={[isRequired, maxLength(20)]} defaultValue={hotel.name}
            />
            <Field name='stars' label='Stars' component={InputField}
                validate={[isNumber, maxValue(5)]} defaultValue={hotel.stars}
            />
            <Field name='city' label='City' component={InputField}
                   defaultValue={hotel.location ? hotel.location.city :''}
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

