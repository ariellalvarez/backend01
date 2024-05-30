import { Router } from "express";
const router = Router();

import ProductManager from '../managers/product.manager.js';
const productManager = new ProductManager('./src/data/products.json');

import {productValidator} from '../middlewares/productValidator.js'

//import { upload } from '../middlewares/multer.js';

router.get('/', async (req, res) => {
    try{

        const {limit} = req.query;
        console.log(limit);

        const products =await productManager.getProducts()
        if(limit > 0){
            res.status(200).json(products.slice(0, limit));
        }else{            
            res.status(200).json(products);
        }
        
    }catch(error){
        res.status(404).json({ message: error.message });
        console.log(error);
    }
})

router.get('/:idProd', async (req, res) => {
    try {
      const { idProd } = req.params;
      const product = await productManager.getProductById(idProd);
      console.log(product);
      if (!product) res.status(404).json({ msg: "Product not found" });
      else res.status(200).json(product);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  router.post('/', productValidator, async (req, res) => {
    try {
      console.log(req.body);
      const product = req.body;
      const newProduct = await productManager.createProduct(req.body);
      res.status(200).json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
        console.log(error);
    }
  });

  router.put("/:idProd", async (req, res) => {
    try {
      const { idProd } = req.params;
      const response = await productManager.updateProduct(req.body, idProd);
      if (!response) res.status(404).json({ msg: "Error updating product" });
      else res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  });

  router.delete("/:idProd", async (req, res) => {
    try {
      const { idProd } = req.params;
      const response = await productManager.deleteProduct(idProd);
      if (!response) res.status(404).json({ msg: "Error delete product" });
      else res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }

    /*router.post("/profile", upload.single('profile'), async (req, res) => {
      try {
        console.log(req.file);
        const productBody = req.body;
        productBody.profile = req.file.path
        const product = await productManager.createProduct(productBody);
        res.status(201).json(product);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    });*/

  });

  export default router;