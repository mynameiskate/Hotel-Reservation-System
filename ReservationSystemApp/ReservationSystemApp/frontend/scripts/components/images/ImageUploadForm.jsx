import React from 'react';

const ImageUploadForm = ( { onInputChange, isValid } ) => (
    <React.Fragment>
        <label
            className="fileLabel"
        >
            Pick images
            <input
                className="fileInput"
                name="images"
                onChange={(e) => onInputChange(e.target.files)}
                type="file"
                multiple
                accept="image/*"
            />
        </label>
    { !isValid && <p className="warning" >Only image types are allowed!</p> }
    </React.Fragment>
)

export default ImageUploadForm;