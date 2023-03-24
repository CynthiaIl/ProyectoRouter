import express from 'express'
import { apiCartProduct } from '../src/Router/apiCartProduct.js'
import { apiProduct } from '../src/Router/apiProducts.js'

const PORT = 8080
const app = express()

app.get('/', (req,res)=>{

    res.send(`<h1>Server ON</h1>`)
    
    })
    
    
    app.use('/api/products', apiProduct)
    app.use('/api/carts', apiCartProduct)
    
    
    app.get('/products', (req,res)=>{
    
    res.send(`<h1>Products</h1>`)
    
    })
    app.get('/carts', (req,res)=>{
    
    res.send(`<h1>Carts</h1>`)
    
    })

const server = app.listen(PORT,()=> console.log(`Toy arriba http://localhost:${PORT}`))