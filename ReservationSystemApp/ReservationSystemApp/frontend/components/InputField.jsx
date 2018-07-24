import React from 'react';

const InputField = ({ input, label, defaultValue, meta: { touched, error, warning } }) => (
    <div>
        <h3>{label}</h3>
        <div>
            <input {...input} placeholder={defaultValue} type='text'/>
            {touched && 
                ((error && <span>{error}</span>) || 
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

export default InputField;