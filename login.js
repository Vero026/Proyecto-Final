document.addEventListener('DOMContentLoaded', function() { //espera a que el DOM esté completamente cargado    
    const form = document.getElementById('login'); //aelecciona el formulario de login
    
    form.addEventListener('submit', function(event) { //agrega un evento al formulario
        event.preventDefault(); //para prevenir que el formulario se envíe antes de validarlo
        const username = document.getElementById('username').value.trim(); //obtiene el valor del campo de usuario
        const password = document.getElementById('password').value.trim(); //obtiene el valor del campo de contraseña

        if (username === '' || password === '') { //si el usuario o la contraseña están vacios
            alert('Por favor, complete todos los campos.'); //muestra un mensaje de alerta
        } else {
            localStorage.setItem('logged', 'true'); //guarda el estado de autenticación en localStorage}
            localStorage.setItem('username', username); //guarda la info puesta en el campo username
            
            window.location.href = 'principal.html'; //redirige a la página principal
        }
    });
});
