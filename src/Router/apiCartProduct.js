import express, { Router } from 'express';
import CartManager from '../CartManager.js';
import ProductManager from '../ProductManager.js';
import Product from '../Product.js';

export const apiCartProduct = Router()

apiCartProduct.use(express.json())
apiCartProduct.use(express.urlencoded({extended : true}))

const ncM = new CartManager ('./src/storage/carts.json')
const npM = new ProductManager('./src/storage/product.json');

apiCartProduct.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid
        const cartID = await ncM.getCartById(id)

        res.json(cartID)
    } catch (error) {
        throw new Error(" ID cart no found ")
    }

})

apiCartProduct.get('/', async (req, res) => {

    res.send(await ncM.getCarts())
})

apiCartProduct.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        
        const product = await npM.getProducts()
        const cart = await ncM.getCarts()

        const productFilter = await product.filter(prod => prod.id === pid)
        const id = productFilter[0].id

        const cprod = cart.filter(cart => cart[0].id === cid)

        cprod[0].push({
            id
        })
        
        await ncM.saveCart();

        res.json(cprod)
        } catch (error) {
            throw new Error('ID no found')
        }
})
