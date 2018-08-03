class SelectService {
    static getEmptyOption() {
        return [{
            value: '',
            label: ''
        }];
    }

    static getOptions(options, labelProperty, valueProperty = null) {
        if (!valueProperty) {
            valueProperty = labelProperty;
        }

        let selectEntries = this.getEmptyOption();

        if (options) {
            options.forEach(obj => selectEntries.push({
                value: obj[valueProperty],
                label: obj[labelProperty]
            }));
        }

        return selectEntries;
    }

    static getFilteredOptions(options, filterProp, filterValue, labelProp, labelValue) {
        if (!options) {
            return [];
        } else {
            let filteredList = options.filter(obj => obj[filterProp] === filterValue);
            return this.getOptions(filteredList, labelProp, labelValue);
        }
    }
}

export default SelectService;