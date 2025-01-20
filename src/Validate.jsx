


const ValidatePassword = (password)=>{
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordPattern.test(password);
}

const validateEmail = (email)=>{
    const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

    

export {ValidatePassword,validateEmail }