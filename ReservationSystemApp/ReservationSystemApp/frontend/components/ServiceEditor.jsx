import React from 'react';
import { Field } from 'redux-form';

import CheckBox from './CheckBox';
import InputField from './InputField';
import { isRequired, isNumber} from '../constants/validationRules';

const ServiceEditor = ( { services, addService, removeService, isShown,
                          changeVisibility, updateCost, isHideEnabled } ) => (
    services
        ? <div>
            <label>Services</label>
            <button
                type='button'
                onClick={changeVisibility}
                disabled={isHideEnabled}
            >
                {isShown ? 'Hide' : 'Show'}
            </button>
            {
                isShown &&
                    <div>
                        {services.map(service =>
                            <div key={service.serviceId}>
                                <CheckBox
                                    defaultState={!service.isRemoved}
                                    label={service.name}
                                    id={service.serviceId}
                                    addItem={() => addService(service)}
                                    removeItem={() => removeService(service.serviceId)}
                                />
                                <Field
                                    onChange={(e) => updateCost(service.serviceId, e.target.value)}
                                    value={service.cost}
                                    name= {`cost${service.serviceId}`}
                                    label='Cost:'
                                    component={InputField}
                                    validate={[
                                        isRequired,
                                        isNumber
                                    ]}
                                />
                            </div>
                        )}
                    </div>
                }
            </div>
        : <div>Services: none</div>
)

export default ServiceEditor;

