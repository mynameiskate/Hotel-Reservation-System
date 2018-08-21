export const isRequired = value => value ? null : 'Field is required.';

export const isNumber = value => isNaN(value) ? 'A number is required.' : null;

export const maxValue = (max) => {
    return value => value && value > max ?
        `Maximum value is ${max}.` :
        null;
}

export const minValue = min => {
    return value => value && value < min ?
        `Minimum value is ${min}.` :
        null
}

export const maxLength = max => {
    return value => value && value.length > max ?
        `Maximum length is ${max}.` :
        null;
}

export const minLength = min => {
    return value => value && value.length < min ?
        `Minimum length is ${min}.` :
        null;
}

export const isFullName = () => {
    const regexp = new RegExp('^[a-z]([-\']?[a-z]+)*( [a-z]([-\']?[a-z]+)*)+$');
    return name => regexp.test(name) ? null : 'Are you sure this is your name?';
}