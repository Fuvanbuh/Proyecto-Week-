'user strict';

const handleMessage = user => {
    const messageContainer = document.querySelector('.errors-container');
    messageContainer.innerHTML = '';
    const message = document.createElement('p');

    if (user) {
        //comprobar que este el usuario si esta es truo si no pasa a else como false
        message.innerHTML = `Bienvenido ${user.champName}!`
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
    console.log(usersDB)
    //recoger los datos del los inputs de login
    const champNameInput = document.querySelector('#champName');
    const passwordInput = document.querySelector('#password');
    console.log(champNameInput)
    console.log(passwordInput)
    //comparar si coinciden los campos con la memoria
    const user = usersDB.find(user => user.champName === champNameInput.value && user.password === passwordInput.value);
    //llamar a handleMessages pasando user
    console.log(user)
    handleMessage(user)

}