document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    const usuario = document.getElementById("usuario");
    const password = document.getElementById("password");
    const mensaje = document.getElementById("mensaje");
    const seguridad = document.getElementById("seguridad"); // 👉 Debe existir en HTML

    function bloquearEspacios(campo) {
        campo.addEventListener("keydown", (e) => {
            if (e.key === " ") {
                e.preventDefault();
                mensaje.textContent = "❌ No puedes escribir espacios.";
                mensaje.style.color = "red";
            }
        });
    }

    bloquearEspacios(usuario);
    bloquearEspacios(password);

    // 👉 FUNCIÓN PARA CALCULAR LA FUERZA DE LA CONTRASEÑA
    function calcularFuerza(pass) {
        let fuerza = 0;
        if (pass.length >= 6) fuerza++;
        if (/[A-Z]/.test(pass)) fuerza++;
        if (/[a-z]/.test(pass)) fuerza++;
        if (/\d/.test(pass)) fuerza++;
        if (/[!@#$%^&*()_+\-=]/.test(pass)) fuerza++;
        return fuerza;
    }

    // 👉 Mostrar nivel de seguridad mientras escribe
    password.addEventListener("input", () => {
        const pass = password.value;
        const fuerza = calcularFuerza(pass);

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

        if (!usuario.value.trim()) {
            mensaje.textContent = "❌ El usuario es obligatorio.";
            mensaje.style.color = "red";
            return;
        }

        if (!/^[A-Za-z0-9_.-]{3,20}$/.test(usuario.value)) {
            mensaje.textContent = "❌ El usuario solo puede contener letras, números y _ . - (mínimo 3 caracteres).";
            mensaje.style.color = "red";
            return;
        }

        if (!password.value.trim()) {
            mensaje.textContent = "❌ La contraseña es obligatoria.";
            mensaje.style.color = "red";
            return;
        }

        if (/\s/.test(password.value)) {
            mensaje.textContent = "❌ La contraseña no puede contener espacios.";
            mensaje.style.color = "red";
            return;
        }

        if (password.value.length < 6) {
            mensaje.textContent = "❌ La contraseña debe tener al menos 6 caracteres.";
            mensaje.style.color = "red";
            return;
        }

        const fuerza = calcularFuerza(password.value);

        if (fuerza < 3) {
            mensaje.textContent = "❌ La contraseña es demasiado débil. Debe incluir mayúsculas, minúsculas y números.";
            mensaje.style.color = "red";
            return;
        }

        mensaje.textContent = "✔️ Validación correcta. Enviando...";
        mensaje.style.color = "green";


        document.getElementById("Ingresar")
        window.location.href = "/index.html"

        setTimeout(() => {
            form.submit();
        }, 800);
    });
});

