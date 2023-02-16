import { Router } from "express";
import ProductManager from '../daos/product-manager.js'

const motos = new ProductManager('./src/mockDB/productos.json')
motos.getProducts()

const router = Router()

router.get('/realtime', async (request, response) => {
    let products = await motos.getProducts()
    
    response.render('realTimeProducts', {
        products
    })
})

export default router