import React from 'react';

import { reduxForm, Field } from 'redux-form';

import { isRequired, maxLength, minLength, isNumber, maxValue } from './validationRules.js';

const inputField = ({ input, label, defaultValue, meta: { touched, error, warning } }) => (
    <div>
        <h3>{label}</h3>
        <div>
            <input {...input} placeholder={defaultValue} type='text'/>
            {touched && 
                ((error && <span>{error}</span>) || 
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const HotelEditField = (props) => {
    const { hotel, handleSubmit, sendRequest, onCancelClick, invalid, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit(sendRequest)}>           
            <Field name='name' label='Name' component={inputField} 
                validate={[isRequired, maxLength(20)]} defaultValue={hotel.name}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            />        
            <Field name='stars' label='Stars' component={inputField} 
                validate={[isNumber, maxValue(5)]} defaultValue={hotel.stars}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
            />      
            <Field name='city' label='City' component={inputField} 
                   defaultValue={hotel.location ? hotel.location.city :''}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            />    
            <Field name='address' label='Address' component={inputField} 
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

