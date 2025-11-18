document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registroForm");
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const telefono = document.getElementById("telefono");
    const password = document.getElementById("password");
    const seguridad = document.getElementById("seguridad");
    const mensaje = document.getElementById("mensaje");

    function bloquearEspacios(campo) {
        campo.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                e.preventDefault();
                mensaje.textContent = "No puedes escribir espacios en este campo.";
                mensaje.style.color = "red";
            }
        });
    }

    bloquearEspacios(nombre);
    bloquearEspacios(correo);
    bloquearEspacios(telefono);
    bloquearEspacios(password);

    password.addEventListener("input", () => {
        const pass = password.value;
        let fuerza = 0;

        if (pass.length >= 6) fuerza++;
        if (/[A-Z]/.test(pass)) fuerza++;
        if (/[a-z]/.test(pass)) fuerza++;
        if (/\d/.test(pass)) fuerza++;
        if (/[!@#$%^&*()_+\-=]/.test(pass)) fuerza++;

        if (fuerza <= 2) {
            seguridad.textContent = "Contraseña débil";
            seguridad.style.color = "red";
        } else if (fuerza === 3) {
            seguridad.textContent = "Contraseña media";
            seguridad.style.color = "orange";
        } else {
            seguridad.textContent = "Contraseña fuerte";
            seguridad.style.color = "green";
        }
    });


    form.addEventListener("submit", (e) => {
        e.preventDefault();
        mensaje.textContent = "";

        if (!nombre.value.trim()) {
            mensaje.textContent = "El nombre es obligatorio.";
            mensaje.style.color = "red";
            return;
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre.value)) {
            mensaje.textContent = "El nombre solo debe tener letras.";
            mensaje.style.color = "red";
            return;
        }

        if (!correo.value.trim()) {
            mensaje.textContent = "El correo es obligatorio.";
            mensaje.style.color = "red";
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo.value)) {
            mensaje.textContent = " Ingresa un correo válido.";
            mensaje.style.color = "red";
            return;
        }

        if (!telefono.value.trim()) {
            mensaje.textContent = " El teléfono es obligatorio.";
            mensaje.style.color = "red";
            return;
        }


        if (!/^\d{10}$/.test(telefono.value)) {
            mensaje.textContent = " El teléfono debe tener exactamente 10 números.";
            mensaje.style.color = "red";
            return;
        }


        if (!password.value.trim()) {
            mensaje.textContent = "La contraseña es obligatoria.";
            mensaje.style.color = "red";
            return;
        }

        if (password.value.length < 6) {
            mensaje.textContent = " La contraseña debe tener al menos 6 caracteres.";
            mensaje.style.color = "red";
            return;
        }


        let fuerza = 0;
        if (password.value.length >= 6) fuerza++;
        if (/[A-Z]/.test(password.value)) fuerza++;
        if (/[a-z]/.test(password.value)) fuerza++;
        if (/\d/.test(password.value)) fuerza++;
        if (/[!@#$%^&*()_+\-=]/.test(password.value)) fuerza++;

        if (fuerza < 3) {
            mensaje.textContent = "La contraseña es demasiado débil. Usa mayúsculas, minúsculas y números mínimo.";
            mensaje.style.color = "red";
            return;
        }

        mensaje.textContent = "Registro exitoso.";
        mensaje.style.color = "green";
    });

});
