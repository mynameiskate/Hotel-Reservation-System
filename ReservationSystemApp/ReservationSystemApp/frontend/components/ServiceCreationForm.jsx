import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import InputField from './InputField';
import { isRequired, isNumber } from '../constants/validationRules';

const ServiceCreationForm = (props) => {
    const { invalid, pristine, submitting, newService, createNewService,
            newServiceCost, addCost, chooseService, serviceOptions,
            handleSubmit, newServiceName } = props;

    return (
        <form onSubmit={handleSubmit(() => createNewService(newService, newServiceName, newServiceCost))}>
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
                label='New service cost:'
                component={InputField}
                validate={[
                    isRequired,
                    isNumber
                ]}
            />
            <button type='submit'
                    disabled={invalid || pristine || submitting || !newService }>
                Create service
            </button>
        </form>
    );
}

export default reduxForm({
    form: 'serviceCreationForm'
})(ServiceCreationForm)

