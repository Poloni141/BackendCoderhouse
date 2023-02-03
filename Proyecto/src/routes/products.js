import { Router } from "express";
import ProductManager from '../daos/product-manager.js'

const router = Router()

const motos = new ProductManager('./src/mockDB/productos.json')
motos.getProducts()

router.get('/', async (request, response) => {
    let products = await motos.getProducts()
    const { limit } = request.query

    if (limit >= 1 && limit <= products.length) {
        return response.status(200).send(products.slice(0, limit))
    } else {
        return response.status(200).send(products)
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
    const { title, description, price, thumbnail, code, stock } = request.body;
    const requiredFields = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    const missingFields = requiredFields.filter(field => !request.body[field]);

    if (missingFields.length) {
        return res.status(400).send(`Faltan parametros: ${missingFields.join(', ')}`);
    }

    productManager.addProduct(title, description, price, thumbnail, code, stock);
    response.status(201).send('Producto añadido exitosamente');
})

router.put('/:pid', (request, response) => {
    let products = motos.getProducts()

    let pid = request.params['pid']
    const product = products.find(prod => prod.id === pid)

    if (!product) {
        return response.send('ID not found')
    } else {
        product.status = false
        response.send(product)
    }

})

router.delete('/:pid', (request, response) => {
    let products = motos.getProducts()

    let pid = request.params['pid']
    const product = products.find(prod => prod.id === pid)

    if (!product) {
        return response.send('ID not found')
    } else {
        product.status = false
        response.send(product)
    }

})


export default router