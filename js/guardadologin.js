document.addEventListener('DOMContentLoaded', function() {
    const estaLogged = localStorage.getItem('logged'); //obtener el estado de autenticacion (en el login.js)

    if (estaLogged === 'true') {
        //si el usuario ya está autenticado, redirigir a principal.html
        window.location.href = 'principal.html';
    }
});
