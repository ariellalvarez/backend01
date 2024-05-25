import { Router } from "express";
const router = Router();

import CartManager from "../managers/cart.manager.js";
const cartManager = new CartManager('./src/data/carts.json');



router.post("/:idCart/product/:idProd", async (req, res) => {
   try {
      const { idProd } = req.params;
      const { idCart } = req.params;
      const response = await cartManager.saveProductToCart(idCart, idProd);
      res.json(response);
   } catch (error) {
   
    res.status(404).json({ message: error.message });
        console.log(error);
   }
});

router.post("/", async (req, res) => {
  try {
    res.json(await cartManager.createCart());
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get("/:idCart", async (req, res) => {
  try {
    const {idCart} = req.params
    res.json(await cartManager.getCartById(idCart))
  } catch (error) {
    console.log(error);
  }
});

export default router;