import React from 'react';
import { Field } from 'redux-form';

import CheckBox from '../CheckBox';
import InputField from '../InputField';
import { isRequired, isNumber} from '../../constants/validationRules';

const ServiceEditor = ( { services, addService, removeService, isShown,
                          changeVisibility, updateCost, isHideEnabled } ) => (
    services
        ? <React.Fragment>
            <div className="btnBox">
                <h3>Services</h3>
                <button
                    className="detailsBtn"
                    type="button"
                    onClick={changeVisibility}
                    disabled={isHideEnabled}
                >
                    {isShown ? "Hide" : "Show"}
                </button>
            </div>
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
                                    label="Cost:"
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
            </React.Fragment>
        : <div>Services: none</div>
)

export default ServiceEditor;

