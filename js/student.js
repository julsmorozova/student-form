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

    this.render = function (index) {
        var tr = document.createElement('tr');
        tr.appendChild(createTd(index + 1));
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

function editStudent (e) {
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

function fillForm (index) {
    editIndex = index;
    formElements.name.value = studentList[index].data.name;
    formElements.date.value = studentList[index].data.date;
    formElements.age.value = studentList[index].data.age;
    formElements.rate.value = studentList[index].data.rate;
    saveButton.disabled = true;
    saveChangesButton.disabled = false;
}

function renderList (list) {
    studentTbody.innerHTML = '';
    list.forEach(function (student, index) { 
        studentTbody.appendChild(student.render(index));
    });
}