
document.getElementById("registroForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const docUsuario = document.getElementById("docUsuario").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = "";
    mensaje.style.color = "red";

    if (!docUsuario || !nombre || !telefono || !correo || !direccion || !password || !confirmPassword) {
        mensaje.textContent = "Por favor, completa todos los campos.";
        return;
    }

    const docRegex = /^\d{6,12}$/;
    if (!docRegex.test(docUsuario)) {
        mensaje.textContent = "El documento debe tener entre 6 y 12 dígitos (solo números).";
        return;
    }

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/;
    if (!nombreRegex.test(nombre)) {
        mensaje.textContent = "El nombre solo puede contener letras y espacios, sin números.";
        return;
    }

    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
        mensaje.textContent = "El teléfono debe tener exactamente 10 dígitos.";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        mensaje.textContent = "Usa un correo válido (ej.: usuario@dominio.com).";
        return;
    }
    if (correo.includes("test@") || correo.includes("example.com")) {
        mensaje.textContent = "Por favor, usa un correo real en lugar de uno de prueba.";
        return;
    }

    const direccionRegex = /^[A-Za-z0-9#\-\.\s]{3,100}$/;
    if (!direccionRegex.test(direccion)) {
        mensaje.textContent = "La dirección tiene caracteres inválidos o es demasiado corta.";
        return;
    }

    if (password.includes(" ")) {
        mensaje.textContent = "La contraseña no puede contener espacios.";
        return;
    }
    if (password.length < 6 || password.length > 12) {
        mensaje.textContent = "La contraseña debe tener entre 6 y 12 caracteres.";
        return;
    }

    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /\d/.test(password);
    const tieneSimbolo = /[!@#$%^&*()_+\-=]/.test(password);
    const tieneRepetidos = /(.)\1{2,}/.test(password);

    if (!tieneMayuscula || !tieneMinuscula || !tieneNumero || !tieneSimbolo) {
        mensaje.textContent = "La contraseña debe incluir mayúsculas, minúsculas, números y al menos un símbolo.";
        return;
    }

    if (tieneRepetidos) {
        mensaje.textContent = "Evita repetir un mismo carácter más de dos veces en la contraseña.";
        return;
    }

    if (password !== confirmPassword) {
        mensaje.textContent = "Las contraseñas no coinciden. Revisa e intenta de nuevo.";
        return;
    }

    if (password.includes(nombre.split(" ")[0]) || password.includes(docUsuario)) {
        mensaje.textContent = "La contraseña no debe contener tu nombre ni tu número de documento.";
        return;
    }

    mensaje.style.color = "green";
    mensaje.textContent = "Perfecto — todo está listo. Enviando los datos...";

    const datos = new FormData();
    datos.append("docUsuario", docUsuario);
    datos.append("nombre", nombre);
    datos.append("telefono", telefono);
    datos.append("correo", correo);
    datos.append("direccion", direccion);
    datos.append("password", password);

    fetch("../src/register.php", {
        method: "POST",
        body: datos
    })
    .then(res => res.text())
    .then(texto => {
        const limpio = texto.replace(/<[^>]+>/g, "").trim();
        if (/Registro exitoso/i.test(limpio) || /exitoso/i.test(limpio)) {
            mensaje.style.color = "green";
            mensaje.textContent = "Registro exitoso. Redirigiendo...";
            setTimeout(() => window.location.href = "../pages/login.php", 1500);
        } else {
            mensaje.style.color = "red";
            mensaje.textContent = limpio || "Ocurrió un error al registrar. Intenta de nuevo.";
        }
    })
    .catch(() => {
        mensaje.style.color = "red";
        mensaje.textContent = "No se pudo conectar con el servidor. Intenta más tarde.";
    });
});