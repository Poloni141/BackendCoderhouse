import { Router } from "express";
import ProductManager from '../daos/product-manager.js'

const router = Router()

const motos = new ProductManager('./productos.txt')
motos.getProducts()

router.get('/', async (request, response) => {
    let products = await motos.getProducts()
    const { limit } = request.query

    if (limit >= 1 && limit <= products.length) {
        return response.send(products.slice(0, limit)) 
    } else {
        return response.send(products)
    }
})

router.get('/:pid', (request, response) =>{
    let products = motos.getProducts()

    let pid = request.params['pid']
    const product = products.find(prod => prod.id === pid)

    if (!product) {
        return response.send('ID not found')
    } else {
        response.send(product)
    }
    
})

router.post('/', (request, response) => {
    let products = motos.getProducts()
    let newProduct = request.body
    products.push(newProduct)

    
})


export default router