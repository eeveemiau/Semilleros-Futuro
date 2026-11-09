const inputFoto = document.getElementById("inputFoto");
const preview = document.getElementById("preview");
const labelSubir = document.getElementById("labelSubir");
const btnEscanear = document.getElementById("btnEscanear");
const loading = document.getElementById("loading");
const resultadoDiv = document.getElementById("resultado");

// Mostrar vista previa de la imagen seleccionada
inputFoto.addEventListener("change", (e) => {
    const archivo = e.target.files[0];

    if (archivo) {
        const urlImagen = URL.createObjectURL(archivo);

        preview.src = urlImagen;
        preview.style.display = "block";

        labelSubir.innerText = "Cambiar imagen";

        btnEscanear.disabled = false;

        resultadoDiv.innerHTML = "";
    }
});

// Redimensiona la imagen antes de enviarla al servidor
async function redimensionar(archivo, maxLado = 1600, calidad = 0.85) {
    const bitmap = await createImageBitmap(archivo);
    const escala = Math.min(1, maxLado / Math.max(bitmap.width, bitmap.height));

    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * escala);
    canvas.height = Math.round(bitmap.height * escala);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    return new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", calidad));
}

// Identificar la planta
btnEscanear.addEventListener("click", async () => {
    const archivo = inputFoto.files[0];

    if (!archivo) return;

    loading.style.display = "block";
    btnEscanear.disabled = true;
    resultadoDiv.innerHTML = "";

    const formData = new FormData();

    const fotoLista = await redimensionar(archivo);
    formData.append("images", fotoLista, "foto.jpg");
    formData.append("organs", "auto");

    try {
        const respuesta = await fetch("/api/identificar", {
            method: "POST",
            body: formData
        });

        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        mostrarResultados(datos);

    } catch (error) {
        resultadoDiv.innerHTML =
            '<p style="color: red;">Hubo un problema al identificar la planta. Inténtalo de nuevo</p>';

        console.error(error);

    } finally {
        loading.style.display = "none";
        btnEscanear.disabled = false;
    }
});

// Mostrar resultados
function mostrarResultados(datos) {

    if (!datos.results || datos.results.length === 0) {
        resultadoDiv.innerHTML =
            "<p>No se pudo identificar la planta con certeza.</p>";
        return;
    }

    const mejorOpcion = datos.results[0];

    const nombreCientifico =
        mejorOpcion.species.scientificNameWithoutAuthor;

    const nombresComunes =
        mejorOpcion.species.commonNames.length > 0
            ? mejorOpcion.species.commonNames.join(", ")
            : "Sin nombre común registrado";

    const certeza =
        (mejorOpcion.score * 100).toFixed(1);

    resultadoDiv.innerHTML = `
        <div class="card-resultado">
            <h3>🌱 ${nombresComunes}</h3>
            <p>
                <strong>Nombre científico:</strong>
                <em>${nombreCientifico}</em>
            </p>
            <p>
                <strong>Precisión:</strong>
                ${certeza}%
            </p>
        </div>
    `;
}