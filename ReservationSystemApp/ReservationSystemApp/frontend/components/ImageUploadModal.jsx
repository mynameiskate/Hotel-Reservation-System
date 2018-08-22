import React from 'react';
import Modal from 'react-modal';


const ImageUploadModal = ( {isOpen, onClose, onUpload, onInputChange, isValid, files} ) => (
    <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        ariaHideApp={false}
    >
        <form
            encType='multipart/form-data'
            onSubmit={(e) => {
                e.preventDefault();
                onUpload(e.target[0].files);  //TODO: change this
            }
        }>
            <label>Pick images
                <input
                    onChange={(e) => onInputChange(e.target.files)}
                    type='file'
                    multiple
                    accept='image/*'
                />
            </label>
            {!isValid && <h3>Only image types are allowed!</h3>}
            <button disabled={!isValid} type='submit'>Upload</button>
            <button onClick={onClose}>Cancel</button>
        </form>
    </Modal>
)

export default ImageUploadModal;