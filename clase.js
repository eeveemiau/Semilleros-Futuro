const plantas = [
    {id: 1, nombre: "Oliva", ubicacion: "Grecia"},
    {id: 2, nombre: "Margarita", ubicacion: "Europa"},
    {id: 3, nombre: "Abedul", ubicacion: "El retiro"},
]

function generarListaHTML (items) {
    const filas = items
    .map((item) => `<li>${item.nombre} - &{item.ubicacion}</li>`)
    .join("");

    return `
        <html>
            <body>
                <h1>Plantas registradas</h1>
                <ul>${filas}</ul>
            </body>
        </html>
    `;
}

if (req.url === "/plantas") {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(generarListaHTML(plantas));
}