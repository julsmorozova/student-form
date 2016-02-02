'use strict';

var studentList = getStudentsFromStorage();
var studentForm = document.querySelector('#student-form');
var formElements = studentForm.elements;
var studentTbody = document.querySelector('#students-tbody');
var saveChangesButton = document.querySelector('.save-changes');
var saveButton = document.querySelector('.main.save');
var sortCancelButton = document.getElementsByClassName('sort-cancel');
var editIndex = -1;
var filterForm = document.querySelector('#filter');
var filterFormElements = filterForm.elements;
var studentValidator = new FormValidator(studentForm);
//make it shorter
var nameSortAcsend = document.querySelector('.fa.fa-sort-asc.name');
var nameSortDecsend = document.querySelector('.fa.fa-sort-desc.name');
var dateSortAcsend = document.querySelector('.fa.fa-sort-asc.date');
var dateSortDecsend = document.querySelector('.fa.fa-sort-desc.date');
var ageSortAcsend = document.querySelector('.fa.fa-sort-asc.age');
var ageSortDecsend = document.querySelector('.fa.fa-sort-desc.age');
var rateSortAcsend = document.querySelector('.fa.fa-sort-asc.rate');
var rateSortDecsend = document.querySelector('.fa.fa-sort-desc.rate');


function Student (name, date, age, rate) {
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
            studentList.splice(index, 1);
            renderList(studentList);
            setStudentsToStorage(studentList);
        });
        actionTd.appendChild(removeButton);
        
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', function edit () {
            fillForm(index);
        });

        actionTd.appendChild(editButton);
        tr.appendChild(actionTd);
        return tr;
    };
}

function renderList (list) {
    studentTbody.innerHTML = '';
    list.forEach(function (student, index) { 
        studentTbody.appendChild(student.render(index));
    });
}

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
//SORTING
//make it shorter

//SORTING NAMES
function sortNamesAscend () {
    var newList = studentList.slice(0);
    newList.sort(function(student1, student2) {
        var student1Name = student1.data.name.toLowerCase();
        var student2Name = student2.data.name.toLowerCase();
        if (student1Name < student2Name) {//sort string ascending
            return -1;
        } 
        if (student1Name > student2Name) {
            return 1;
        }
        return 0;
    });
    console.log(newList);
    renderList(newList);
    sortCancelButton[0].disabled = false;
}

function sortNamesDescend () {
    var newList = studentList.slice(0);
    newList.sort(function(student1, student2) {
        var student1Name = student1.data.name.toLowerCase();
        var student2Name = student2.data.name.toLowerCase();
        if (student1Name > student2Name) {//sort string descending
            return -1;
        } 
        if (student1Name < student2Name) {
            return 1;
        }
        return 0;
    });
    console.log(newList);
    renderList(newList);
    sortCancelButton[0].disabled = false;
}

//SORTING DATES
function sortDatesAscend () {
    var newList = studentList.slice(0);
    newList.sort(function(student1, student2) {
        if (student1.data.date < student2.data.date) {//sort string ascending
            return -1;
        } 
        if (student1.data.date > student2.data.date) {
            return 1;
        }
        return 0;
    });
    console.log(newList);
    renderList(newList);
    sortCancelButton[1].disabled = false;  
} 

function sortDatesDescend () {
    var newList = studentList.slice(0);
    newList.sort(function(student1, student2) {
        if (student1.data.date > student2.data.date) {//sort string descending
            return -1;
        } 
        if (student1.data.date < student2.data.date) {
            return 1;
        }
        return 0;
    });
    console.log(newList);
    renderList(newList);
    sortCancelButton[1].disabled = false;  
} 

//SORTING AGE
function sortAgeAscend () {
    var newList = studentList.slice(0);
    newList.sort(function(student1, student2) {
        return Number(student1.data.age) - Number(student2.data.age);
    });
    console.log(newList);
    renderList(newList);
    sortCancelButton[2].disabled = false;
}

function sortAgeDescend () {
    var newList = studentList.slice(0);
    newList.sort(function(student1, student2) {
        return Number(student2.data.age) - Number(student1.data.age);
    });
    console.log(newList);
    renderList(newList);
    sortCancelButton[2].disabled = false;
}

