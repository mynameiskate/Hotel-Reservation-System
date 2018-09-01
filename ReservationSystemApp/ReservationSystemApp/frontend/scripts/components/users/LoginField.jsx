import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from '../InputField';
import { isRequired, maxLength, isEmail } from '../../constants/validationRules';

const LoginField = (props) => {
    const { sendRequest, handleSubmit, onCancelClick, invalid, pristine, submitting } = props;
    return (
        <form className="signUpForm" onSubmit={handleSubmit(sendRequest)}>
            <Field
                name="email"
                label="Email"
                component={InputField}
                validate={[isRequired, maxLength(20), isEmail]}
            />
            <Field
                name="password"
                label="Password"
                component={InputField}
                validate={[isRequired, maxLength(20)]}
                type="password"
            />
            <div className="btnBlock">
            <button
                className="detailsBtn"
                type="submit"
                    disabled={invalid || pristine || submitting}>
                Submit
            </button>
            <button
                type="button"
                className="detailsBtn"
                onClick={onCancelClick}
            >
                Cancel
            </button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'LoginForm'
})(LoginField)