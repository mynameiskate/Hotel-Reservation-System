import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import CheckBox from './CheckBox';
import InputField from './InputField';
import { isRequired, isNumber } from '../constants/validationRules';

const RoomEditForm = (props) => {
    const { roomNumber, roomId, cost, isRoomAvailable, adultsAmount,
            changeAvailability, updateCost, updateAdultsAmount,
            adultOptions, handleSubmit, sendRequest, invalid, pristine,
            submitting, updateNumber, isNumberValid } = props;

    return (
        <form onSubmit={handleSubmit(sendRequest)}>
            <div key={roomId}>
                <h3>Room no. {roomNumber}</h3>
                <CheckBox
                    defaultState={isRoomAvailable}
                    label='Is currently available'
                    id={roomId}
                    addItem={() => changeAvailability()}
                />
                <Field
                    onChange={(e) => updateNumber(e.target.value)}
                    value={roomNumber}
                    name= 'roomNumber'
                    label='Room number:'
                    component={InputField}
                    validate={[
                        isRequired,
                        isNumber
                    ]}
                />
                <Field
                    onChange={(e) => updateCost(e.target.value)}
                    value={cost}
                    name= 'cost'
                    label='Cost:'
                    component={InputField}
                    validate={[
                        isRequired,
                        isNumber
                    ]}
                />
                <label>Adults amount</label>
                <Select
                    value={adultOptions.find(o => o.value == adultsAmount) || {}}
                    options={adultOptions}
                    onChange={adults => updateAdultsAmount(adults)}
                />
            </div>
            {!isNumberValid && <h3>Room with given number already exists!</h3>}
            <button type='submit'
                    disabled={invalid || pristine || submitting || !isNumberValid}>
                Submit
            </button>
        </form>
    );
}

export default reduxForm({
    form: 'roomEditForm'
})(RoomEditForm)

