export const validationRules = {
    isRequired,
    isNumber,
    maxValue,
    minValue,
    maxLength,
    minLength
}

const isRequired = value => value ? null : 'Field is required.';

const isNumber = value => isNaN(value) ? 'A number is required.': null;

const maxValue = max => {
    return value => value && value > max 
                    ? `Maximum value is ${max}.` 
                    : null
}

const minValue = min => {
    return value => value && value < min
                    ? `Minimum value is ${min}.` 
                    : null
}

const maxLength = max => {
    return value => value && value.length > max 
                    ? `Maximum length is ${max}.`
                    : null;

}

const minLength = min => {
    return value => value && value.length < min
                    ? `Minimum length is ${min}.`
                    : null;
}