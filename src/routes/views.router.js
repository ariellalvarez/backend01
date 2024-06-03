import { Router } from "express";

const router = Router();

import ProductManager from '../managers/product.manager.js';
const productManager = new ProductManager('./src/data/products.json');


router.get('/realtimeproducts', (req, res)=>{
    res.render('realTimeProducts')
})


router.get('/websocket', (req, res)=>{
    res.render('websocket')
})


router.get('/', async(req, res)=>{
    const products = await productManager.getProducts();
    res.render('home', { products })
})

export default router;