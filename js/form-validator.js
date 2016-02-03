function FormValidator (form) {
    'use strict';
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
                    rules: eval('({' + form.elements[i].dataset.validate + '})')
                });
            }
        }
    };

    this.validate = function (submit) {
        var formValid = true;
        var my = this;
        this.fields.forEach(function (field) {
            var value = field.element.value;
            if (value !== '' || submit === true) {
                var fieldValid = true;
                field.errorEl.textContent = '';
                for (var i in field.rules) {
                    var validationResult = my[i](value, field.rules[i]);
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
