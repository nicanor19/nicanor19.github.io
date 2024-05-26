$(document).ready(function () {
    // Captura el evento de envío del formulario
    $('#login-form').submit(function (event) {
        event.preventDefault(); // Evita la recarga de la página
  
        // Obtén los valores de usuario y contraseña ingresados
        var username = $('#username').val();
        var password = $('#password').val();
  
        // Comprueba si el usuario y la contraseña son correctos
        if (username === 'noche' && password === '12345678') {
            // Si son correctos, muestra un mensaje de bienvenida
            $('#message').text('¡Bienvenido, ' + username + '!');
            
            // Muestra el botón secreto
            $('#botonSecreto').show();
        } else {
            // Si no son correctos, muestra un mensaje de error
            $('#message').text('Usuario o contraseña incorrectos.');
  
            // Oculta el botón secreto en caso de error
            $('#botonSecreto').hide();
        }
    });
  });
  