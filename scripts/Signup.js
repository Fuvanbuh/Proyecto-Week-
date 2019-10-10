'use strict'

class Signup {
    constructor() {
        this.nameInput = document.querySelector('#name');
        this.champNameInput = document.querySelector('#champName');
        this.mailInput = document.querySelector('#mail');
        this.passwordInput = document.querySelector('#password');
        this.repeatPasswordInput = document.querySelector('#repeat-password');
        this.errorsWrapper = document.querySelector('.errors-container');
        this.botonInput = document.querySelector('#boton');

    }

    saveData = (event) => {
        event.preventDefault()
        //recoger valores d elos inputs 
        const name = this.nameInput.value;
        const champName = this.champNameInput.value;
        const mail = this.mailInput.value;
        const password = this.passwordInput.value;
        console.log(name, champName, mail, password)
        //crear una instancia de User
        const newUser = new User(name, champName, mail, password)
        //console.log(newUser)
        //almacenar datos en local storage
        let usersDB = JSON.parse(localStorage.getItem('users'));//recogemos del local storage

        if (usersDB) {//miro si hay usuarios registrados
            usersDB.push(newUser);//añado a la lista
            localStorage.setItem('users', JSON.stringify(usersDB));
        } else {
            usersDB = [newUser];//asigno un array con mi usuario
        }
        localStorage.setItem('users', JSON.stringify(usersDB))//envio a localstorage mi base de datos

        //vaciar el formulario
        this.nameInput.value = '';
        this.champNameInput.value = '';
        this.mailInput.value = '';
        this.passwordInput.value = '';
        this.repeatPasswordInput.value = '';


        validator.checkErrors(true);




    }

    handleInputsValues = () => {
        //comprobar los inputs y validarlos
        this.mailInput.addEventListener('input', event => {
            const errors = validator.validateValidEmail(event.target.value)
            if (!('invalidEmailError' in errors)) {
                validator.validateUniqueEmail(event.target.value)
            }
            this.handleErrorMissatge()
            this.handleIsValid();

        })
        this.passwordInput.addEventListener('input', event => {
            validator.validatePassword(event.target.value)
            validator.validatePasswordRepeat(event.target.value, this.repeatPasswordInput.value)
            this.handleErrorMissatge()
            this.handleIsValid()
        })
        this.repeatPasswordInput.addEventListener('input', event => {
            const errors = validator.validatePasswordRepeat(this.passwordInput.value, event.target.value)
            this.handleErrorMissatge()
            this.handleIsValid()
        })

    }

    handleErrorMissatge = () => {
        this.errorsWrapper.innerHTML = ' ';
        //mostrar los mensajes de los errores en HTML si los hay
        const errors = validator.checkErrors()
        for (const prop in errors) {
            const error = document.createElement('p');
            error.innerHTML = errors[prop];
            this.errorsWrapper.appendChild(error);

        }


    }

    handleIsValid = () => {
        //activar o desactivar boton del form en funcion de si hay o no errores
        const errors = validator.checkErrors();
        if (Object.keys(errors).length === 0) {
            this.botonInput.removeAttribute('disabled');
        } else {
            this.botonInput.setAttribute('disabled', ' ')

        }

    }
}


const signup = new Signup();
window.addEventListener('load', signup.handleInputsValues);