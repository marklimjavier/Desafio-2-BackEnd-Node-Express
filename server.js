import express from 'express';
import path from 'path';
import fs from 'fs';

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    const mainpath = path.resolve("index.html");
    res.sendFile(mainpath);
});

app.get("/canciones", (req, res) => {
    try {
        const canciones = JSON.parse(
            fs.readFileSync('repertorio.json', 'utf8')
        );
        res.status(200).json(canciones);
        console.log(canciones);
    } catch (error) {
        res.status(500).json({ message: "error en la matrix" });
    }
});

app.post("/canciones", (req, res) => {
    try {
        const { id, titulo, artista, tono } = req.params;
        const cancion = req.body;
        let canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        canciones.push(cancion);
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.status(201).send("Canción ingresada exitosamente");
        console.log("Cambio 2 realizado con éxito");
    } catch (error) {
        console.error("Error al guardar la canción:", error);
        res.status(500).json({ message: "Error al guardar la canción" });
    }
});
//aqui tambien tengo la misma consulta que le hice en clase, como el req.body recibe los datos, porque puedo verlos
//console.log que se producen pero nunca entendi como hacerlo llegar al post, un dolor de cabeza, incluso consulte con
//mis compañeros y segui en nada

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync("repertorio.json"))
    const fIndex = canciones.findIndex(c => c.id == id)
    canciones.splice( fIndex, 1)
    fs.writeFileSync("repertorio.json", JSON.stringify(canciones))
    res.send("Cancion eliminada con existo") 
})
//En cambio esto fue tan facil que no pude evitar reir, seguro no cuesta distribuirla en ruta y controlador aunque
//no tengo nada que presumir, a la final sale igual a la guia

app.put("/canciones/:id", (req, res) => {
    try {
        const { id } = req.params;
        const cancion = req.body;
        const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        const index = canciones.findIndex(c => c.id == id);
        canciones[index] = cancion;
        fs.writeFileSync("repertorio.json", JSON.stringify(canciones));
        res.send("Canción actualizada exitosamente");
    } catch (error) {
        console.error("Error al actualizar la canción:", error);
        res.status(500).json({ message: "Error al actualizar la canción" });
    }
});

//sinceramente profe lo unico que me detuvo de hacerlo de la otra forma es el post, mañana estare atento a su observacion
//sobre el post, porque es que no me tomaba el bendito Post, el put y el delete fueron faciles en comparacion
//pero no se porque no me quiere responder el post, me bloquee feo alli.






app.listen(PORT, () => console.log(`Iniciando servidor http://localhost:${PORT}`));

