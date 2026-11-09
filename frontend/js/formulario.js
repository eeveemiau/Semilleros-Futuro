const formulario   = document.getElementById("treslineas");
const campoNombre  = document.getElementById("name");
const campoCorreo  = document.getElementById("email");
const campoMensaje = document.getElementById("message");

//Validación formulario

function mostrarError(campo, spanId, mensaje) {
    campo.classList.remove("valido");
    campo.classList.add("invalido");
    document.getElementById(spanId).textContent = mensaje;
}

function mostrarValido(campo, spanId) {
    campo.classList.remove("invalido");
    campo.classList.add("valido");
    document.getElementById(spanId).textContent = "";
}

function validarNombre() {
    const valor = campoNombre.value.trim();
    if (valor === "") {
        mostrarError(campoNombre, "errorName", "El nombre es obligatorio.");
        return false;
    }
    if (valor.length < 3) {
        mostrarError(campoNombre, "errorName", "Debe tener al menos 3 caracteres.");
        return false;
    }
    mostrarValido(campoNombre, "errorName");
    return true;
}

function validarCorreo() {
    const valor = campoCorreo.value.trim();
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valor === "") {
        mostrarError(campoCorreo, "errorEmail", "El correo es obligatorio.");
        return false;
    }
    if (!patron.test(valor)) {
        mostrarError(campoCorreo, "errorEmail", "Escribe un correo válido (ej: nombre@dominio.com).");
        return false;
    }
    mostrarValido(campoCorreo, "errorEmail");
    return true;
}

function validarMensaje() {
    const valor = campoMensaje.value.trim();
    if (valor === "") {
        mostrarError(campoMensaje, "errorMessage", "El mensaje es obligatorio.");
        return false;
    }
    if (valor.length < 10) {
        mostrarError(campoMensaje, "errorMessage", "Escribe al menos 10 caracteres.");
        return false;
    }
    mostrarValido(campoMensaje, "errorMessage");
    return true;
}

campoNombre.addEventListener("input", validarNombre);
campoCorreo.addEventListener("input", validarCorreo);
campoMensaje.addEventListener("input", validarMensaje);


formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombreOk = validarNombre();
    const correoOk = validarCorreo();
    const mensajeOk = validarMensaje();

    if (nombreOk && correoOk && mensajeOk) {
        document.getElementById("mensajeExito").textContent = "¡Mensaje enviado con éxito!";
        formulario.reset();
        document.querySelectorAll("#treslineas .valido").forEach(function(campo) {
            campo.classList.remove("valido");
        });
    } else {
        document.getElementById("mensajeExito").textContent = "";
    }
});


//Botones form
function alertaCopiar() {
    alert("Copiado en el portapapeles");
}

if (document.getElementById("copyG")) {
    document.getElementById("copyG").addEventListener("click", function() {
        navigator.clipboard.writeText("semilleros.del.futuro03@gmail.com").then(function() {
            alertaCopiar();
        }, function(err) {
            console.error("Error al copiar el texto: ", err);
        });
    });
}

if (document.getElementById("copyT")) {
    document.getElementById("copyT").addEventListener("click", function() {
        navigator.clipboard.writeText("+57 304 5515962").then(function() {
            alertaCopiar();
        }, function(err) {
            console.error("Error al copiar el texto: ", err);
        });
    });
}

if (document.getElementById("copyU")) {
    document.getElementById("copyU").addEventListener("click", function() {
        navigator.clipboard.writeText("Medellín, Antioquia, Colombia").then(function() {
            alertaCopiar();
        }, function(err) {
            console.error("Error al copiar el texto: ", err);
        });
    });
}