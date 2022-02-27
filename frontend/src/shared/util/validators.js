// Validator Types:
const TYPE_REQUIRE = 'REQUIRE';
const TYPE_MINLENGTH = 'MINLENGTH';
const TYPE_MAXLENGTH = 'MAXLENGTH';
const TYPE_MIN = 'MIN';
const TYPE_MAX = 'MAX';
const TYPE_EMAIL = 'EMAIL';
const TYPE_FILE = 'FILE';

export const REQUIRE = () => ({ type: TYPE_REQUIRE });
export const FILE = () => ({ type: TYPE_FILE });
export const MINLENGTH = val => ({
    type: TYPE_MINLENGTH,
    val: val,
});
export const MAXLENGTH = val => ({
    type: TYPE_MAXLENGTH,
    val: val,
});
export const MIN = val => ({ type: TYPE_MIN, val: val });
export const MAX = val => ({ type: TYPE_MAX, val: val });
export const EMAIL = () => ({ type: TYPE_EMAIL });

export const validate = (value, validators) => {
    let isValid = true;
    for (const validator of validators) {
        if (validator.type === TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === TYPE_MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val;
        }
        if (validator.type === TYPE_MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val;
        }
        if (validator.type === TYPE_MIN) {
            isValid = isValid && +value >= validator.val;
        }
        if (validator.type === TYPE_MAX) {
            isValid = isValid && +value <= validator.val;
        }
        if (validator.type === TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    }
    return isValid;
};
