
const Validate = (values)=>{

    const errors ={};
    // Validate User Name
    if (!values.userName) {
        errors.userName = "User Name is required";
    }

    // Validate Email
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = "Invalid email address";
    }

    // Validate Password
    if (!values.password) {
        errors.password = "Password is required";
    } else if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/.test(values.password)) {
        errors.password = "Password must be between 8 and 20 characters long, contain at least one letter, one number, and one special character";
    }

    return errors;
}
export {Validate }