document.getElementById("registroForm").addEventListener("submit", async (e) => {
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

    // ===============================
    // VALIDACIONES (TU LÓGICA ORIGINAL)
    // ===============================
    if (!docUsuario || !nombre || !telefono || !correo || !direccion || !password || !confirmPassword) {
        mensaje.textContent = "Por favor, completa todos los campos.";
        return;
    }

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

    if (!/^\d{6,12}$/.test(docUsuario)) {
        mensaje.textContent = "El documento debe tener entre 6 y 12 dígitos.";
        return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(nombre)) {
        mensaje.textContent = "El nombre solo puede contener letras y espacios.";
        return;
    }

    if (!/^\d{10}$/.test(telefono)) {
        mensaje.textContent = "El teléfono debe tener 10 dígitos.";
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        mensaje.textContent = "Correo inválido.";
        return;
    }

    if (!/^[A-Za-z0-9#\-\.\s]{3,100}$/.test(direccion)) {
        mensaje.textContent = "Dirección inválida.";
        return;
    }

    if (password.length < 6 || password.length > 12) {
        mensaje.textContent = "La contraseña debe tener entre 6 y 12 caracteres.";
        return;
    }

    if (
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/\d/.test(password) ||
        !/[!@#$%^*()_+\-=]/.test(password)
    ) {
        mensaje.textContent = "La contraseña debe incluir mayúscula, minúscula, número y símbolo.";
        return;
    }

    if (/(.)\1{2,}/.test(password)) {
        mensaje.textContent = "No repitas caracteres más de dos veces.";
        return;
    }

    if (password !== confirmPassword) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        return;
    }

    if (password.includes(nombre.split(" ")[0]) || password.includes(docUsuario)) {
        mensaje.textContent = "La contraseña no debe contener tu nombre ni documento.";
        return;
    }

    // ===============================
    // ENVÍO
    // ===============================
    mensaje.style.color = "green";
    mensaje.textContent = "Enviando datos...";

    const datos = new FormData();
    datos.append("docUsuario", docUsuario);
    datos.append("nombre", nombre);
    datos.append("telefono", telefono);
    datos.append("correo", correo);
    datos.append("direccion", direccion);
    datos.append("password", password);

    const btn = document.querySelector('#registroForm button[type="submit"]');
    if (btn) btn.disabled = true;

    try {
        const res = await fetch(
            "/VisioHome/backend/controllers/AuthController.php?action=register",
            {
                method: "POST",
                body: datos
            }
        );

        const data = await res.json();

        if (!res.ok || !data.success) {
            mensaje.style.color = "red";
            mensaje.textContent = data.message || "Error al registrarse.";
            return;
        }

        mensaje.style.color = "green";
        mensaje.textContent = "Registro exitoso. Redirigiendo...";

        setTimeout(() => {
            window.location.href = "/VisioHome/frontend/pages/login.php";
        }, 1200);

    } catch (err) {
        mensaje.style.color = "red";
        mensaje.textContent = "Error de conexión con el servidor.";
    } finally {
        if (btn) btn.disabled = false;
    }
});
