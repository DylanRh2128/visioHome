document.addEventListener("DOMContentLoaded", () => {
    const mensaje = document.getElementById("mensaje");
    const form = document.getElementById("loginForm");
    console.log("FORM:", form);


    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        mensaje.textContent = "";

        const datos = new FormData(form);

        try {
            const res = await fetch("/VisioHome/backend/public/loginUsuario.php", {
                method: "POST",
                body: datos
            });

            const text = await res.text(); // 👈 DEBUG CLAVE
            console.log("RESPUESTA BACKEND LOGIN:", text);

            let data;
            try {
                data = JSON.parse(text);
            } catch (parseError) {
                mensaje.style.color = "red";
                mensaje.textContent = "El servidor devolvió una respuesta inválida.";
                return;
            }

            if (!res.ok) {
                mensaje.style.color = "red";
                mensaje.textContent = data.message || "Error en el login.";
                return;
            }

            mensaje.style.color = "green";
            mensaje.textContent = "Ingreso correcto. Redirigiendo...";

            setTimeout(() => {
                switch (parseInt(data.rol)) {
                    case 1:
                        window.location.href = "/VisioHome/frontend/pages/admin/dashboard.php";
                        break;
                    case 2:
                        window.location.href = "/VisioHome/frontend/pages/user/nosotros.php";
                        break;
                    case 3:
                        window.location.href = "/VisioHome/frontend/pages/asesor/panel.php";
                        break;
                    default:
                        window.location.href = "/VisioHome/index.php";
                }
            }, 800);

        } catch (error) {
            console.error("ERROR FETCH LOGIN:", error);
            mensaje.style.color = "red";
            mensaje.textContent = "Error de conexión con el servidor.";
        }
    });
});
