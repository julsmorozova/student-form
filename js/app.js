'use strict';

// var studentList = [];
// var studentForm = document.querySelector('#student-form');
// var formElements = studentForm.elements;
// var studentTbody = document.querySelector('#students-tbody');
// var saveChangesButton = document.querySelector('.save-changes');
// var saveButton = document.querySelector('.main.save');
// var sortCancelButton = document.getElementsByClassName('sort-cancel');
// var editIndex = -1;
// var filterForm = document.querySelector('#filter');
// var filterFormElements = filterForm.elements;
// var sortButtons = document.querySelectorAll('[data-sort]');
// var cancelFilterButton = document.querySelector('.cancel-filter');


// function Student (name, date, age, rate) {
//     var my = this;

//     this.data = {
//         name: name,
//         date: date,
//         age: age,
//         rate: rate
//     };

//     function createTd (text) {
//         var td = document.createElement('td');
//         td.textContent = text;
//         return td;
//     }

//     this.render = function (index) {
//         var tr = document.createElement('tr');
//         tr.appendChild(createTd(index + 1));
//         for (var key in this.data) {
//             tr.appendChild(createTd(this.data[key]));
//         }
//         var actionTd = createTd();
//         var removeButton = document.createElement('button');
//         removeButton.textContent = 'Delete';
//         removeButton.addEventListener('click', function remove () {
//             studentList.splice(studentList.indexOf(my), 1);
//             renderList(studentList);
//             setStudentsToStorage(studentList);
//         });
//         actionTd.appendChild(removeButton);
        
//         var editButton = document.createElement('button');
//         editButton.textContent = 'Edit';
//         editButton.addEventListener('click', function edit () {
//             fillForm(studentList.indexOf(my));
//         });

//         actionTd.appendChild(editButton);
//         tr.appendChild(actionTd);
//         return tr;
//     };
// }

// function renderList (list) {
//     studentTbody.innerHTML = '';
//     list.forEach(function (student, index) { 
//         studentTbody.appendChild(student.render(index));
//     });
// }

// function filterByUserParams (item) {
//     var filterCases = ['age', 'rate', 'name', 'date'];
//     return filterCases.every(function (filterCase) {
//         switch (filterCase) {
//             case 'age':
//                 if (filterFormElements.age.value && item.data.age < filterFormElements.age.value) {
//                     return false;
//                 }
//             break;
//             case 'rate':
//                 if (filterFormElements.rate.value && item.data.rate < filterFormElements.rate.value) {
//                     return false;
//                 }
//             break;
//             case 'date':
//                 if (filterFormElements.date.value && item.data.date !== filterFormElements.date.value) {
//                     return false;
//                 }
//             case 'name':
//                 if (filterFormElements.name.value && item.data.name.indexOf(filterFormElements.name.value) === -1) {
//                     return false;
//                 }
//             break;
//         }
//         return true;
//     });
// }

// function sortByField (list, field, type, desc) {
//     console.log(field, type, desc);
//     return function (a, b) {
//         var result = 0;
//         var a = a.data[field];
//         var b = b.data[field];

//         if (type === 'string') {
//             a = a.toLowerCase();
//             b = b.toLowerCase();
//         } else if (type === 'number') {
//             a = Number(a);
//             b = Number(b);
//         }

//         if (a < b) {
//             result = -1;
//         } else if (a > b) {
//             result = 1;
//         }
//         if (desc) {
//             result = result * -1;
//         }
//         return result;
//     };
// }


// function setSortEvent (el, params) {
//     el.addEventListener('click', function (e) {
//         e.preventDefault();
//         var newList = studentList.slice(0);  
//         newList = newList.sort(sortByField(newList, params.field, params.type, params.desc));  
//         renderList(newList);
//         enableUndoSortButton(params.field);
//     });
// } 

// function enableUndoSortButton (field) {
//     for (var i = 0, ln = sortCancelButton.length; i < ln; i++) {
//         sortCancelButton[i].disabled = sortCancelButton[i].dataset.field !== field;
//     } 
// }

// //CANCEL SORTING
// function sortCancel () {
//     renderList(studentList);
//     enableUndoSortButton();
// }

