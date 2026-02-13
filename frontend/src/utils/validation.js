export const validateNoInternalSpaces = (value) => !/\s/.test(value);

export const validatePassword = (password) => {
    const minLength = 6;
    const maxLength = 15;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const noSpaces = validateNoInternalSpaces(password);

    return (
        password.length >= minLength &&
        password.length <= maxLength &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar &&
        noSpaces
    );
};

export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && validateNoInternalSpaces(email);
};

export const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone) && validateNoInternalSpaces(phone);
};

export const validateDocUsuario = (doc) => {
    return doc.length > 0 && doc.length <= 20 && validateNoInternalSpaces(doc);
};
