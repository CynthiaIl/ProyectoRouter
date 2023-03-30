import express from 'express';
import { apiCartProduct } from '../src/Router/apiCartProduct.js';
import { apiProduct } from '../src/Router/apiProducts.js';
import { engine } from 'express-handlebars';
import * as path from 'path';
import __dirname from './utils.js';
import ProductManager from './controllers/ProductManager.js';

const PORT = 8080
const app = express();
const product = new ProductManager();

//Handlebars
app.engine('handlebars', engine());
app.set('view engine','handlebars');
app.set('views', path.resolve(__dirname +'/views'));

// Static
app.use(express.static(__dirname +'/public'));

app.get('/', async (req,res)=>{
    let allproducts = await product.getProducts(req.params);
    res.render('home',{
        title : 'All Products | Express',
        products : allproducts
    })
    })
    
// Rutas a api
    app.use('/api/products', apiProduct)
    app.use('/api/carts', apiCartProduct)
    
    
    app.get('/products', (req,res)=>{
    
    res.send(`<h1>Products</h1>`)
    
    })
    app.get('/carts', (req,res)=>{
    
    res.send(`<h1>Carts</h1>`)
    
    })


// ON server
app.listen(PORT,()=> 
    {console.log(`Toy arriba http://localhost:${PORT}`);
});

