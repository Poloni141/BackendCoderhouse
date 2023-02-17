import express from 'express'
import  handlebars  from 'express-handlebars'

import productRouter from './routes/products.js'
import cartRouter from './routes/cart.js'
import homeRouter from './routes/home.js'
import realTimeRouter from './routes/realTimeProducts.js'

import __dirname from './utils.js'

import ProductManager from './daos/product-manager.js'

import { Server } from 'socket.io'




const PORT = 8080
const server = express()
server.use(express.json())
server.use(express.urlencoded({extended:true}))

server.use(express.static(`${__dirname}/public`))

server.engine('handlebars', handlebars.engine())
server.set('views', __dirname+'/views')
server.set('view engine', 'handlebars')

server.use('/', homeRouter)

server.use('/', realTimeRouter)

server.use('/api/products', productRouter)

server.use('/api/carts', cartRouter)


const httpServer = server.listen(PORT, err =>{
    if (err)  console.log(err)
    console.log(`Corriendo en http://localhost:${PORT}`)
})

const socketServer = new Server(httpServer)

const productManager = new ProductManager(__dirname + '/mockDB/productos.json')
let history = productManager.getProducts()

socketServer.on('connection', socket => {
    console.log('Cliente conectado')

    socket.emit('arrayProd', history)

    socket.on('newProduct', (data) => {
        productManager.addProduct(data)
        history = productManager.getProducts()
        socket.emit('products', history)
    })
})

