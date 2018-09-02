import React from 'react';
import { reduxForm, Field } from 'redux-form';
import InputField from '../InputField';
import { isRequired, maxLength, minLength, isEmail } from '../../constants/validationRules';

const SignUpField = (props) => {
    const { sendRequest, handleSubmit, onCancelClick, invalid, pristine, submitting } = props;
    return (
        <form onSubmit={handleSubmit(sendRequest)} className="signUpForm">
            <Field
                name="email"
                label="Email"
                component={InputField}
                validate={[isRequired, maxLength(320), isEmail]}
            />
            <Field
                name="shortName"
                label="Login"
                component={InputField}
                validate={[maxLength(20)]}
            />
            <Field
                name="fullName"
                label="Full name"
                component={InputField}
                validate={[isRequired, maxLength(100)]}
            />
            <Field
                name="password"
                label="Password"
                component={InputField}
                validate={[isRequired, maxLength(20), minLength(4)]}
                type="password"
            />
            <Field
                name="confirmPassword"
                label="Confirm password"
                component={InputField}
                type="password" validate={[isRequired, maxLength(20), minLength(4)]}
            />
            <div className="btnBlock">
                <button type="submit"
                        disabled={invalid || pristine || submitting} className="detailsBtn notActive">
                    Submit
                </button>
                <button type="button" onClick={onCancelClick} className="detailsBtn detailsBtnNotActive">Cancel</button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'SignUpForm'
})(SignUpField)