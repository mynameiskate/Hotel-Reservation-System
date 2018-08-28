import React from 'react';

const ImageUploadForm = ( { onInputChange, isValid } ) => (
    <div>
        <label>Pick images
                <input
                    name="images"
                    onChange={(e) => onInputChange(e.target.files)}
                    type="file"
                    multiple
                    accept="image/*"
                />
        </label>
    { !isValid && <h3>Only image types are allowed!</h3> }
    </div>
)

export default ImageUploadForm;