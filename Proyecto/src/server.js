import express from 'express'
import  handlebars  from 'express-handlebars'

import productRouter from './routes/products.js'
import cartRouter from './routes/cart.js'




const PORT = 8080
const server = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.engine('handlebars', handlebars.engine())
server.set('views', __dirname+'/views')
server.set('views engine', 'handlebars')

server.use('/api/products', productRouter)

server.use('/api/carts', cartRouter)


server.listen(PORT, err =>{
    if (err)  console.log(err)
    console.log(`Corriendo en http://localhost:${PORT}`)
})


