'use strict';

class Validator {
    constructor (){
        this.invalidEmailError = 'El mail no es válido';
        this.repeatEmailError = 'Este email ya esta en uso';
        this.passwordError = 'Introduce una contrasenya vàlida';
        this.repeatPassError = 'Los campos no coinciden';

        this.errors ={
            invalidEmailError:this.invalidEmailError, 
            passwordError:this.passwordError,
            repeatPassError:this.repeatPassError
        }
    }

    validateValidEmail = (email) => {
        //validar si el formato del email es correcto
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)){
            delete this.errors.invalidEmailError;//si es correcto eliminara "invalidEmailError" de this.errors
        } else{
            this.errors.invalidEmailError = this.invalidEmailError;//si no es correcto lo añadira "invalidEmailError" de this.errors
        }
        return this.errors;
        
        
        
    }

    validateUniqueEmail = (newEmail) => {
        //recoger datos del localStorage
        const userDB = JSON.parse(localStorage.getItem('users'))
        console.log(userDB)

        if(!userDB){//para ver si la memoria de mails esta vacia//comprobar que en el LocalStorage si esta el email
            delete this.errors.repeatEmailError;
            return this.errors
        }
//si esta el email añadira "invalidEmailError" de this.errors
        let mailUnique = true;
        userDB.forEach(user => {// si no esta eliminara "invalidEmailError" de this.errors
            if (user.email === newEmail){
                mailUnique = false;
            }
            
        });
        if (mailUnique){
            delete this.errors.repeatEmailError;
        }else{
            this.errors.repeatEmailError = this.repeatEmailError;
        }
        return this.errors//return de this.errors
        
        
        
        
    }

    validatePassword = (password) => {
        //comprobar si el password tiene mas de 5 caracteres
        if(password.length > 5){
            delete this.errors.passwordError;
        }else{
            this.errors.passwordError = this.passwordError;
        }
        //si tiene mas quitamos el "passwordError"
        //si no tiene añadimos el error "passwordError"
        return this.errors;
    }



validatePasswordRepeat = (password, passwordRepeat) => {
    if(password === passwordRepeat){
        delete this.errors.repeatPassError
    }else{
        this.errors.repeatPassError = this.repeatPassError;
    }
    return this.errors
    //comprobar si son iguales pasword====passwordRepeat
    //si son iguales quitaremos "repeatPassword"
    //si son diferentes añadiremos "repeatPassword"
    //return password
}

checkErrors = (isSubmitted) => {
    if(isSubmitted){
        this.errors ={
            invalidEmailError:this.invalidEmailError, 
            passwordError:this.passwordError,
            repeatPassError:this.repeatPassError
        }
    }
    return this.errors;
}

}


const validator = new Validator;