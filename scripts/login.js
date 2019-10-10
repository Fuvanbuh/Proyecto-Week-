'user strict';

const handleMessage = user => {
    const messageContainer = document.querySelector('.errors-container');
    messageContainer.innerHTML = '';
    const message = document.createElement('p');

    if (user) {
        //comprobar que este el usuario si esta es truo si no pasa a else como false
        message.innerHTML = `hola ${user.mail}`
        message.classList.add('correct-message')

    } else {
        message.innerHTML = `usuario y/o password erroneos`
    }
    messageContainer.appendChild(message)
}

const login = event => {
    event.preventDefault();
    // recoger los datos que tenemos guardados en el localStorage
    const usersDB = JSON.parse(localStorage.getItem('users'));

    //recoger los datos del los inputs de login
    const mailInput = document.querySelector('#mail');
    const passwordInput = document.querySelector('#password');
    console.log(mailInput)
    console.log(passwordInput)
    //comparar si coinciden los campos con la memoria
    const user = usersDB.find(user => user.mail === mailInput.value && user.password === passwordInput.value);
    //llamar a handleMessages pasando user
    console.log(user)
    handleMessage(user)

}