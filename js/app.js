'use strict';

var studentValidator = new FormValidator(studentForm);
var studentList = getStudentsFromStorage();

filterForm.addEventListener('submit', function filterStudents(e) {
    e.preventDefault();
    renderList(studentList.filter(filterByUserParams));
});

cancelFilterButton.addEventListener('click', function cancelFilter() {
    filterForm.reset();
    renderList(studentList);
});

studentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (studentValidator.validate(true)) {
        addStudent();
    }
});

studentForm.addEventListener('change', function () {
    studentValidator.validate(false);
});

saveChangesButton.addEventListener('click', editStudent);

for (var i=0, ln = sortCancelButton.length; i < ln; i++) {
    sortCancelButton[i].addEventListener('click', sortCancel);
}

for (var i=0, ln = sortButtons.length; i < ln; i++) {
    var sortParams = eval('({' + sortButtons[i].dataset.sort + '})');
    setSortEvent(sortButtons[i], sortParams);
}

renderList(studentList);
