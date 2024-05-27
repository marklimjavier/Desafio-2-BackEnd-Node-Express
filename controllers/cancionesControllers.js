import path from 'path';
import fs from 'fs';

const getIndex = (req, res) => {
    const mainpath = path.resolve("index.html");
    res.sendFile(mainpath);
};

const getCanciones = (req, res) => {
    try {
        const canciones = JSON.parse(
            fs.readFileSync('repertorio.json', 'utf8')
        );
        res.status(200).json(canciones);
        console.log(canciones)
    } catch (error) {
        res.status(500).json({ message: "error en la matrix" });
    }
};

const postCanciones = (req, res) => {
    try {
        const {id, titulo, artista, tono} = req.body
        const cancion = {id, titulo, artista, tono}
        console.log(cancion)
        const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        canciones.push(cancion);
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(201).send("cancion ingresada exitosamente");
        console.log("cambio 2 realizado con exito")
    } catch (error) {
        res.status(500).json ({ message: "error, fallo de conexion"})
    }
}

export { getIndex, getCanciones, postCanciones };