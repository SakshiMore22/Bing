export const checkValidation=(email,password,name='dummy')=>{

    const isNameValid= /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isNameValid) return "User name invalid"
    if(!isEmailValid) return "Email ID invalid";
    if(!isPasswordValid) return "Password invalid";
    return null;
    


}