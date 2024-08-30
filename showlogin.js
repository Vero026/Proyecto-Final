// auth.js

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario ya está autenticado al cargar la página
    const isLogged = localStorage.getItem('logged');
    const username = localStorage.getItem('username');

    if (isLogged === 'true' && username) {
        // Si el usuario está autenticado, redirigir a la página principal
        if (window.location.pathname.includes('index.html')) {
            window.location.href = 'principal.html'; // Ajusta la ruta según sea necesario
        } else {
            // Mostrar el nombre de usuario en la página principal
            document.getElementById('username-display').textContent = username;
        }
    } else {
        // Si no está autenticado y está en principal.html, redirigir al login
        if (window.location.pathname.includes('principal.html')) {
            window.location.href = 'index.html'; // Ajusta la ruta según sea necesario
        }
    }

    // Manejar el formulario de inicio de sesión (solo si estamos en index.html)
    const form = document.getElementById('login');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío del formulario

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            if (username === '' || password === '') {
                alert('Por favor, complete todos los campos.');
            } else {
                // Simulación de autenticación exitosa
                localStorage.setItem('logged', 'true');
                localStorage.setItem('username', username);

                // Redirigir a la página principal
                window.location.href = 'principal.html';
            }
        });
    }

    // Manejar el cierre de sesión en la página principal
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            // Eliminar datos de autenticación del localStorage
            localStorage.removeItem('logged');
            localStorage.removeItem('username');

            // Redirigir al login
            window.location.href = 'index.html'; // Ajusta la ruta según sea necesario
        });
    }
});
