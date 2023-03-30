import fs from 'fs/promises'
import Product from './Product.js'

export default class ProductManager {
    constructor(path){
        this.path = path;
        this.products = [];
    }

    async loadProducts () {
        const json = await fs.readFile (this.path, 'utf-8')
        this.products = JSON.parse(json)}

    async persistProducts() {
        const json = JSON.stringify(this.products, null, 2);
        await fs.writeFile(this.path, json);
        }
            
    async addProduct(newProduct){
        await this.loadProducts();

        const product = this.products.find((prod) => prod.id ===newProduct.id);
        if (product){
            throw new Error('el producto existe');
        }
        this.products.push(newProduct);
        await this.persistProducts();
    }     
    
    async getProducts(){
        await this.loadProducts();
        return this.products;
    }
    
    async getProductByID(id){
        await this.loadProducts();
        
        const product = this.products.find((prod) => prod.id === id);
        if (!product){
        throw new Error ('Product no exist');
        }
        return product
    }        
    
    async updateProduct(id, prodModificado) {

        await this.loadProducts();

        const product = this.products.find((prod) => prod.id === id);
        const indice = this.products.findIndex(p => p.id === id)

        if (!product) {
            throw new Error("ID no exist");
        }

        const nuevoProducto = new Product({
            ...product,
            ...prodModificado
        })
        nuevoProducto.id = id
        this.products[indice] = nuevoProducto

        const jsonProductsModif = JSON.stringify(this.products, null, 2)

        console.log("Product update YAY", nuevoProducto);
        await fs.writeFile(this.path, jsonProductsModif)
    }        


    async deteleProduct(id){
        await this.loadProducts();
        const indice = this.products.findIndex(p=>p.id=== id)
        if(indice === -1){
            throw new Error ('no existe user con ID: ${id}, para eliminar')
        }
        this.products.splice(indice, 1)
        await this.persistProducts() }
}


