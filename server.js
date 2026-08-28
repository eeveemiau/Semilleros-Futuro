require("dotenv").config();

const express = require("express");
const path = require("path");
const multer = require("multer");

if (!process.env.PLANTNET_API_KEY) {
    console.error("⚠️  Falta PLANTNET_API_KEY en el archivo .env. El servidor puede iniciar, pero /api/identificar fallará.");
} else {
    console.log("API Key cargada correctamente");
}

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Solo se permiten imágenes JPG o PNG"));
        }
    }
});

const app = express();

const PORT = 3000;

app.post("/api/identificar", upload.single("images"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: "No se recibió ninguna imagen"
        });
    }

    try {
        const formData = new FormData();

        const imagen = new Blob(
            [req.file.buffer],
            { type: req.file.mimetype }
        );

        formData.append("images", imagen, req.file.originalname);
        formData.append("organs", "auto");

        const respuesta = await fetch(
            `https://my-api.plantnet.org/v2/identify/all?api-key=${process.env.PLANTNET_API_KEY}`,
            {
                method: "POST",
                body: formData
            }
        );

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            console.error("Error de PlantNet:", datos);

            return res.status(respuesta.status).json({
                error: "PlantNet rechazó la solicitud",
                detalles: datos
            });
        }

        res.json(datos);

    } catch (error) {
        console.error("Error al conectar con PlantNet:", error);

        res.status(500).json({
            error: "Error al comunicarse con PlantNet"
        });
    }
});

// Servir los archivos de frontend
app.use(express.static(path.join(__dirname, "frontend")));

// Página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "html", "index.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "html", "index.html"));
});

// Otras páginas
app.get("/contactanos.html", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "html", "contactanos.html"));
});

app.get("/equipo.html", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "html", "equipo.html"));
});

app.get("/identificar.html", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "html", "identificar.html"));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});