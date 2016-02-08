/**
 * Provides validation of a form.
 *
 * @constructor
 * @this {FormValidator}
 * @param {Element} form The form on page that needs to be validated.
 */
function FormValidator (form) {
    'use strict';

    /**
     * Contains form fields and validation rules
     */
    this.fields = [];

    /**
     * Checks each form element on whether it has validate attribute.
     * If yes, creates new 'div' element with class-name 'error-text'
     * inside the paragraph containing the form element.
     * Pushes the form element's data as its info and validation rules to this.fileds array.
     */
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

    /**
     * Checks each object of fields array on if the field is valid.
     * If the field is valid, checks all validation rules.
     * If validation result is not true, displays error message on page.
     * @param {Event} submit Form submitted.
     * @return {Boolean} If the form is valid.
     */
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

    /**
     * Checks if the form field is not empty.
     * @param {(Number|String)} value Form field value.
     * @return {Boolean} If the form field is not empty.
     */
    this.notEmpty = function (value) {
        if (!value) {
            return 'Requried field.';
        }
        return true;
    };

    /**
     * Checks if the form field value contains only characters.
     * @param {(Number|String)} value Form field value.
     * @return {Boolean} If the form field contains characters only.
     */
    this.text = function (value) {
        if (!/^\D+$/.test(value)) {
            return 'Should contain only letters.';
        }
        return true;
    };

    /**
     * Checks if the form field value contains only numbers.
     * @param {(Number|String)} value Form field value.
     * @return {Boolean} If the form field contains numbers only.
     */
    this.number = function (value) {
        if (!/^\d+$/.test(value)) {
            return 'Should contain only numbers.';
        }
        return true;
    };

    /**
     * Checks if the form field value doesn't exceed its maximum point.
     * @param {Number} value Form field value.
     * @return {Boolean} If the form field doesn't exceed its maximum point.
     */
    this.max = function (value, max) {
        if (value > max) {
            return 'Should be less than or equal to ' + max + '.';
        }
        return true;
    };

    /**
     * Checks if the form field value isn't less than its minimum point.
     * @param {Number} value Form field value.
     * @return {Boolean} If the form field value isn't less than its minimum point.
     */
    this.min = function (value, min) {
        if (value < min) {
            return 'Should be more than or equal to ' + min + '.';
        }
        return value >= min;
    };

    /**
     * Checks if the date format is proper.
     * @param {(Number|String)} value Form field value.
     * @return {Boolean} If the date format is proper.
     */
    this.date= function (value) {
        if (!Date.parse(value)) {
            return 'Should use yyyy-mm-dd date format.';
        }
        return true;
    };

    this.parseRules();
}
