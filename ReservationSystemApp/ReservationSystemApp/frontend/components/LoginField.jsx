import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from './InputField';
import { isRequired, maxLength } from '../constants/validationRules';

const LoginField = (props) => {
    const { sendRequest, handleSubmit, onCancelClick, invalid, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit(sendRequest)}>
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