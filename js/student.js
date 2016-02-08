/**
 * Creates an instance of Student.
 *
 * @constructor
 * @this {Student}
 * @param {String} name New student's name.
 * @param {String} date New student's date.
 * @param {Number} age New student's age.
 * @param {Number} rate New student's rate.
 */
function Student (name, date, age, rate) {
    var my = this;

    this.data = {
        name: name,
        date: date,
        age: age,
        rate: rate
    };

    function createTd (text) {
        var td = document.createElement('td');
        td.textContent = text;
        return td;
    }

    /**
     * Creates a row with cells inside 'students-table',
     * fills them with corresponding data for each object of studentList,
     * adds Edit and Delete buttons
     * @this {Student}
     * @return {Element} New table row.
     */
    this.render = function () {
        var tr = document.createElement('tr');
        tr.appendChild(createTd(studentList.indexOf(my) + 1));
        for (var key in this.data) {
            tr.appendChild(createTd(this.data[key]));
        }
        var actionTd = createTd();
        var removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.addEventListener('click', function remove () {
            studentList.splice(studentList.indexOf(my), 1);
            renderList(studentList);
            setStudentsToStorage(studentList);
        });
        actionTd.appendChild(removeButton);

        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function edit () {
            fillForm(studentList.indexOf(my));
        });

        actionTd.appendChild(editButton);
        tr.appendChild(actionTd);
        return tr;
    };
}
/**
 * Adds a new student to studentList, renders list, adds student to localStorage
 */
function addStudent () {
    var student = new Student(
        formElements.name.value,
        formElements.date.value,
        formElements.age.value,
        formElements.rate.value
        );
    studentList.push(student);
    renderList(studentList);
    studentForm.reset();
    setStudentsToStorage(studentList);
}

/**
 * Checks if the form was refilled (if fillform() was invoked).
 * Reassigns the object's properties in the array with the new values from the form.
 * Updates the table.
 * Clears the form on a page.
 * Updates data at local storage.
 * Reassigns editIndex variable value back to initial value (-1).
 */
function editStudent () {
    if (editIndex !== -1) {
        studentList[editIndex].data.name = formElements.name.value;
        studentList[editIndex].data.date = formElements.date.value;
        studentList[editIndex].data.age = formElements.age.value;
        studentList[editIndex].data.rate = formElements.rate.value;
        renderList(studentList);
        studentForm.reset();
        setStudentsToStorage(studentList);
        editIndex = -1;
    }
    saveButton.disabled = false;
    saveChangesButton.disabled = true;
}

/**
 * Gets student's data from studentList and puts them back to the form for editing.
 * Reassigns editIndex global variable to the value of object's index in the array.
 * Disables saveButton, enables saveChangesButton.
 * @param {Number} index Index in studentList array.
 */
function fillForm (index) {
    editIndex = index;
    formElements.name.value = studentList[index].data.name;
    formElements.date.value = studentList[index].data.date;
    formElements.age.value = studentList[index].data.age;
    formElements.rate.value = studentList[index].data.rate;
    saveButton.disabled = true;
    saveChangesButton.disabled = false;
}

/**
 * Clears studentTbody innerHTML.
 * Invokes Student class' render method for each object of the array.
 * @param {Student[]} list
 */
function renderList (list) {
    studentTbody.innerHTML = '';
    list.forEach(function (student, index) {
        studentTbody.appendChild(student.render(index));
    });
}
