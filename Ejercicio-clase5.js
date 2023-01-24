const fs = require('fs')

class ProductManager {
    constructor(ruta) {
        this.path = ruta
    }

    getProducts = () => {
        if (fs.existsSync(this.path)) {
            let products = []
            return products = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        } else {
            fs.writeFileSync(this.path, '[]', 'utf-8')
            let products = []
            return products
        }
    }
    

    addProduct = (title, description, price, thumbnail, code, stock, id) => {
        let products = getProducts()
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id
        }


        if (products.length === 0) {
            product.id = 1
        } else {
            product.id = products[products.length - 1].id + 1
        }
    
        let found = products.some(p => p.code === code)
        if (!found) {
            products.push(product)
            fs.appendFileSync(this.path, JSON.stringify(products), 'utf-8')
            //console.log(this.products)
        } else {
            console.log('El codigo ya existe, intente con otro')
        }
        
    }

    getProductById = (id) => {
        let products = getProducts()
        let searchedId = (products.find(p => p.id === id))
        if (searchedId) {
            return searchedId
        } else {
            console.log('ID not found')
        }
    }

    updateProduct = (id, key, value) => {
        let products = getProducts()
        let objIndex = products.findIndex(obj => obj.id === id)
        switch (key) {
            case 'title':
                products[objIndex].title = value
                console.log(products)
                fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
                break;

            case 'description':
                products[objIndex].description = value
                console.log(products)
                fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
                break;

            case 'price':
                products[objIndex].price = value
                console.log(products)
                fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
                break;

            case 'thumbnail':
                products[objIndex].thumbnail = value
                console.log(products)
                fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
                break;

            case 'stock':
                products[objIndex].stock = value
                console.log(products)
                fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
                break;
                
            default:
                console.log('Error, verificar KEY que sea string')
        }
    }

    deleteProduct = (id) => {
        let products = getProducts()
        let deleteObj = products.findIndex(obj => obj.id === id)
        if (deleteObj > -1) {
            products.splice(deleteObj, 1)
        }

        return products = fs.writeFileSync(this.path, JSON.stringify(products), 'utf-8')
    }
}

const motos = new ProductManager('./productos.txt')
motos.getProducts()
motos.addProduct('Yamaha R6', 'Motorbike', 20000, 'https://www.mundomotero.com/wp-content/uploads/2021/05/Yamaha-R6-RACE-2022-8-1200x675-1-1024x576.jpg', 1, 5, 1)
