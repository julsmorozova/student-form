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

function setStudentsToStorage (list) {
    localStorage.setItem('studentList', JSON.stringify(list));
}
