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

    // -----------------------
    // VALIDAR CAMPOS VACÍOS
    // -----------------------
    if (!docUsuario || !nombre || !telefono || !correo || !direccion || !password || !confirmPassword) {
        mensaje.textContent = "Por favor, completa todos los campos.";
        return;
    }

    // --------------------------------------------------
    // VALIDACIÓN NUEVA: NO PERMITIR ESPACIOS EN CAMPOS
    // --------------------------------------------------
    const camposSinEspacios = [
        { valor: docUsuario, nombre: "Documento" },
        { valor: telefono, nombre: "Teléfono" },
        { valor: correo, nombre: "Correo" },
        { valor: password, nombre: "Contraseña" },
        { valor: confirmPassword, nombre: "Confirmación de contraseña" }
    ];

    for (let campo of camposSinEspacios) {
        if (/\s/.test(campo.valor)) {
            mensaje.textContent = `El campo "${campo.nombre}" no puede contener espacios.`;
            return;
        }
    }

    // Nombre: permite espacios → NO aplicar la validación aquí
    // Dirección: permite espacios → tampoco

    // -----------------------
    // VALIDACIONES NORMALES
    // -----------------------

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

    const telefonoRegex = /^\d{10}$ /;
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

    if (password.length < 6 || password.length > 12) {
        mensaje.textContent = "La contraseña debe tener entre 6 y 12 caracteres.";
        return;
    }

    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /\d/.test(password);
    const tieneSimbolo = /[!@#$%^*()_+\-=]/.test(password);
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

    // -----------------------
    // ENVÍO FINAL
    // -----------------------
    mensaje.style.color = "green";
    mensaje.textContent = "Perfecto — todo está listo. Enviando los datos...";

    const datos = new FormData();
    datos.append("docUsuario", docUsuario);
    datos.append("nombre", nombre);
    datos.append("telefono", telefono);
    datos.append("correo", correo);
    datos.append("direccion", direccion);
    datos.append("password", password);

    const submitBtn = document.querySelector('#registroForm button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    fetch("/VisioHome/src/backend/registerUsuario.php", {
        method: "POST",
        body: datos
    })
    .then(async res => {
        const contentType = res.headers.get('content-type') || '';
        let body;
        let rawText = '';

        if (contentType.includes('application/json')) {
            rawText = await res.text();
            try {
                body = JSON.parse(rawText);
            } catch (err) {
                body = rawText.replace(/<[^>]+>/g, '').trim();
            }
        } else {
            rawText = await res.text();
            body = rawText.replace(/<[^>]+>/g, '').trim();
        }

        if (!res.ok) {
            const detalle = (typeof body === 'string') ? body : (body && body.message) ? body.message : JSON.stringify(body);
            mensaje.style.color = 'red';
            mensaje.textContent = `Error ${res.status} ${res.statusText}: ${detalle || 'Sin detalle'}`;
            return;
        }

        let exitoso = false;

        if (typeof body === 'string') {
            exitoso = /Registro exitoso|exitoso/i.test(body);
        } else if (body && (body.success || body.message)) {
            exitoso = !!body.success || /exitoso/i.test(String(body.message));
        }

        if (exitoso) {
            mensaje.style.color = 'green';
            mensaje.textContent = 'Registro exitoso. Redirigiendo...';
            setTimeout(() => window.location.href = '../pages/login.php', 1500);
        } else {
            const detalle = (typeof body === 'string') ? body : (body && (body.error || body.message)) ? (body.error || body.message) : JSON.stringify(body);
            mensaje.style.color = 'red';
            mensaje.textContent = detalle || 'Ocurrió un error al registrar. Intenta de nuevo.';
        }
    })
    .catch(err => {
        mensaje.style.color = 'red';
        mensaje.textContent = `Error de conexión: ${err && err.message ? err.message : err}`;
    })
    .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
    });
});
