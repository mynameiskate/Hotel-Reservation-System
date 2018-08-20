import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import InputField from './InputField';
import { isRequired, isNumber } from '../constants/validationRules';

const ServiceCreationForm = (props) => {
    const { invalid, pristine, submitting, newService, createNewService,
            newServiceCost, addCost, chooseService, serviceOptions,
            handleSubmit } = props;

    return (
        <form onSubmit={handleSubmit(() => createNewService(newService, newServiceCost))}>
            <label>Add new service</label>
            <Select
                value = {serviceOptions.find(s => s.value == newService) || {}}
                options={serviceOptions}
                onChange={service => chooseService(service.value)}
                isSearchable={true}
            />
           <Field
                onChange={(e) => addCost(e.target.value)}
                value={newServiceCost}
                name= {'cost'}
                label='Cost:'
                component={InputField}
                validate={[
                    isRequired,
                    isNumber
                ]}
            />
            <button type='submit'
                    disabled={invalid || pristine || submitting}>
                Create service
            </button>
        </form>
    );
}

export default reduxForm({
    form: 'serviceCreationForm'
})(ServiceCreationForm)
