import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';

import CheckBox from '../CheckBox';
import Gallery from 'react-photo-gallery';
import GalleryImage from '../../components/images/GalleryImage';

import InputField from '../InputField';
import { isRequired, isNumber } from '../../constants/validationRules';

const RoomEditForm = (props) => {
    const { roomNumber, roomId, cost, isRoomAvailable, adultsAmount,
            changeAvailability, updateCost, updateAdultsAmount,
            adultOptions, handleSubmit, sendRequest, invalid, pristine,
            submitting, updateNumber, isNumberValid, imageIds, removeImage,
            photos } = props;

    return (
        <form onSubmit={handleSubmit(sendRequest)}>
            <div key={roomId}>
                <h3>Room no. {roomNumber}</h3>
                <CheckBox
                    defaultState={isRoomAvailable}
                    label="Is currently available"
                    id={roomId}
                    addItem={() => changeAvailability()}
                />
                <Field
                    onChange={(e) => updateNumber(e.target.value)}
                    value={roomNumber}
                    name="roomNumber"
                    label="Room number:"
                    component={InputField}
                    validate={[
                        isRequired,
                        isNumber
                    ]}
                />
                <Field
                    onChange={(e) => updateCost(e.target.value)}
                    value={cost}
                    name="cost"
                    label="Cost:"
                    component={InputField}
                    validate={[
                        isRequired,
                        isNumber
                    ]}
                />
                <div className="selectField">
                    <h3>Adults amount</h3>
                    <Select
                        value={adultOptions.find(o => o.value == adultsAmount) || {}}
                        options={adultOptions}
                        onChange={adults => updateAdultsAmount(adults)}
                    />
                </div>
                <h3>Images</h3>
                {
                    (imageIds && imageIds.length)
                    ? <div className="galleryBox">
                        <Gallery
                        photos={photos}
                        direction={'column'}
                        ImageComponent={GalleryImage}
                        onClick={removeImage}
                        />
                      </div>
                    : <p className="warning">{"none uploaded"}</p>
                }
            </div>
            {!isNumberValid && <p className="warning">Room with given number already exists!</p>}
            <button type="submit"
                    className="bookBtn"
                    disabled={invalid || pristine || submitting || !isNumberValid}>
                Update info
            </button>
        </form>
    );
}

export default reduxForm({
    form: 'roomEditForm'
})(RoomEditForm)

