import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField.jsx';
import { isRequired, maxLength, minLength, isNumber, maxValue } from './validationRules.js';

const LoginField = (props) => {
    const { sendRequest, onCancelClick, invalid, pristine, submitting } = props;
    return (
        <form onSubmit={sendRequest}>           
            <Field name='email' label='Email' component={InputField} 
                validate={[isRequired, maxLength(20)]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            />        
            <Field name='password' label='Password' component={InputField} 
                validate={[isRequired, maxLength(20)]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
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
    form: 'LoginForm'
})(LoginField)