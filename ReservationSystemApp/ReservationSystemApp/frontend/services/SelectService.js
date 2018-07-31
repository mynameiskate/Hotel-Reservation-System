class SelectService {
    static getOptions(options, labelProperty, valueProperty = null) {
        if (!valueProperty) {
            valueProperty = labelProperty;
        }

        return (options) ?
            options.map(obj => {
                return ({
                    value: obj[valueProperty],
                    label: obj[labelProperty]
                });
            }) : [];
    }

    static getFilteredOptions(options, filterProp, filterValue, property) {
        if (!options) {
            return [];
        } else {
            let filteredList = options.filter(obj => obj[filterProp] === filterValue);
            return this.getOptions(filteredList, property);
        }
    }
}

export default SelectService;