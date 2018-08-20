import React from 'react';
import { Field } from 'redux-form';
import Select from 'react-select';

import CheckBox from './CheckBox';
import InputField from './InputField';
import { isRequired, isNumber} from '../constants/validationRules';

const ServiceEditor = ( { services, addService, removeService, newService,
                          isShown, changeVisibility, updateCost, serviceOptions,
                          isHideEnabled, addNewService } ) => (
    services
        ? <div>
            <label>Services</label>
            <button
                onClick={changeVisibility}
                disabled={isHideEnabled}
            >
                {isShown ? 'Hide' : 'Show'}
            </button>
            {
                isShown &&
                    <div>
                        {services.map(service =>
                            <div key={service.hotelServiceId}>
                                <CheckBox
                                    defaultState={!service.isRemoved}
                                    label={service.name}
                                    id={service.hotelServiceId}
                                    addItem={() => addService(service)}
                                    removeItem={() => removeService(service.hotelServiceId)}
                                />
                                <Field
                                    onChange={(e) => updateCost(service.hotelServiceId, e.target.value)}
                                    value={service.cost}
                                    name= {`cost${service.hotelServiceId}`}
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

