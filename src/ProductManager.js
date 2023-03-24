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

        const product = this.products.find((prod) => prod.code ===newProduct.code);
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
    
    async updateProduct(id, campos){
        if (Object.hasOwn(campos,'id')){
            delete campos.id;
        }
        
        await this.loadProduts();
        
        const product = this.products.find((prod) => prod.id === id);
        if (!product){
            throw new Error ('el id no existe');
        }
        
        const newProduct = new Product({ ...product, ...campos})
        const indice = this.products.findIndex(p =>p.id===id)
        this.products[indice] = newProduct
        
        await this.persistProducts()
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


