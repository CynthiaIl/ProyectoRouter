import express, { Router } from 'express';
import CartManager from '../controllers/CartManager.js';

export const apiCartProduct = Router()

apiCartProduct.use(express.json())
apiCartProduct.use(express.urlencoded({extended : true}))

const ncM = new CartManager ('./src/storage/carts.json')

apiCartProduct.get('/:cid', async (req, res) => {
    try {
        const id = req.params.cid
        const cartID = await ncM.getCartById(id)

        res.json(cartID)
    } catch (error) {
        throw new Error(" ID cart no found ")
    }

})

apiCartProduct.post('/', async (req, res) => {

    res.send(await ncM.getCarts())
})

apiCartProduct.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid

        const add = await ncM.addCartProduct(cid,pid)

        res.json(add)
        } catch (error) {
            throw new Error('ID no found')
        }
})
