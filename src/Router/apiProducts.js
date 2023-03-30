import express, { Router } from 'express'
import fs from 'fs/promises'
import ProductManager from '../controllers/ProductManager.js'
import { randomUUID } from 'crypto'
import Product from '../controllers/Product.js'

export const apiProduct = Router()

apiProduct.use(express.json())
apiProduct.use(express.urlencoded({extended : true}))

let npM = new ProductManager ('./src/storage/product.json')

async function parseFile() {
    const products = await fs.readFile( './src/storage/product.json', 'utf-8')
    return JSON.parse(products);
}

apiProduct.get('/', async (req, res, next) => {
    try{
        const queryLimits = req.query.limit
        if (!isNaN(queryLimits) && queryLimits >= 0) {
        const productsJSON = await parseFile ();
        let productsLimits = [];

    for (let i = 0 ; i<queryLimits ; i++ ){
            productsLimits[i] = productsJSON[i];
        }
        res.json(productsLimits);
    } else {
        const productsJSON = await parseFile();
    res.json(productsJSON);
    }} catch (error){
        next(error)
    }
})

apiProduct.get('/:pid', async (req,res, next) => {
    try {
        const product = await npM.getProductByID(req.params.pid)
        res.json(product)
    } catch (error) {
        next(error)
    }
} )

apiProduct.post('/', async (req,res,next) => {
    try {
        const product = new Product({
            id : randomUUID(),
            ... req.body
        })
        const addIt = await npM.addProduct(product)
        res.json(addIt)
    } catch (error) {
        next (error)
    }
})

apiProduct.put('/:pid',async ( req,res, next)=>{
    try {
        const id= req.params.pid
        const prodUpdate = req.body
    
        await npM.updateProduct(id,prodUpdate)
    
        res.send('Product update')
    } catch (error) {
        return next (error)
    }
    } )

apiProduct.delete ('/:pid', async (req,res, next) => {
    try {
        const productDelete = await npM.deteleProduct(req.params.pid)
        res.json(productDelete)
    } catch (error) {
        return next(error) 
    }
})