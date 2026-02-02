export function limpiarEspacios(input) {
    input.addEventListener("input", () => {
        input.value = input.value.replace(/\s/g, "");
    });
}

export function usuarioValido(valor) {
    return /^[A-Za-z0-9_.-]{3,20}$/.test(valor);
}

export function correoValido(valor) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

export function passwordFuerte(password) {
    if (password.length < 6 || password.length > 12) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/\d/.test(password)) return false;
    if (!/[!@#$%^*()_+\-=]/.test(password)) return false;
    if (/(.)\1{2,}/.test(password)) return false;
    return true;
}
