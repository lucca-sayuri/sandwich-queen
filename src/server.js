import express from 'express'
import userRoutes from './routes/userRoutes.js'
import cheeseRoutes from './routes/cheeseRoutes.js'
import pattyRoutes from './routes/pattyRoutes.js'
import burgerRoutes from './routes/burgerRoutes.js'
import verificadorId from './middlewares/verificadorId.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(verificadorId)
app.use(userRoutes)
app.use(cheeseRoutes)
app.use(pattyRoutes)
app.use(burgerRoutes)

app.listen(PORT, () => {
    console.log(`rorando servidor na porta ${PORT}`)
})