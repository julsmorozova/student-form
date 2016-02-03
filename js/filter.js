function filterByUserParams (item) {
    var filterCases = ['age', 'rate', 'name', 'date'];
    return filterCases.every(function (filterCase) {
        switch (filterCase) {
            case 'age':
                if (filterFormElements.age.value && item.data.age < filterFormElements.age.value) {
                    return false;
                }
            break;
            case 'rate':
                if (filterFormElements.rate.value && item.data.rate < filterFormElements.rate.value) {
                    return false;
                }
            break;
            case 'date':
                if (filterFormElements.date.value && item.data.date !== filterFormElements.date.value) {
                    return false;
                }
            case 'name':
                if (filterFormElements.name.value && item.data.name.indexOf(filterFormElements.name.value) === -1) {
                    return false;
                }
            break;
        }
        return true;
    });
}