//SORTING RATES
function sortRatesAscend () {
    var newList = studentList.slice(0);
    newList.sort(function(student1, student2) {
        return Number(student1.data.rate) - Number(student2.data.rate);
    });
    console.log(newList);
    renderList(newList);
    sortCancelButton[3].disabled = false;
}

function sortRatesDescend () {
    var newList = studentList.slice(0);
    newList.sort(function(student1, student2) {
        return Number(student2.data.rate) - Number(student1.data.rate);
    });
    console.log(newList);
    renderList(newList);
    sortCancelButton[3].disabled = false;
}

//CANCEL SORTING
function sortCancel () {
    getStudentsFromStorage();
    renderList(studentList);
    for(var i=0; i < sortCancelButton.length; i++) {
       sortCancelButton[i].disabled = true;
    }
}

//FORM VALIDATION
function FormValidator (form) {

    this.fields = [];

    this.parseRules = function () {
        for (var i = 0, ln = form.elements.length; i < ln; i++) {
            if (form.elements[i].dataset.validate) {
                var parentEl = form.elements[i].parentNode;
                var errorEl = document.createElement('div');
                errorEl.classList.add('error-text');
                parentEl.appendChild(errorEl);
                this.fields.push({
                    element: form.elements[i],
                    parentEl: parentEl,
                    errorEl: errorEl,
                    rules: eval('({' + form.elements[i].dataset.validate + '})'),
                });                    
            }
        }
    };

    this.validate = function (submit) {
        var formValid = true;
        this.fields.forEach((field) => {
            var value = field.element.value;
            if (value !== '' || submit === true) {
                var fieldValid = true;
                field.errorEl.textContent = '';
                for (var i in field.rules) {
                    var validationResult = this[i](value, field.rules[i]);
                    if (typeof(validationResult) === 'string') {
                        formValid = false;
                        fieldValid = false;
                        field.errorEl.textContent = validationResult;
                        break;
                    } 
                }
                if (fieldValid) {
                    field.parentEl.classList.remove('error');
                } else {
                    field.parentEl.classList.add('error');             
                }    
            }
        });
        return formValid;
    };

    this.notEmpty = function (value) {
        if (!value) {
            return 'Requried field.';
        }
        return true;
    };

    this.text = function (value) {
        if (!/^\D+$/.test(value)) {
            return 'Should contain only letters.';
        }
        return true;   
    };

    this.number = function (value) {
        if (!/^\d+$/.test(value)) {
            return 'Should contain only numbers.';
        }
        return true;
    };

    this.max = function (value, max) {
        if (value > max) {
            return 'Should be less than or equal to ' + max + '.';
        }
        return true;
    };

    this.min = function (value, min) {
        if (value < min) {
            return 'Should be more than or equal to ' + min + '.';
        }
        return value >= min;
    };

    this.date= function (value) {
        if (!Date.parse(value)) {
            return 'Should use yyyy-mm-dd date format.';
        }
        return true;
    };

    this.parseRules();
} 


filterForm.addEventListener('submit', function filterStudents(e) {
    e.preventDefault();
    renderList(studentList.filter(filterByUserParams));
});

var cancelFilterButton = document.querySelector('.cancel-filter');
cancelFilterButton.addEventListener('click', function cancelFilter() {
    filterForm.reset();
    renderList(studentList);
});

function addStudent () {
    var student = new Student(
        formElements.name.value,   /*можно получить данные быстрее. есть метод form-че-то там*/
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

//LOCAL STORAGE
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

nameSortAcsend.addEventListener('click', sortNamesAscend);
nameSortDecsend.addEventListener('click', sortNamesDescend);
dateSortAcsend.addEventListener('click', sortDatesAscend);
dateSortDecsend.addEventListener('click', sortDatesDescend);
ageSortAcsend.addEventListener('click', sortAgeAscend);
ageSortDecsend.addEventListener('click', sortAgeDescend);
rateSortAcsend.addEventListener('click', sortRatesAscend);
rateSortDecsend.addEventListener('click', sortRatesDescend);


for (var i=0; i < sortCancelButton.length; i++) {
    sortCancelButton[i].addEventListener('click', sortCancel);
}

renderList(studentList);
