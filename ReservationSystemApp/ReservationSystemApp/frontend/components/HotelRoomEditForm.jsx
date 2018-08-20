import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import CheckBox from './CheckBox';
import InputField from './InputField';
import { isRequired, isNumber } from '../constants/validationRules';

const RoomEditForm = (props) => {
    const { roomNumber, roomId, cost, isAvailable, adultsAmount,
            changeAvailability, updateCost, updateAdultsAmount,
            adultOptions } = props;

    return (
        <form onSubmit={handleSubmit(sendRequest)}>
            <div key={roomId}>
                <h3>Room no. {roomNumber}</h3>
                <CheckBox
                    defaultState={!isAvailable}
                    label='Is currently available'
                    id={roomId}
                    addItem={() => changeAvailability(roomId)}
                />
                <Field
                    onChange={(e) => updateCost(roomId, e.target.value)}
                    value={cost}
                    name= {`cost${roomId}`}
                    label='Cost:'
                    component={InputField}
                    validate={[
                        isRequired,
                        isNumber
                    ]}
                />
                <Select
                    value={adultOptions.find(o => o.value == adultsAmount) || {}}
                    options={adultOptions}
                    onChange={adults => updateAdultsAmount(adults)}
                />
            </div>
            <button type='submit'
                    disabled={invalid || pristine || submitting}>
                Submit
            </button>
            <button type='button' onClick={onCancelClick}>Cancel</button>
        </form>
    );
}

export default reduxForm({
    form: 'roomEditForm'
})(RoomEditForm)