//FORM VALIDATION
// function FormValidator (form) {

//     this.fields = [];

//     this.parseRules = function () {
//         for (var i = 0, ln = form.elements.length; i < ln; i++) {
//             if (form.elements[i].dataset.validate) {
//                 var parentEl = form.elements[i].parentNode;
//                 var errorEl = document.createElement('div');
//                 errorEl.classList.add('error-text');
//                 parentEl.appendChild(errorEl);
//                 this.fields.push({
//                     element: form.elements[i],
//                     parentEl: parentEl,
//                     errorEl: errorEl,
//                     rules: eval('({' + form.elements[i].dataset.validate + '})'),
//                 });                    
//             }
//         }
//     };

//     this.validate = function (submit) {
//         var formValid = true;
//         this.fields.forEach((field) => {
//             var value = field.element.value;
//             if (value !== '' || submit === true) {
//                 var fieldValid = true;
//                 field.errorEl.textContent = '';
//                 for (var i in field.rules) {
//                     var validationResult = this[i](value, field.rules[i]);
//                     if (typeof(validationResult) === 'string') {
//                         formValid = false;
//                         fieldValid = false;
//                         field.errorEl.textContent = validationResult;
//                         break;
//                     } 
//                 }
//                 if (fieldValid) {
//                     field.parentEl.classList.remove('error');
//                 } else {
//                     field.parentEl.classList.add('error');             
//                 }    
//             }
//         });
//         return formValid;
//     };

//     this.notEmpty = function (value) {
//         if (!value) {
//             return 'Requried field.';
//         }
//         return true;
//     };

//     this.text = function (value) {
//         if (!/^\D+$/.test(value)) {
//             return 'Should contain only letters.';
//         }
//         return true;   
//     };

//     this.number = function (value) {
//         if (!/^\d+$/.test(value)) {
//             return 'Should contain only numbers.';
//         }
//         return true;
//     };

//     this.max = function (value, max) {
//         if (value > max) {
//             return 'Should be less than or equal to ' + max + '.';
//         }
//         return true;
//     };

//     this.min = function (value, min) {
//         if (value < min) {
//             return 'Should be more than or equal to ' + min + '.';
//         }
//         return value >= min;
//     };

//     this.date= function (value) {
//         if (!Date.parse(value)) {
//             return 'Should use yyyy-mm-dd date format.';
//         }
//         return true;
//     };

//     this.parseRules();
// } 


// function addStudent () {
//     var student = new Student(
//         formElements.name.value,  
//         formElements.date.value,
//         formElements.age.value,
//         formElements.rate.value
//         );
//     studentList.push(student);
//     renderList(studentList);
//     studentForm.reset();
//     setStudentsToStorage(studentList);
// }

// function editStudent (e) {
//     if (editIndex !== -1) {
//         studentList[editIndex].data.name = formElements.name.value;
//         studentList[editIndex].data.date = formElements.date.value;
//         studentList[editIndex].data.age = formElements.age.value;
//         studentList[editIndex].data.rate = formElements.rate.value;
//         renderList(studentList);
//         studentForm.reset();
//         setStudentsToStorage(studentList);
//         editIndex = -1;
//     }
//     saveButton.disabled = false;
//     saveChangesButton.disabled = true;
// }

// function fillForm (index) {
//     editIndex = index;
//     formElements.name.value = studentList[index].data.name;
//     formElements.date.value = studentList[index].data.date;
//     formElements.age.value = studentList[index].data.age;
//     formElements.rate.value = studentList[index].data.rate;
//     saveButton.disabled = true;
//     saveChangesButton.disabled = false;
// }

//LOCAL STORAGE
// function getStudentsFromStorage () {
//     var storedValue = localStorage.getItem('studentList');
//     var list = [];
//     if (storedValue) {
//         JSON.parse(storedValue).forEach(function (storedStudent) {
//             var student = new Student();
//             student.data = storedStudent.data;
//             list.push(student);
//         });
//     }
//     return list;
// }

// function setStudentsToStorage (list) {
//     localStorage.setItem('studentList', JSON.stringify(list));
// }

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
