import React from 'react';
import Modal from 'react-modal';


const ImageUploadForm = ( { onUpload, filesSelected, onInputChange, isValid } ) => (

    <form
        onSubmit={(e) => {
            e.preventDefault();
            onUpload(e.target[0].files);  //TODO: change this
        }}
    >
        <label>Pick images
            <input
                name='images'
                onChange={(e) => onInputChange(e.target.files)}
                type='file'
                multiple
                accept='image/*'
            />
        </label>
        {!isValid && <h3>Only image types are allowed!</h3>}
        <button
            disabled={!(isValid && filesSelected)}
            type='submit'
        >
            Upload
        </button>
    </form>
)

export default ImageUploadForm;