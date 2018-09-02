import React from 'react';
import { reduxForm, Field } from 'redux-form';
import Select from 'react-select';
import Gallery from 'react-photo-gallery';
import GalleryImage from '../../components/images/GalleryImage';

import InputField from '../InputField';
import ServiceEditor from './ServiceEditor';
import { isRequired, maxLength } from '../../constants/validationRules';

const HotelEditForm = (props) => {
    const { handleSubmit, sendRequest, onCancelClick, hotelName,
        onCitySelect, onCountrySelect, stars, selectedCity, selectedCountry,
        onNameChange, onAddressChange, onStarsChange, services, addService,
        removeService, isServiceEditorShown, changeVisibility, updateCost,
        invalid, pristine, submitting, starOptions, cityOptions, countryOptions,
        imageIds, removeImage, photos } = props;

    return (
        <form className="formFields" onSubmit={handleSubmit(sendRequest)}>
            <Field
                name="name"
                label="Name"
                component={InputField}
                validate={[isRequired, maxLength(100)]}
                onChange={e => onNameChange(e.target.value)}
                value={hotelName}
            />
            <h3>Stars</h3>
            <Select
                value = {starOptions.find(o => o.value == stars) || {}}
                options={starOptions}
                onChange={stars => onStarsChange(stars.value)}
            />
            <h3>Destination country</h3>
            <Select
                label="Country"
                value = {countryOptions.find(c => c.value == selectedCountry) || {}}
                options={countryOptions}
                isSearchable={true}
                onChange={country => onCountrySelect(country)}
            />
            <h3>Destination city</h3>
            <Select
                value = {cityOptions.find(c => c.value == selectedCity) || {}}
                options={cityOptions}
                onChange={city => onCitySelect(city)}
                isSearchable={true}
            />
            <Field
                name="address"
                label="Address"
                component={InputField}
                value={hotelName}
                onChange={e => onAddressChange(e.target.value)}
            />
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
            { services &&
                <ServiceEditor
                    isHideEnabled={(invalid || pristine || submitting) && isServiceEditorShown}
                    isShown={isServiceEditorShown}
                    services={services}
                    changeVisibility={changeVisibility}
                    addService={addService}
                    removeService={removeService}
                    updateCost={updateCost}
                />
            }
            <div className="btnBox">
                <button
                    className="bookBtn"
                    type="submit"
                    disabled={invalid || pristine || submitting}>
                    Update info
                </button>
                <button
                    className="bookBtn"
                    type="button"
                    onClick={onCancelClick}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default reduxForm({
    form: 'hotelEditForm'
})(HotelEditForm)

