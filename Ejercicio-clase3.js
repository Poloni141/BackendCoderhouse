class ProductManager {
    constructor() {
        this.products = []
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
            console.log(this.products)
        } else {
            console.log('El codigo ya existe, intente con otro')
        }
    }

    getProducts = () => this.products

    getProductById = (id) => {
        let searchedId = (this.products.find(p => p.id === id))
        if (searchedId) {
            return searchedId
        } else {
            console.log('ID not found')
        }
    }
}

const p1 = new ProductManager()
p1.addProduct('Yamaha R6', 'Motorbike', 20000, 'https://www.mundomotero.com/wp-content/uploads/2021/05/Yamaha-R6-RACE-2022-8-1200x675-1-1024x576.jpg', 1, 5, 1)
