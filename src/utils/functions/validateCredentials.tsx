import Constants from "../Constants/Constants";

export const validateCredentials = (values: { email: string, password: string }) => {
    const errors: { email?: string, password?: string } = {}

    if (!values.email) {
        errors.email = 'Email is required';
    } else if (!Constants.emailRegex.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    } else if (!Constants.passwordRegex.test(values.password)) {
        errors.password = 'Password must be at least 8 characters long';
    }

    return errors;
}