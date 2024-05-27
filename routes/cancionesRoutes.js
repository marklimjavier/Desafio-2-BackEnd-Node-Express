import { Router } from "express";
import { getIndex, getCanciones, postCanciones } from "../controllers/cancionesControllers.js";

const ruta = Router()

ruta.get('/', getIndex)
ruta.get('/canciones', getCanciones)
ruta.post('/canciones', postCanciones);

export default ruta;