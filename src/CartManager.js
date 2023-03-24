import fs from 'fs/promises'
import ProductManager from './ProductManager.js'


export default class CartManager {
    contructor(path){
        this.carts;
        this.path = path;
        this.products = [];
    }

    async loadCarts () {
        const json = await fs.readFile (this.path, 'utf-8')
        this.products = JSON.parse(json)}

    async getCarts(){
        await this.loadCarts();
        return this.carts;
    }    
            
    async addCartProduct(newProduct){
        await this.loadCarts();

        const product = this.products.find((prod) => prod.code ===newProduct.code);
        if (product){
            throw new Error('el producto existe');
        }
        this.products.push(newProduct);
        await this.persistCartProducts();
    }     
    
    async createCarrito() {

        await this.getCarts()
        const cart = {
            "id": randomUUID(),
            "quantity": 0,
            "products": []
        }
        this.carts.push(cart)

        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(this.path, jsonCarts)

    }

    async crearCarrito() {

        await this.getCarts()
        const cart = {
            "id": randomUUID(),
            "quantity": 0,
            "products": []
        }
        this.carts.push(cart)

        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(this.path, jsonCarts)

    }
    
    async addProductCart(cid, pid) {
        try {
            const productManager = new ProductManager('../product.json');

            const products = await productManager.getProducts()
            const productIndex = products.findIndex(prod => prod.id == pid)
            const productFilter = products[productIndex]

            const carts = await this.getCarts()
            const cartIndex = carts.findIndex(cart => cart.id == cid)
            const cartFilter = carts[cartIndex]

            let cant = 1
            const produID = {
                "id": `${productFilter.id}`,
                "quantity": `${cant}`
            };

            const idsInCart = [];
            const cartProducts = cartFilter.products
            cartProducts.forEach(element => {
                idsInCart.push(element.id)
            });

            if (idsInCart.includes(pid)) {
                const productInCart = cartProducts.find(e => e.id == pid)
                productInCart.quantity++;
                cartFilter.quantity++;
                await this.saveCart()
            } else {
                const push = cartProducts.push(produID)
                cartFilter.quantity++;
                this.carts[cartIndex].products = cartProducts
                await this.saveCart()
            }

            await this.saveCart()

            return { "message": "Add product"  }
        } catch (error) {
            return error.message
        }
    }

    async saveCart() {

        const jsonCarts = JSON.stringify(this.carts, null, 2)
        await fs.writeFile(this.path, jsonCarts)
    }

    async getCartById(id) {

        const cart = await this.getCarts()

        const cartIndex = cart.findIndex(cart => cart.id == id)
        const cartFilter = cart[cartIndex]

        return cartFilter

    }

}


