import express  from 'express'
import ProductManager from './product-manager.js'

const PORT = 8080
const server = express()
server.use(express.urlencoded({extended:true}))

const motos = new ProductManager('./productos.txt')
motos.getProducts()

server.get('/products', (request, response) => {
    let products = motos.getProducts()
    const { limit } = request.query

    if (limit >= 1 && limit <= products.length) {
        return response.send(products.slice(0, limit)) 
    } else {
        return response.send(products)
    }
})

server.get('/products/:pid', (request, response) =>{
    let products = motos.getProducts()

    let pid = request.params['pid']
    const product = products.find(prod => prod.id === pid)

    if (!product) {
        return response.send('ID not found')
    } else {
        response.send(product)
    }
    
})


server.listen(PORT,err =>{
    if (err)  console.log(err)
    console.log(`Escuchando en el puerto ${PORT}`)
})


