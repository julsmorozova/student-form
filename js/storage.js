/**
 * Gets data from localStorage.
 * For each object of list from localStorage creates new instance of Student
 * and pushes the data to it.
 * @return {Object} A list of students.
 */
function getStudentsFromStorage () {
    var storedValue = localStorage.getItem('studentList');
    var list = [];
    if (storedValue) {
        JSON.parse(storedValue).forEach(function (storedStudent) {
            var student = new Student();
            student.data = storedStudent.data;
            list.push(student);
        });
    }
    return list;
}

/**
 * Pushes array data to localStorage.
 */
function setStudentsToStorage (list) {
    localStorage.setItem('studentList', JSON.stringify(list));
}
