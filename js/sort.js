/**
 * Sorts list by chosen field depending on value type and sort direction.
 * @param {Students[]} list
 * @param {String} field field to be sorted
 * @param {String} type field value type
 * @param {Boolean} desc sort direction
 * @return {Function} Returns result of sorting.
 */
function sortByField (list, field, type, desc) {
    return function (a, b) {
        var result = 0;
        var a = a.data[field];
        var b = b.data[field];

        if (type === 'string') {
            a = a.toLowerCase();
            b = b.toLowerCase();
        } else if (type === 'number') {
            a = Number(a);
            b = Number(b);
        }

        if (a < b) {
            result = -1;
        } else if (a > b) {
            result = 1;
        }
        if (desc) {
            result = result * -1;
        }
        return result;
    };
}

/**
 * Sets sorting event to button
 * Invokes undoSortButton function
 * @param {Element} el One of the sortButtons
 * @param {Object} params Sort criteria
 */
function setSortEvent (el, params) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        var newList = studentList.slice(0);
        newList = newList.sort(sortByField(newList, params.field, params.type, params.desc));
        renderList(newList);
        enableUndoSortButton(params.field);
    });
}

/**
 * Enables undoSortButton
 * @param {Array} list of objects (newList - copy of studentList)
 */
function enableUndoSortButton (field) {
    for (var i = 0, ln = sortCancelButton.length; i < ln; i++) {
        sortCancelButton[i].disabled = sortCancelButton[i].dataset.field !== field;
    }
}

/**
 * Cancels sorting
 */
function sortCancel () {
    renderList(studentList);
    enableUndoSortButton();
}
