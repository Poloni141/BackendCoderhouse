const fs = require('fs')

class ProductManager {
    constructor(ruta) {
        this.products = []
        this.path = ruta
    }

    addProduct = (title, description, price, thumbnail, code, stock, id) => {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id
        }

        if (this.products.length === 0) {
            product.id = 1
        } else {
            product.id = this.products[this.products.length - 1].id + 1
        }

        let found = this.products.some(p => p.code === code)
        if (!found) {
            this.products.push(product)
            fs.writeFileSync('./productos.txt', this.products, 'utf-8')
            //console.log(this.products)
        } else {
            console.log('El codigo ya existe, intente con otro')
        }
    }

    getProducts = () => console.log(this.products)

    getProductById = (id) => {
        let searchedId = (this.products.find(p => p.id === id))
        if (searchedId) {
            return searchedId
        } else {
            console.log('ID not found')
        }
    }

    updateProduct = (id, key, value) => {
        let objIndex = this.products.findIndex(obj => obj.id === id)
        switch (key) {
            case 'title':
                this.products[objIndex].title = value
                console.log(this.products)
                break;

            case 'description':
                this.products[objIndex].description = value
                console.log(this.products)
                break;

            case 'price':
                this.products[objIndex].price = value
                console.log(this.products)
                break;

            case 'thumbnail':
                this.products[objIndex].thumbnail = value
                console.log(this.products)
                break;

            case 'stock':
                this.products[objIndex].stock = value
                console.log(this.products)
                break;
                
            default:
                console.log('Error, verificar KEY que sea string')
        }
        fs.writeFileSync('./productos.txt', this.products, 'utf-8')
    }

    deleteProduct = (id) => {
        let deleteObj = this.products.findIndex(obj => obj.id === id)
        if (deleteObj > -1) {
            this.products.splice(deleteObj, 1)
        }

        fs.writeFileSync('./productos.txt', this.products, 'utf-8')
        return this.products
    }
}

const motos = new ProductManager('./productos')
motos.addProduct('Yamaha R6', 'Motorbike', 20000, 'https://www.mundomotero.com/wp-content/uploads/2021/05/Yamaha-R6-RACE-2022-8-1200x675-1-1024x576.jpg', 1, 5, 1)
