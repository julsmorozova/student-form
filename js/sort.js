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


function setSortEvent (el, params) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        var newList = studentList.slice(0);
        newList = newList.sort(sortByField(newList, params.field, params.type, params.desc));
        renderList(newList);
        enableUndoSortButton(params.field);
    });
}

function enableUndoSortButton (field) {
    for (var i = 0, ln = sortCancelButton.length; i < ln; i++) {
        sortCancelButton[i].disabled = sortCancelButton[i].dataset.field !== field;
    }
}

//CANCEL SORTING
function sortCancel () {
    renderList(studentList);
    enableUndoSortButton();
}
