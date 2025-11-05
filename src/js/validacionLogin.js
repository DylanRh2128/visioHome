
document.querySelector("form").addEventListener("submit", function(event) {
    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    let errores = [];

    if (usuario.length < 4) {
        errores.push("El usuario debe tener al menos 4 caracteres.");
    }

    if (password.length < 6) {
        errores.push("La contraseña debe tener al menos 6 caracteres.");
    }

    if (errores.length > 0) {
        event.preventDefault();
        alert(errores.join("\n"));
    }
});
