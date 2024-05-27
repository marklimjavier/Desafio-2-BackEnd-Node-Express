import express from 'express'
import cancionesRoutes from './routes/cancionesRoutes.js'



const PORT = 3000

const app = express()

app.use('/', cancionesRoutes)

app.use('/canciones', cancionesRoutes )

app.use(express.json())

app.listen(PORT, console.log(`Iniciando servidor http://localhost:${PORT}`))


